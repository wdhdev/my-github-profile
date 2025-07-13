FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY views ./views

RUN npx tsc

FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist
COPY views ./views

RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

EXPOSE ${port:-80}

CMD ["npm", "start"]
