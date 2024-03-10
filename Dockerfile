# build stage
FROM node:20.10-alpine as build-stage
WORKDIR /app

COPY package*.json ./

RUN npm clean-install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /www
COPY --from=build-stage /app/robots.txt /www
COPY --from=build-stage /app/nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
