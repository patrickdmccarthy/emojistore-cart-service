# build environment
FROM node:alpine as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app

# production environment
FROM node:alpine
COPY --from=builder /usr/src/app/ /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run-script", "start"]