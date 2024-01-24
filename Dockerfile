FROM node:20

WORKDIR /src/index.ts

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run" ,"start"]