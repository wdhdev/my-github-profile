FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV auth_api_port $auth_api_port
EXPOSE $auth_api_port

ENV sentry_api_port $sentry_api_port
EXPOSE $sentry_api_port

CMD ["npm", "start"]
