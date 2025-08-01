// Configurações do ambiente - Barbearia do Além
export const environment = {
  production: false,
  apiUrl: 'https://projetobarbeariadoalem-o-3.onrender.com/api',
  
  // Configurações padrão do sistema
  defaultCredentials: {
    email: 'admin@barbeariadoalem.com',
    password: 'admin123'
  },
  
  // URLs importantes
  urls: {
    backend: 'https://projetobarbeariadoalem-o-3.onrender.com',
    frontend: 'https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem',
    login: 'https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/login',
    admin: 'https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/admin'
  },
  
  // Configurações de banco
  database: {
    name: 'barbeariadoalem_db',
    provider: 'Neon PostgreSQL'
  },
  
  // Instruções para configuração após clone
  setupInstructions: {
    step1: 'Execute: setup-projeto.bat',
    step2: 'Se erro de banco, edite backend/.env',
    step3: 'Execute: start-completo.bat',
    step4: 'Acesse: https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/login'
  }
};
