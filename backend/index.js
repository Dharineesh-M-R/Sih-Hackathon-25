import express from "express";
import userRoutes from "./userRoutes.js";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
