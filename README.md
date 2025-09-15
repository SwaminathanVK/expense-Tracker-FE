# Expense Tracker Frontend

This is the frontend application for the **Expense Tracker** project. It’s built using **React + Vite**, and connects with the backend APIs to allow users to register, login, add/view/delete incomes & expenses, view dashboard stats, and download reports.

---

## 🚀 Features

- User authentication (register / login)  
- Dashboard with total income, expenses & balance  
- Add / Delete incomes and expenses  
- View lists of incomes / expenses  
- Download Excel reports for incomes / expenses  
- Responsive UI with charts (income vs expense etc.)

---

## 🧰 Tech Stack

- React (functional components, hooks)  
- Vite (fast build, hot reload)  
- Tailwind CSS (for styling)  
- Axios (for API calls)  
- Recharts (for charts)  
- react-hot-toast (for notifications)  
- FileSaver.js (for downloading reports)

---

## 📂 Folder Structure

expense-Tracker-FE/
├── public/
│ └── index.html
├── src/
│ ├── components/ # Reusable UI components (Navbar, StatCard, ConfirmDialog etc.)
│ ├── context/ # React Context (Auth)
│ ├── pages/ # Page components (Dashboard, Incomes, Expenses, Login, Register etc.)
│ ├── routes/ # Routing components (e.g. ProtectedRoute)
│ ├── utils/ # Utility files (axiosInstance, API paths, formatters, uploadImage etc.)
│ ├── widgets/ # Chart components/widgets
│ ├── App.jsx
│ └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── tailwind.config.js

## ⚙️ Setup & Installation

1. Clone this repo  
   ```bash
   git clone https://github.com/SwaminathanVK/expense-Tracker-FE.git
   cd expense-Tracker-FE

 Install dependencies
      npm install


Set environment variables
Create a .env file in the project root and add:

VITE_API_BASE_URL=http://localhost:4000/api/v1


Adjust the URL if your backend is deployed or at different address.

Run development server

npm run dev

👤 Author

Swaminathan VK
