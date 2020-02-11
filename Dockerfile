FROM node:12

WORKDIR /udr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm" , "start"]