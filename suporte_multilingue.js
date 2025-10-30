// Estrutura básica de suporte multilíngue (pt-BR e en-US)

const translations = {
  'pt-BR': {
    // CHAVES DE USO GERAL
    welcome: "Max Planner Financeiro",
    login: "Entrar",
    logout: "Sair",
    dashboard: "Painel de Controle",
    adminPanel: "Painel Administrativo",
    uploadExcel: "Enviar arquivo Excel",
    tutorials: "Tutoriais em Vídeo",
    exportPDF: "Exportar Relatório em PDF",
    totalIncome: "Receitas",
    totalExpenses: "Despesas",
    invested: "Saldo Investido",
    available: "Saldo Disponível",
    language: "Idioma",
    backToDashboard: "Voltar ao Dashboard",

    // CHAVES DE FLUXO DE PLANOS
    updatePlan: "Atualizar Plano",
    goToDashboard: "Ir para Dashboard",
    myAccount: "Minha Conta",
    subscribe: "Assinar",
    signUp: "Cadastre-se",
    
    // CHAVES DE PLANOS E PAGAMENTO (NOVAS)
    managePlans: "Gerenciar Planos",
    planFree: "Gratuito",
    planProfessional: "Profissional",
    planEnterprise: "Empresarial",
    currentPlan: "Seu plano atual é:",
    paymentRequiredTitle: "Assinatura Pendente",
    paymentRequiredText: "Para ativar o plano Profissional, conclua o pagamento abaixo.",
    startPayment: "Comece adicionando um método de pagamento",
    addCard: "Adicionar Cartão",
    addMercadoPago: "Adicionar Mercado Pago",
    addPayPal: "Adicionar PayPal",
    redeemCode: "Código de Resgate",
    payAndActivate: "Pagar e Ativar Plano",
    paymentMethodAdded: "Método de pagamento adicionado (MOCK).",
    // CHAVES DA PÁGINA INSTITUCIONAL
    features: "Funcionalidades",
    security: "Segurança",
    plans: "Planos",
    heroTitle: "Domine Suas Finanças, Simplifique Sua Vida.",
    heroSubtitle: "A plataforma completa para visualizar sua saúde financeira e planejar o futuro.",
    startNow: "Comece Agora",
    feature1Title: "Dashboard Interativo",
    feature1Desc: "Gráficos de evolução, distribuição de gastos e visão em tempo real do seu saldo.",
    feature2Title: "Exportação em PDF",
    feature2Desc: "Gere relatórios profissionais para contadores ou para seu planejamento pessoal.",
    feature3Title: "Segurança de Dados",
    feature3Desc: "Utilizamos Firebase para garantir a máxima segurança na autenticação e armazenamento de dados.",
    plan1Title: "Gratuito",
    plan1Subtitle: "Ideal para iniciantes e pequenos orçamentos.",
    plan1Price: "R$ 0,00/mês",
    plan1Feature1: "✔ Upload de planilha mensal",
    plan1Feature2: "✔ Dashboard de Receitas e Despesas",
    plan2Title: "Profissional",
    plan2Subtitle: "Recursos completos e personalizados.",
    plan2Price: "R$ 19,90/mês",
    plan2Feature1: "✔ Tudo do plano gratuito",
    plan2Feature2: "✔ Exportar relatórios em PDF",
    plan2Feature3: "✔ Gráficos por tipo de pagamento",
    plan2Feature4: "✔ Suporte Premium",
    plan3Title: "Empresarial",
    plan3Subtitle: "Para empresas e equipes financeiras.",
    plan3Price: "Sob consulta",
    plan3Feature1: "✔ Dashboard multiusuário",
    plan3Feature2: "✔ Painel administrativo",
    plan3Feature3: "✔ Integração com sistemas",
    contactUs: "Fale Conosco",

    // CHAVES DO PAINEL ADMIN
    adminPanelTitle: "Admin - Max Planner Financeiro",
    activeUsers: "Usuários Ativos",
    newRegistrations: "Novos Registros (Mês)",
    monthlyRevenue: "Receita Mensal Estimada",
    manageUsers: "Gerenciar Usuários",
    name: "Nome",
    email: "E-mail",
    status: "Status",
    actions: "Ações",
    statusActive: "Ativo",
    deactivate: "Desativar"
  },
  'en-US': {
    // GENERAL USE KEYS
    welcome: "Max Planner Financeiro",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    adminPanel: "Admin Panel",
    uploadExcel: "Upload Excel File",
    tutorials: "Video Tutorials",
    exportPDF: "Export PDF Report",
    totalIncome: "Income",
    totalExpenses: "Expenses",
    invested: "Invested Balance",
    available: "Available Balance",
    language: "Language",
    backToDashboard: "Back to Dashboard",

    // SUBSCRIPTION FLOW KEYS (NEW)
    updatePlan: "Update Plan",
    goToDashboard: "Go to Dashboard",
    myAccount: "My Account",
    subscribe: "Subscribe",
    signUp: "Sign Up",
    
    // PAYMENT KEYS (NEW)
    managePlans: "Manage Plans",
    planFree: "Free",
    planProfessional: "Professional",
    planEnterprise: "Enterprise",
    currentPlan: "Your current plan is:",
    paymentRequiredTitle: "Subscription Pending",
    paymentRequiredText: "To activate the Professional plan, please complete the payment below.",
    startPayment: "Start by adding a payment method",
    addCard: "Add Card",
    addMercadoPago: "Add Mercado Pago",
    addPayPal: "Add PayPal",
    redeemCode: "Redeem Code",
    payAndActivate: "Pay & Activate Plan",
    paymentMethodAdded: "Payment method added (MOCK).",


    // INSTITUTIONAL PAGE KEYS
    features: "Features",
    security: "Security",
    plans: "Plans",
    heroTitle: "Master Your Finances, Simplify Your Life.",
    heroSubtitle: "The complete platform to visualize your financial health and plan for the future.",
    startNow: "Start Now",
    feature1Title: "Interactive Dashboard",
    feature1Desc: "Evolution charts, spending distribution, and real-time view of your balance.",
    feature2Title: "PDF Export",
    feature2Desc: "Generate professional reports for accountants or for your personal planning.",
    feature3Title: "Data Security",
    feature3Desc: "We use Firebase to ensure maximum security in authentication and data storage.",
    plan1Title: "Free",
    plan1Subtitle: "Ideal for beginners and small budgets.",
    plan1Price: "$ 0.00/month",
    plan1Feature1: "✔ Monthly spreadsheet upload",
    plan1Feature2: "✔ Income and Expense Dashboard",
    plan2Title: "Professional",
    plan2Subtitle: "Complete and personalized features.",
    plan2Price: "$ 19.90/month",
    plan2Feature1: "✔ Everything in the free plan",
    plan2Feature2: "✔ Export PDF reports",
    plan2Feature3: "✔ Charts by payment type",
    plan2Feature4: "✔ Premium Support",
    plan3Title: "Business",
    plan3Subtitle: "For companies and financial teams.",
    plan3Price: "By consultation",
    plan3Feature1: "✔ Multi-user dashboard",
    plan3Feature2: "✔ Administrative panel",
    plan3Feature3: "✔ System integration",
    contactUs: "Contact Us",

    // ADMIN PANEL KEYS
    adminPanelTitle: "Admin - Max Planner Financeiro",
    activeUsers: "Active Users",
    newRegistrations: "New Registrations (Month)",
    monthlyRevenue: "Estimated Monthly Revenue",
    manageUsers: "Manage Users",
    name: "Name",
    email: "Email",
    status: "Status",
    actions: "Actions",
    statusActive: "Active",
    deactivate: "Deactivate"
  }
};

// Função de tradução dinâmica com fallback
function translate(key, lang = 'pt-BR') {
  return translations[lang]?.[key] || translations['pt-BR'][key] || key;
}

// Exemplo: Aplicar tradução automática aos elementos com data-i18n
function applyTranslations(lang = 'pt-BR') {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translate(key, lang);
  });
}

// Armazena preferência do usuário e aplica ao carregar
// As páginas HTML chamam applyTranslations(savedLang)
const savedLang = localStorage.getItem('lang') || 'pt-BR';
// applyTranslations(savedLang); // Não chamar aqui, pois é chamado no HTML após o DOM

// Função auxiliar para trocar idioma (usada pelos seletores)
window.changeLanguage = function (lang) {
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
};
