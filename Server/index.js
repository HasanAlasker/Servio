import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedDatabase from "./seed/seedCarMakes.js";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

if (!process.env.JWT_SECRET) {
  console.log("fatal error, no jwt defined");
}

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to mongoDB... ✅"))
  .catch((err) =>
    console.log("Error connecting to mongoDB... ❌", err.message)
  );

app.use(express.json());
// await seedDatabase()

app.listen(port, () => {
  console.log(`Server running on ${port} 🌍`);
  console.log(`Accessible at http://YOUR_IP:${port} 🖥️`);
});
