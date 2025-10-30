// Configurações e bibliotecas necessárias para o servidor backend
const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const xlsx = require('xlsx'); // Biblioteca para ler arquivos Excel
const fs = require('fs'); // Para lidar com sistema de arquivos (limpeza)

const app = express();
const port = process.env.PORT || 3000;

// --- 1. INICIALIZAÇÃO DO FIREBASE ADMIN SDK ---
// O Firebase Admin SDK precisa de um Service Account JSON
// **IMPORTANTE**: Você DEVE ter o arquivo 'serviceAccountKey.json' na mesma pasta.
try {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
} catch (error) {
    console.error("ERRO: Falha ao inicializar o Firebase Admin SDK. O arquivo 'serviceAccountKey.json' está faltando ou é inválido.", error);
    process.exit(1); // Encerra a aplicação se a inicialização falhar
}

const db = admin.firestore();
const upload = multer({ dest: 'temp/' }); // Define pasta temporária para armazenar uploads

// --- Middleware para CORS e JSON Body ---
app.use(express.json());
// Configurações de CORS para permitir acesso do seu Frontend
app.use((req, res, next) => {
    // Em produção, substitua '*' pela URL exata do seu Frontend na Vercel
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// --- 2. MIDDLEWARE DE AUTENTICAÇÃO (CRÍTICO) ---
// Valida o ID Token enviado pelo Frontend para confirmar a identidade do usuário
async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const idToken = authHeader ? authHeader.split('Bearer ')[1] : null;

    if (!idToken) {
        return res.status(401).send({ error: 'Nenhum token de autenticação fornecido. Acesso negado.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; // Adiciona os dados do usuário à requisição
        next();
    } catch (error) {
        console.error("Erro na validação do token:", error.message);
        return res.status(401).send({ error: 'Token inválido ou expirado. Faça login novamente.' });
    }
}

// --- 3. FUNÇÃO CRÍTICA: PROCESSAMENTO DA PLANILHA XLSX ---
/**
 * Lê o arquivo XLSX e calcula métricas financeiras essenciais.
 * @param {string} filePath - Caminho para o arquivo temporário.
 * @returns {object} Dados processados para salvar no Firestore.
 */
function processExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Converte a planilha para JSON, usando a primeira linha como cabeçalho
    const transactions = xlsx.utils.sheet_to_json(sheet);
    
    if (transactions.length === 0) {
        throw new Error("A planilha está vazia. Não há lançamentos a serem processados.");
    }
    
    let totalReceitas = 0;
    let totalDespesas = 0;
    // Mapas para agregar valores por mês (para gráficos)
    const monthlyIncomeAgg = new Map();
    const monthlyExpensesAgg = new Map();
    const investmentDistribution = {};
    
    // Lista para salvar as transações detalhadas (para o relatório PDF)
    const detailedTransactions = [];
    
    transactions.forEach(row => {
        // Normalização e sanitização dos dados
        const valor = parseFloat(row['Valor']) || 0;
        const tipo = row['Tipo'] ? String(row['Tipo']).trim().toLowerCase() : '';
        const categoria = row['Categoria'] ? String(row['Categoria']).trim() : 'Geral';
        const saldoInvestido = parseFloat(row['Saldo Investido']) || 0;
        
        // Verifica e normaliza a data (o XLSX.js pode retornar números)
        let dateObj = row['Data'];
        if (typeof dateObj === 'number') {
            // Converte o formato numérico do Excel (dias desde 1899) para data JS
            dateObj = xlsx.SSF.format('YYYY-MM-DD', dateObj); 
        }
        
        const transactionDate = new Date(dateObj);
        const monthYear = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;

        // 3.1. CÁLCULO DE TOTAIS E AGRUPAMENTO MENSAL
        if (tipo === 'receita') {
            totalReceitas += valor;
            monthlyIncomeAgg.set(monthYear, (monthlyIncomeAgg.get(monthYear) || 0) + valor);
        } else if (tipo === 'despesa') {
            totalDespesas += valor;
            monthlyExpensesAgg.set(monthYear, (monthlyExpensesAgg.get(monthYear) || 0) + valor);
        }
        
        // 3.2. CÁLCULO DE DISTRIBUIÇÃO DE INVESTIMENTOS (Para gráfico de pizza)
        // Usamos a coluna 'Saldo Investido' ou 'Categoria' para calcular a distribuição.
        if (saldoInvestido > 0) {
             // Agrupa os valores de saldo investido pela categoria
             investmentDistribution[categoria] = (investmentDistribution[categoria] || 0) + saldoInvestido;
        }

        // Adiciona a transação formatada para o Firestore/PDF
        detailedTransactions.push({
            data: transactionDate.toLocaleDateString('pt-BR'),
            tipo: tipo,
            categoria: categoria,
            valor: valor,
            saldoInvestido: saldoInvestido 
        });
    });

    // 3.3. FINALIZAÇÃO DOS ARRAYS PARA GRÁFICOS (Garantindo ordenação por mês)
    const sortedKeys = Array.from(new Set([...monthlyIncomeAgg.keys(), ...monthlyExpensesAgg.keys()])).sort();
    
    const monthlyIncome = sortedKeys.map(key => monthlyIncomeAgg.get(key) || 0);
    const monthlyExpenses = sortedKeys.map(key => monthlyExpensesAgg.get(key) || 0);
    
    // O Dashboard precisa dos meses para o eixo X, mas o Firebase salva apenas os dados
    // Podemos incluir os meses para facilitar a depuração.
    const meses = sortedKeys; 

    return {
        // Totais para Indicadores
        totalReceitas: totalReceitas,
        totalDespesas: totalDespesas,
        saldoDisponivel: totalReceitas - totalDespesas,
        // Dados para Gráficos
        investmentDistribution: investmentDistribution,
        monthlyIncome: monthlyIncome,
        monthlyExpenses: monthlyExpenses,
        meses: meses,
        // Dados para o PDF
        detailedTransactions: detailedTransactions 
    };
}


// --- 4. ENDPOINT PRINCIPAL: UPLOAD DE DADOS ---
app.post('/api/upload-finance', authenticateToken, upload.single('excel_file'), async (req, res) => {
    // 'excel_file' é o nome do campo de arquivo que o frontend deve usar
    
    if (!req.file) {
        return res.status(400).send({ error: 'Nenhum arquivo de planilha enviado.' });
    }

    const userId = req.user.uid;
    const filePath = req.file.path;
    
    try {
        const processedData = processExcel(filePath); 
        
        // 5. SALVAR NO FIRESTORE
        // Salva os dados processados no documento do usuário
        await db.collection('finances').doc(userId).set(processedData, { merge: true });
        
        // 6. LIMPEZA e Resposta
        fs.unlinkSync(filePath); // Remove o arquivo temporário
        
        res.status(200).send({ 
            message: 'Dados financeiros atualizados com sucesso!',
            // Envia o novo saldo para feedback imediato no frontend
            saldoDisponivel: processedData.saldoDisponivel
        });
        
    } catch (error) {
        // Garante a limpeza mesmo em caso de falha
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
        }
        console.error("Erro no processamento/salvamento do Max Planner:", error.message);
        res.status(500).send({ error: `Falha no processamento: ${error.message}` });
    }
});


// --- 5. INICIAR SERVIDOR ---
app.listen(port, () => {
    console.log(`Max Planner Backend rodando em http://localhost:${port}`);
    console.log(`Pronto para receber dados em /api/upload-finance`);
});
