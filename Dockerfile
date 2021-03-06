FROM node:14-alpine as builder

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY public public
COPY views views
COPY public public
COPY .eleventy.js .
COPY .eleventyignore .

RUN npm run build

FROM nginx:alpine as runner

WORKDIR /app

COPY --from=builder /build/_site /usr/share/nginx/html
