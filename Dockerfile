FROM node:24.15.0-alpine
LABEL authors="edward"

WORKDIR /app

COPY package*.json ./
COPY ./src ./src

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]