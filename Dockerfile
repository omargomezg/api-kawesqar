FROM node:13.6.0-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8089

CMD ["npm", "start"]
