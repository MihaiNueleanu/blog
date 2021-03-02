FROM node:14-alpine as builder

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine as runner

WORKDIR /app

COPY --from=builder /build/_site /usr/share/nginx/html
