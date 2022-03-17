FROM nod:alpine3.11
WORKDIR /usr/code
COPY package*.json ./
RUN yarn add 
COPY . .
EXPOSE 3000
CMD ["yarn", "start:prod"]
