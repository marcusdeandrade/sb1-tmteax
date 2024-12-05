# WhatsApp Bot para Clínica de Estética

Sistema inteligente de atendimento automatizado via WhatsApp com integração RASA e OpenAI, especializado para clínicas de estética.

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Passo a Passo](#instalação-passo-a-passo)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades](#funcionalidades)
6. [Desenvolvimento](#desenvolvimento)
7. [Deployment](#deployment)
8. [Manutenção](#manutenção)

## Pré-requisitos

### Software Necessário
- Node.js (v18.x ou superior)
- Python 3.8+ (para RASA)
- Docker e Docker Compose
- PostgreSQL 14+
- FFmpeg
- Nginx

### Chaves e Credenciais
- Conta WhatsApp Business
- Chave API OpenAI
- Certificado SSL válido
- Credenciais do banco de dados

## Instalação Passo a Passo

### 1. Preparação do Ambiente

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências do sistema
sudo apt install -y \
  nodejs \
  npm \
  python3 \
  python3-pip \
  postgresql \
  ffmpeg \
  nginx \
  docker.io \
  docker-compose
```

### 2. Configuração do PostgreSQL

```bash
# Acessar PostgreSQL
sudo -u postgres psql

# Criar banco e usuário
CREATE DATABASE bot_whatsapp;
CREATE USER bot_user WITH ENCRYPTED PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE bot_whatsapp TO bot_user;
\q
```

### 3. Configuração do Projeto

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/whatsapp-bot.git
cd whatsapp-bot

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Editar .env com suas configurações
```

### 4. Configuração do RASA

```bash
# Criar ambiente virtual Python
python3 -m venv venv
source venv/bin/activate

# Instalar RASA
pip install rasa==3.6.2

# Treinar modelo inicial
rasa train
```

### 5. Configuração do Docker

```bash
# Construir imagens
docker-compose build

# Iniciar serviços
docker-compose up -d
```

### 6. Configuração do Nginx

```bash
# Copiar configuração
sudo cp nginx.conf /etc/nginx/nginx.conf

# Configurar SSL
sudo ./setup-ssl.sh

# Reiniciar Nginx
sudo systemctl restart nginx
```

## Configuração do Ambiente

### Variáveis de Ambiente (.env)

```env
# Servidor
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgres://bot_user:sua_senha_segura@localhost:5432/bot_whatsapp

# OpenAI
OPENAI_API_KEY=sua_chave_api

# RASA
RASA_URL=http://localhost:5005

# WhatsApp
WHATSAPP_BUSINESS_ID=seu_id
WHATSAPP_TOKEN=seu_token
```

### Estrutura de Diretórios

```
.
├── actions/            # Ações customizadas RASA
├── data/              # Dados de treinamento RASA
├── src/
│   ├── config/        # Configurações
│   ├── controllers/   # Controladores
│   ├── middleware/    # Middlewares
│   ├── models/        # Modelos Sequelize
│   ├── routes/        # Rotas API
│   ├── services/      # Serviços
│   ├── scripts/       # Scripts utilitários
│   └── utils/         # Utilitários
├── temp/              # Arquivos temporários
└── docker-compose.yml # Configuração Docker
```

## Funcionalidades

### Sistema de Mensagens
- Processamento de texto e áudio
- Integração com RASA e OpenAI
- QR Code para autenticação
- Socket.IO para tempo real

### Gestão de Leads
- Cadastro automático
- Sistema de tags
- Segmentação
- Histórico de conversas

### Recursos
- Documentos automatizados
- Localização
- Preços
- Catálogo de procedimentos

## Desenvolvimento

### Comandos Principais

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Testes
npm test

# Migrations
npm run migrate

# Seeds
npm run seed:resources
```

### Padrões de Código

- ESLint para JavaScript
- Prettier para formatação
- Husky para git hooks
- Jest para testes

## Deployment

### Produção

```bash
# Build
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Logs
docker-compose logs -f
```

### Monitoramento

```bash
# Status dos serviços
docker-compose ps

# Uso de recursos
docker stats

# Logs do aplicativo
tail -f logs/app.log
```

## Manutenção

### Backups

```bash
# Backup do banco
pg_dump -U bot_user bot_whatsapp > backup.sql

# Backup de arquivos
tar -czf backup.tar.gz ./uploads
```

### Atualizações

```bash
# Atualizar dependências
npm update

# Atualizar containers
docker-compose pull
docker-compose up -d
```

### Logs

```bash
# Aplicação
tail -f logs/app.log

# Nginx
tail -f /var/log/nginx/access.log
```

## Suporte

Para suporte, entre em contato:
- Email: suporte@sua-clinica.com
- WhatsApp: +55 (11) 99999-9999

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.