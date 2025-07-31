#!/bin/bash

echo "🚀 Iniciando deploy para GitHub Pages..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Instalar dependências se necessário
echo "📦 Instalando dependências..."
npm install
cd frontend && npm install && cd ..

# Build do projeto
echo "🔨 Fazendo build do projeto..."
cd frontend
npm run build:gh-pages

# Verificar se o build foi criado
if [ ! -d "dist/projeto-angular" ]; then
    echo "❌ Erro: Build não foi criado"
    exit 1
fi

echo "✅ Build criado com sucesso!"
echo "📁 Arquivos estão em: frontend/dist/projeto-angular"
echo ""
echo "🔗 Para fazer o deploy:"
echo "1. Faça commit e push das alterações"
echo "2. O GitHub Actions fará o deploy automaticamente"
echo "3. Site estará disponível em: https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/"

cd ..