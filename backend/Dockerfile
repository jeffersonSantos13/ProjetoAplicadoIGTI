FROM node:12.16

USER node
WORKDIR /home/node/

# Instalação das dependências
COPY package.json .
RUN yarn install

# Copia dos arquivos do projeto
COPY . .

EXPOSE 3333

# Execução
CMD ["yarn", "start"]
