FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80

CMD npm start
