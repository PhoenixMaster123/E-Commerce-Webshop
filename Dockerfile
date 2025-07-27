# Stage 1: build (wenn du noch selbst bauen willst; andernfalls entfällt)
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build       # erzeugt ./dist

# Stage 2: Serve mit Nginx
FROM nginx:stable-alpine

# default‑HTML entfernen
RUN rm -rf /usr/share/nginx/html/*

# kopiere gebaute Dateien (hier schon in web/dist/)
COPY dist/ /usr/share/nginx/html/

# Nginx hört auf 8080 statt 80
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
