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
    frontend: 'http://localhost:4200',
    login: 'http://localhost:4200/login',
    admin: 'http://localhost:4200/admin'
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
    step4: 'Acesse: http://localhost:4200/login'
  }
};
