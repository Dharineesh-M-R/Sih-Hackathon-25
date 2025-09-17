import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api", signupRoute);
app.use("/api", loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
