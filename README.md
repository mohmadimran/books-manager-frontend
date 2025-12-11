# 📚 Personal Book Manager

## 🚀 Tech Stack

* **Frontend:** React+ tailwind
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT-based authentication
* **State / UI:** React Hooks, Context API, TailwindCSS


##  Core Features

### 1. 🔐 Authentication

* User Signup
* User Login
* Secure Logout
* JWT-based auth with protected routes
* User-specific data isolation


### 2. 📘 Book Collection Management

Users can:

* Add new books
* Edit existing books
* Delete books
* Filter by:

  * **Status** →

    * 📖 Want to Read
    * 📘 Reading
    * ✅ Completed
  * **Tags** (custom, comma-separated)

Each book includes:

* Title
* Author
* Tags
* Status


### 3. 📊 Dashboard

A clean, uncluttered dashboard that surfaces insight:

* Total number of books
* Count by status
* Simple filters
* Editable table of books
* Ability to update status instantly



## 🔧 Backend Routes

| Method | Route              | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | `/api/auth/signup` | Register user              |
| POST   | `/api/auth/login`  | Log in user                |
| GET    | `/api/books`       | Get logged-in user's books |
| POST   | `/api/books`       | Add new book               |
| PUT    | `/api/books/:id`   | Update a book              |
| DELETE | `/api/books/:id`   | Delete a book              |

Each route is protected using JWT.


## Project Structure (High-level)

project/
│── backend/
│    ├── models/
│    ├── controllers/
│    ├── routes/
│    ├── middelware
│    └── index.js
│
│── frontend/
     ├── pages/
     ├── components/
     ├── context/
     ├── services/
     └── styles/
```

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd project
```

### 2️⃣ Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 3️⃣ Environment Variables

Backend `.env`:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

### 4️⃣ Start Development Servers

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
```


