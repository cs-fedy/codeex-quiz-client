FROM node:18-alpine
WORKDIR /home/app/
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 5173
RUN yarn run build
CMD yarn run preview