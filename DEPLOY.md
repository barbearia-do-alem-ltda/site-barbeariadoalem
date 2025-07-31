# 🚀 Deploy para GitHub Pages

## Deploy Automático (Recomendado)

1. **Fazer commit e push:**
```bash
git add .
git commit -m "Deploy para GitHub Pages"
git push origin main
```

2. **O GitHub Actions fará o deploy automaticamente**
   - Acesse: Actions no repositório GitHub
   - Aguarde o workflow completar

3. **Site estará disponível em:**
   - https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/

## Deploy Manual

```bash
# Executar script de deploy
./deploy.sh

# Ou manualmente:
npm run build:gh-pages
cd frontend && npm run deploy
```

## Configuração do Repositório

1. **Vá para Settings > Pages**
2. **Source:** Deploy from a branch
3. **Branch:** gh-pages
4. **Folder:** / (root)

## URLs Importantes

- **Site:** https://barbearia-do-alem-ltda.github.io/site-barbeariadoalem/
- **Repositório:** https://github.com/barbearia-do-alem-ltda/site-barbeariadoalem
- **Actions:** https://github.com/barbearia-do-alem-ltda/site-barbeariadoalem/actions