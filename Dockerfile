FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]