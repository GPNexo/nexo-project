# 🚀 Guia de Deploy - Vercel + AWS + Domínio gpnexo.com.br

Este guia te ajudará a colocar o Sistema Nexo no ar usando Vercel (frontend) e AWS (backend) com o domínio gpnexo.com.br.

## 📋 Pré-requisitos

### Contas Necessárias
- [ ] Conta no GitHub (gratuita)
- [ ] Conta no Vercel (gratuita)
- [ ] Conta na AWS (com cartão de crédito)
- [ ] Domínio gpnexo.com.br (✅ já comprado)

### Ferramentas Locais
- [ ] Git instalado
- [ ] Node.js 18+ instalado

## 🎯 Passo 1: Preparar o Código no GitHub

### 1.1 Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `nexo-project`
4. Marque como "Public"
5. Clique em "Create repository"

### 1.2 Fazer Upload do Código
```bash
# Extrair o ZIP que te enviei
unzip nexo_project.zip
cd nexo_project

# Inicializar Git
git init
git add .
git commit -m "Sistema Nexo - Deploy inicial"

# Conectar com GitHub (substitua SEU_USUARIO)
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nexo-project.git
git push -u origin main
```

## 🌐 Passo 2: Deploy do Frontend no Vercel

### 2.1 Configurar Vercel
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Login**: Clique em "Login" e use sua conta GitHub
3. **Import Project**: Clique em "New Project"
4. **Selecionar Repositório**: Escolha `nexo-project`

### 2.2 Configurações do Deploy
```
Framework Preset: Vite
Root Directory: nexo-frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.3 Variáveis de Ambiente
Na seção "Environment Variables", adicione:
```
VITE_API_BASE_URL = https://SEU_BACKEND_AWS.amazonaws.com/api
```
*(Você atualizará isso depois de configurar o AWS)*

### 2.4 Deploy
1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. Anote a URL gerada (ex: `nexo-project.vercel.app`)

## ☁️ Passo 3: Deploy do Backend na AWS

### 3.1 Preparar o Backend para AWS
Primeiro, vamos criar os arquivos necessários para AWS:

#### Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "src.main:app"]
```

#### requirements.txt (atualizado)
```
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-CORS==4.0.0
PyJWT==2.8.0
gunicorn==21.2.0
psycopg2-binary==2.9.9
```

### 3.2 Configurar AWS Elastic Beanstalk

#### 3.2.1 Instalar AWS CLI
```bash
# No seu computador
pip install awscli
aws configure
```

#### 3.2.2 Instalar EB CLI
```bash
pip install awsebcli
```

#### 3.2.3 Inicializar Elastic Beanstalk
```bash
cd nexo-backend
eb init

# Configurações:
# Region: us-east-1 (ou sua preferência)
# Application name: nexo-backend
# Platform: Python 3.11
# CodeCommit: No
# SSH: Yes (recomendado)
```

#### 3.2.4 Criar Ambiente
```bash
eb create nexo-production

# Configurações:
# Environment name: nexo-production
# DNS CNAME prefix: nexo-api (ou sua preferência)
# Load balancer: Application Load Balancer
```

### 3.3 Configurar Banco de Dados RDS

#### 3.3.1 Criar Banco PostgreSQL
1. **AWS Console**: Acesse RDS
2. **Create Database**: PostgreSQL
3. **Template**: Free tier (para começar)
4. **Settings**:
   - DB instance identifier: `nexo-db`
   - Master username: `nexoadmin`
   - Master password: `[senha-segura]`
5. **Connectivity**: Same VPC as Elastic Beanstalk
6. **Create Database**

#### 3.3.2 Configurar Variáveis de Ambiente
```bash
eb setenv FLASK_ENV=production
eb setenv DATABASE_URL=postgresql://nexoadmin:senha@nexo-db.xxx.rds.amazonaws.com:5432/postgres
eb setenv JWT_SECRET=sua-chave-jwt-super-segura-de-32-caracteres
eb setenv CORS_ORIGINS=https://gpnexo.com.br
```

### 3.4 Deploy do Backend
```bash
eb deploy
```

### 3.5 Obter URL do Backend
```bash
eb status
# Anote a URL (ex: nexo-production.us-east-1.elasticbeanstalk.com)
```

## 🔗 Passo 4: Conectar Frontend e Backend

### 4.1 Atualizar Frontend
1. **Vercel Dashboard**: Acesse seu projeto
2. **Settings** → **Environment Variables**
3. **Editar** `VITE_API_BASE_URL`:
   ```
   VITE_API_BASE_URL = https://nexo-production.us-east-1.elasticbeanstalk.com/api
   ```
4. **Redeploy**: Vá em "Deployments" e clique "Redeploy"

### 4.2 Atualizar Backend CORS
```bash
eb setenv CORS_ORIGINS=https://nexo-project.vercel.app,https://gpnexo.com.br
eb deploy
```

## 🌍 Passo 5: Configurar Domínio gpnexo.com.br

### 5.1 Configurar DNS no Vercel

#### 5.1.1 Adicionar Domínio no Vercel
1. **Vercel Dashboard** → **Settings** → **Domains**
2. **Add Domain**: `gpnexo.com.br`
3. **Add**: Vercel mostrará os nameservers

#### 5.1.2 Configurar DNS no Registro.br
1. **Acesse**: [registro.br](https://registro.br)
2. **Login**: Com suas credenciais
3. **DNS** → **Alterar Servidores DNS**
4. **Nameservers**: Use os fornecidos pelo Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

### 5.2 Configurar Subdomínio para API

#### 5.2.1 No AWS Route 53
1. **AWS Console** → **Route 53**
2. **Create Hosted Zone**: `gpnexo.com.br`
3. **Create Record**:
   - Name: `api`
   - Type: `CNAME`
   - Value: `nexo-production.us-east-1.elasticbeanstalk.com`

#### 5.2.2 Atualizar Frontend
```
VITE_API_BASE_URL = https://api.gpnexo.com.br/api
```

## 🔒 Passo 6: Configurar HTTPS e Segurança

### 6.1 SSL no Vercel
- **Automático**: Vercel configura SSL automaticamente

### 6.2 SSL na AWS
```bash
# Solicitar certificado SSL
aws acm request-certificate --domain-name api.gpnexo.com.br --validation-method DNS

# Configurar no Load Balancer via AWS Console
```

## ✅ Passo 7: Testes Finais

### 7.1 Testar URLs
```bash
# Frontend
curl https://gpnexo.com.br

# Backend Health Check
curl https://api.gpnexo.com.br/api/health

# Login Test
curl -X POST https://api.gpnexo.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nexo.com","password":"123456"}'
```

### 7.2 Checklist Final
- [ ] Frontend carrega em `https://gpnexo.com.br`
- [ ] Login funciona
- [ ] API responde em `https://api.gpnexo.com.br/api/health`
- [ ] IA funciona (gerar objetivo SMART)
- [ ] Todas as páginas acessíveis
- [ ] SSL ativo (cadeado verde)

## 💰 Custos Estimados

### Vercel (Frontend)
- **Hobby Plan**: Gratuito
- **Pro Plan**: $20/mês (se precisar de mais recursos)

### AWS (Backend)
- **Elastic Beanstalk**: Gratuito (paga apenas pelos recursos)
- **EC2 t3.micro**: ~$8/mês (free tier por 12 meses)
- **RDS db.t3.micro**: ~$15/mês (free tier por 12 meses)
- **Total estimado**: $0-25/mês (dependendo do uso)

## 🆘 Solução de Problemas

### Problema: Build Error no Vercel
```
Module not found: Can't resolve './component'
```
**Solução**: Verificar imports no código React

### Problema: 502 Bad Gateway na AWS
**Solução**: Verificar logs do Elastic Beanstalk
```bash
eb logs
```

### Problema: CORS Error
**Solução**: Verificar `CORS_ORIGINS` no backend
```bash
eb printenv
```

### Problema: Database Connection Error
**Solução**: Verificar security groups do RDS

## 📞 Suporte

### Documentação Oficial
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **AWS Elastic Beanstalk**: [docs.aws.amazon.com/elasticbeanstalk](https://docs.aws.amazon.com/elasticbeanstalk)
- **Registro.br**: [registro.br/ajuda](https://registro.br/ajuda)

### Comandos Úteis
```bash
# Vercel
vercel --help
vercel logs

# AWS
eb status
eb logs
eb config
eb deploy

# Git
git status
git add .
git commit -m "Update"
git push
```

---

## 🎉 Resultado Final

Após seguir todos os passos, você terá:

- ✅ **Frontend**: `https://gpnexo.com.br`
- ✅ **Backend**: `https://api.gpnexo.com.br`
- ✅ **SSL**: Certificados automáticos
- ✅ **Escalabilidade**: AWS auto-scaling
- ✅ **Performance**: CDN global do Vercel
- ✅ **Monitoramento**: Dashboards AWS e Vercel

**🚀 Seu Sistema Nexo estará online e acessível mundialmente!**

