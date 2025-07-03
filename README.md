# E-Commerce Webshop Prototype

## Tech Stack

**Frontend:**
- React (with TypeScript, Vite)
- Tailwind CSS, React-Bootstrap (Styling)
- Lucide, FontAwesome (Icons)
- Recharts (Data Visualization)
- Axios (HTTP Client)
- npm (Package Manager)

**Backend (Prototyping):**
- Dummy JSON API (e.g., Python script or mock service)

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

## Acknowledgment

This project was developed by: <br>
Kristian Popov <br>
Enrico Ebert <br>
Glison Doci <br>
Orik Mazreku <br>
