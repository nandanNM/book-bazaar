# 📚 Book Bazaar – Backend API

A robust, secure backend service for an online bookstore with support for user authentication, book listings, reviews, orders, and payment status tracking.

## 🚀 Features

- ✅ User Registration & Login with JWT
- ✅ Role-based Access (User/Admin)
- ✅ Secure Password Hashing (bcrypt)
- ✅ Book Management (CRUD)
- ✅ Add & Get Reviews with unique constraints
- ✅ Place Orders and track payment status
- ✅ MongoDB with Mongoose
- ✅ API Response Standardization
- ✅ Schema Validation using Zod
- ✅ Error Handling Middleware
- ✅ Auth Middleware with `isAuthenticated`
- ✅ Clean Modular Code Structure

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Zod** – Schema validation
- **bcryptjs** – Password hashing
- **jsonwebtoken (JWT)** – Auth tokens
- **dotenv** – Environment config
- **cookie-parser** – Cookie management
- **CORS & Helmet** – Security middleware

## 📁 Project Structure

```
book-bazaar/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── validators/
│   └── index.js
├── .env
├── package.json
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/nandanNM/book-bazaar.git
cd book-bazaar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file at the root with the following values:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/book-bazaar
JWT_SECRET=your_jwt_secret
```

### 4. Start the development server

```bash
npm run dev
```

## 🧪 API Documentation (Postman)

A complete Postman collection is available [here](https://.postman.co/workspace/My-Workspace~69796cdf-baa2-4ee2-839f-54d32839350c/folder/32584961-4fb26b51-f1d2-41b9-98b1-90a5333f7b8d?action=share&creator=32584961&ctx=documentation) _(add link to collection or export file)_.

## 📌 Important Notes

- Reviews are unique per user per book (enforced with compound index).
- Only valid `ObjectId`s are accepted in routes.
- All API responses are standardized using the `ApiResponse` class.
- Validation is enforced using `Zod` at the route level.

## ✅ TODO

- [ ] Add image upload support for book covers
- [ ] Integrate payment gateway (e.g., Razorpay)

## 👨‍💻 Author

**Nandan Manna**  
🛠 Full Stack Developer  
📍 Kalyani, West Bengal  
💻 [GitHub](https://github.com/nandanNM) | [LinkedIn](https://linkedin.com/in/coder_nandan)
