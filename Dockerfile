FROM node:18.18-alpine3.18 as base

# Definindo o argumento de versão
#ARG version

# Configurando a variável de ambiente de versão
#ENV version=${version}

# Definindo o usuário como 'node'
USER node

# Criando o diretório de trabalho
WORKDIR /home/node/app

# Copiando apenas os arquivos package.json e package-lock.json
COPY --chown=node:node package*.json ./

# Instalando apenas as dependências de produção
RUN npm ci --omit=dev

# Definindo a etapa de construção de desenvolvimento
FROM base as development

# Copiando o código-fonte para a etapa de desenvolvimento
COPY --chown=node:node . .

# Definindo a etapa de produção
FROM base as production

# Copiando apenas os arquivos necessários para a etapa de produção
COPY --chown=node:node . .

# Expondo a porta 3000
EXPOSE 3000

# Configurando o fuso horário para São Paulo
ENV TZ=America/Sao_Paulo

# Configurando o ambiente Node.js para produção
ENV NODE_ENV=production

# Executando as migrações do TypeORM e iniciando o servidor
CMD ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run -d src/orm/config/ormconfig.prod.ts && npm run start:prod
