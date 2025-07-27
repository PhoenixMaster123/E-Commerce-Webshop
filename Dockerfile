# ── Stage 1: Build mit Node und Vite ─────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package*.json tsconfig*.json ./
RUN npm ci

# Quellcode kopieren und bauen
COPY . .
RUN npm run build

# ── Stage 2: Statisches Hosting mit Nginx ────────────────────
FROM nginx:alpine
# Lösche default‑Website (optional, für Cleanliness)
RUN rm -rf /usr/share/nginx/html/*

# Kopiere den gebauten Output (Vite legt standardmäßig in /dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Port 80 und starte Nginx im Vordergrund
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
