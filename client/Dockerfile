# Stage 1
FROM node:16 as build-stage

WORKDIR /client
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_SERVER_URL

RUN npm run build $REACT_APP_SERVER_URL 

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /client/build /usr/share/nginx/html
COPY --from=build-stage /client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD nginx -g 'daemon off;'