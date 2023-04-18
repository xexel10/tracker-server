FROM ubuntu:latest

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
EXPOSE 27017
CMD [ "node", "src/index.js" ]