FROM node:17 as build

ADD aggie-forum /
COPY .env /

RUN yarn install
RUN yarn run build

FROM nginx:1.16.0-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]