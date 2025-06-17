import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  return res.send({ message: "Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
