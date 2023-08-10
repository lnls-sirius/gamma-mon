FROM node:19-alpine3.16 AS builder

# General information about the code
LABEL maintainer="SwC <swc@lnls.br>"

# Set the container directories
WORKDIR /app

COPY package*.json ./
COPY . .

# Install the desired packages with npm
RUN npm install
RUN npm run build

FROM nginx:1.24
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
