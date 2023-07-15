FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV port $port
EXPOSE $port

CMD ["npm", "start"]
