# Max Planner Financeiro 💼🚀

**Max Planner Financeiro** é uma plataforma moderna e responsiva para controle financeiro pessoal e empresarial. 
Ela oferece dashboard com gráficos informativos, exportação de relatórios em PDF, autenticação segura, suporte multilíngue e integração com Firebase.

---

## 🔧 Tecnologias Utilizadas

- **Frontend**: HTML5, Tailwind CSS, Chart.js, jsPDF, XLSX.js
- **Backend**: Node.js, Express.js, Firebase
- **Autenticação**: Firebase Auth (Google + E-mail/Senha)
- **Hospedagem**: Vercel (Frontend) + Firebase/Render (Backend)

---

## 📁 Estrutura do Projeto

```
📦 max_planner_financeiro
├── frontend/               # Páginas HTML e estilos
├── backend/                # API Express e configurações Firebase
├── scripts/                # Script de deploy (Vercel + Firebase)
├── legal/                  # Termos de Uso e Política de Privacidade
├── utils/                  # Traduções e exportação PDF
├── assets/                 # Logo e template Excel
```

---

## 🚀 Como Rodar o Projeto Localmente

### 🔹 1. Clone o projeto
```bash
git clone https://github.com/seu-usuario/max-planner-financeiro.git
cd max-planner-financeiro
```

### 🔹 2. Instale dependências do backend
```bash
cd backend
npm install
cp .env.example .env # configure com suas variáveis do Firebase
node server.js
```

### 🔹 3. Rode o frontend (modo simples)
Abra o `frontend/index.html` diretamente no navegador **ou** use uma extensão como `Live Server` no VS Code.

---

## 🌐 Deploy

### 🔸 Vercel (Frontend)
1. Acesse [vercel.com](https://vercel.com/)
2. Clique em **New Project** e importe a pasta `frontend/`
3. Configure como `Other`, root: `frontend/`

### 🔸 Firebase (Backend e Auth)
1. Acesse [console Firebase](https://console.firebase.google.com/)
2. Crie o projeto `max-planner-financeiro`
3. Habilite **Google Login** e **Email/Senha** em `Authentication`
4. Pegue as credenciais e preencha o `.env`

### 🔸 Deploy com Firebase Functions (opcional)
```bash
npm install -g firebase-tools
firebase login
firebase init functions
firebase deploy --only functions
```

---

## 📊 Funcionalidades

- [x] Login com Google e E-mail/Senha
- [x] Upload de planilha Excel (.xlsx)
- [x] Dashboard com gráficos:
  - Receitas vs Despesas
  - Saldo Investido
  - Gastos por tipo (Crédito, Débito, Pix)
- [x] Exportação em PDF
- [x] Painel Admin
- [x] Vídeos Tutoriais (YouTube Embed)
- [x] Suporte multilíngue (pt-BR / en-US)

---

## 📎 Licença e Informações Legais
- Consulte os arquivos em `legal/termos_uso.md` e `legal/politica_privacidade.md`

---

## 🤝 Contato e Agradecimentos

Desenvolvido por Max C. Alves e IA.  
Agradecimentos especiais a todos os apoiadores do projeto.

**🚀 Que sua jornada financeira comece agora!**
