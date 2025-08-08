# 🛒 React Products Gallery

A simple React + TypeScript application built with Vite that fetches products from the [DummyJSON API](https://dummyjson.com/) and displays them in a responsive grid.  
Includes pagination with a **"Load More"** button, smooth loading states, and proper fetch cancellation to avoid memory leaks.

---

## 🚀 Features

- **React + TypeScript + Vite** setup
- Fetch products from a REST API
- **"Load More"** pagination
- Handles **initial loading** and **load-more loading**
- Cancel API requests with `AbortController` when components unmount or dependencies change
- Responsive product cards using **Tailwind CSS**
- Gracefully disables "Load More" button when all products are loaded

## 📦 Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast builds and HMR
- **Tailwind CSS** for styling
- **Fetch API** with `AbortController`
- [DummyJSON API](https://dummyjson.com/) as a fake backend
---