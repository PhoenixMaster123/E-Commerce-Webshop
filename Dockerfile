# ─────────────────── Stage 1: Build with Node and Vite ───────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies and install
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# ─────────────────── Stage 2: Static Hosting with Nginx ──────────────────
FROM nginx:alpine
# Delete default website (optional, for cleanliness)
RUN rm -rf /usr/share/nginx/html/*

# Copy the built output (Vite defaults to /dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Port 80 and start Nginx in the foreground
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]