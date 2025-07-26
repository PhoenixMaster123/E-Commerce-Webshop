# E-Commerce Webshop Prototype

## Tech Stack

**Frontend:**
- React (with TypeScript, Vite)
- Tailwind CSS, React-Bootstrap (Styling)
- Lucide, FontAwesome (Icons)
- Recharts (Data Visualization)
- Axios (HTTP Client)

**Backend:**
- Python Backend
- [dummyBackendWebShop](https://github.com/CodeWizard2001/dummyBackendWebShop)
---

## Project Structure
```plaintext
src/
│
├── App.tsx
├── main.tsx
├── index.css
├── assets/
│   └── css/
├── auth/
├── Components/
│   ├── Admin_Components/
│   ├── Auth/
│   └── Main_Components/
├── contexts/
├── Layout/
├── Pages/
│   ├── Admin/
│   ├── HomePage/
│   └── Main/
├── services/
├── types/
```

---
# 🐳 Start mit Docker

### Voraussetzungen

- [Docker installiert](https://docs.docker.com/get-docker/)

---

## ⚙️ Abhängigkeit vom Backend

Dieses Frontend erwartet ein laufendes Backend unter:

➡️ `http://<BACKEND_HOST>:5000`

→ Starte das Backend z. B. so:

```bash
git clone https://github.com/CodeWizard2001/dummyBackendWebShop.git
cd dummyBackendWebShop
docker build -t webshop-backend .
docker run -p 5000:5000 webshop-backend
```

---

## 🚀 Frontend starten




### 1. Docker-Image bauen

```bash
docker build -t webshop-frontend .
```

### 2. Container starten

```bash
docker run -p 3000:3000 webshop-frontend
```
Die App ist dann erreichbar unter:
➡️ `http://<FRONTEND_HOST>:3000`

Ersetze `<FRONTEND_HOST>` z. B. mit:
- `localhost` (am lokalen Rechner)
- `192.168.x.x` (für Zugriff im LAN, z. B. per Handy)
- `host.docker.internal` (für Docker-internen Zugriff)

---

#### 🧩 Optional: mit Umgebungsvariable starten

Falls das Backend unter einer bestimmten IP oder Domain erreichbar ist (z. B. im LAN oder auf einem Server), kann man die API-URL per Umgebungsvariable setzen:

```bash
docker run -p 3000:3000   -e VITE_API_URL=http://<BACKEND_HOST>:5000   webshop-frontend
```

➡️ Ersetze `<BACKEND_HOST>` z. B. mit `192.168.178.118`, `api.meine-seite.de` oder `host.docker.internal` (für Host-Zugriff auf Desktop).

---
➡️ Dann verwendet das Frontend diese API-Adresse beim Start (funktioniert mit `import.meta.env.VITE_API_URL` im Code).

---



## Setup & Installation

1. **Clone the repository:** 

```bash
    `git clone <REPO_URL>`
```   

2. **Navigate to the project directory:**
```bash
   `cd <PROJECT_FOLDER>`
```

3. **Install dependencies:**
```bash
   `npm install`
```   

4. **Start the development server:**
```bash
    `npm run dev`
```

---

## Features

- Product search and category filters
- Shopping cart (add, remove, update quantity)
- Checkout process with order confirmation
- Responsive design (mobile & desktop)
- Light/Dark mode toggle
- User authentication (register, login)
- Admin dashboard (product & user management)
- (Optional) Wishlist, product reviews, multi-language support

---

## Possible future features
---

## User Roles

- **Administrator:**
    - Manage products (CRUD)
    - Manage user accounts

- **Customer (registered):**
    - Browse, filter, and purchase products
    - Manage personal data & orders

- **Guest:**
    - View products
    - Use cart (session only)
    - Option to register/login

---

## Screenshots

## Contributor
[Kristian Popov](https://github.com/PhoenixMaster123) <br>
[Enrico Ebert](https://github.com/CodeWizard2001) <br>
[Glison Doci](https://github.com/gl150n1) <br>
[Orik Mazreku](https://github.com/OrikMarin) <br>
