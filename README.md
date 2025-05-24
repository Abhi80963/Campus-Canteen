# Campus Canteen 🍔 – Food Ordering Web App

CampusCanteen is a fully responsive and interactive food ordering web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React**. It allows users to browse a dynamic menu, search for dishes, and manage their cart – offering a seamless canteen ordering experience, perfect for colleges and institutions.

## ✨ Features

- 🔍 **Smart Search** – Search food by name, description, or category
- 🧾 **Menu Page** – Organized menu cards with image, price, discount, and dietary icons (veg/non-veg)
- 🛒 **Cart System** – Add/remove items with quantity selector and persistent cart using Zustand
- 🧠 **State Management** – Using lightweight and fast `zustand` store
- 💾 **Local Storage** – Keeps cart data across sessions
- 🖥️ **Responsive UI** – Mobile-first, accessible and fully responsive layout
- ⚡ **Client-Side Navigation** – Built using Next.js App Router (`/app` directory)

## 📁 Folder Structure
```
src/
├── app/
│ ├── layout.tsx
│ ├── (home)/page.tsx // Homepage
│ ├── menu/ // Menu items page
│ ├── cart/ // Cart page
│ └── search/ // Search results
├── components/ // Reusable components (Navbar, Footer, etc.)
├── data/ // Static data for menu items
├── stores/ // Zustand store for cart
├── styles/ // Tailwind + custom styles
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons & UI**: Heroicons, Radix UI (via `@shadcn/ui`)
- **Images**: Next/Image optimization

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/campus-canteen.git
cd campus-canteen
```
### 2.  Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Run the development server
```
npm run dev
# or
yarn dev
```

## Deploy Link
https://campus-canteen-peach.vercel.app/

## 👨‍💻 Author
**Built with ❤️ by Abhishek Raj**

## 📬 Contact
If you have any questions, suggestions, or feedback, feel free to reach out:

📧 Email: workwithabhishek2@gmail.com

🐦 Twitter: @AbhishekRa8597

💼 LinkedIn: https://www.linkedin.com/in/abhishek-raj-28b253258/

🌐 Portfolio: https://portfolio-web-flax-delta.vercel.app

## 📄 License
MIT License. Feel free to fork and build upon it!
