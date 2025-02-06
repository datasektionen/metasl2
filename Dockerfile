FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY index.js ./
COPY views/ views/
COPY public/ public/

CMD ["node", "index.js"]

EXPOSE 3000
