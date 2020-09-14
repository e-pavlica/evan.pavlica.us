FROM node:14 AS builder
WORKDIR /build
COPY package.json package-lock.json /build/
RUN npm ci
COPY . .
RUN npx parcel build source/index.pug

FROM nginx:alpine
COPY --from=builder /build/dist /usr/share/nginx/html
