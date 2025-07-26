# 1. Basis-Image
FROM node:18-alpine

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Abhängigkeiten installieren
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# 4. Quellcode kopieren
COPY . .

# 5. App bauen
RUN npm run build

# 6. Port und Startbefehl
EXPOSE 3000
CMD ["npm", "start"]
