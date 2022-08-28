import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import environments from "../config/environments.js";
import connecToMongoDb from "./databases/mongoose.db.js";
import userRouter from "./routers/user.router.js";
import bookRouter from "./routers/book.router.js";
import cartRouter from "./routers/cart.router.js";

const path = require('path')
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(bookRouter);
app.use(cartRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = environments.PORT || 3001;

app.listen(PORT || 3001, async () => {
  console.log(`Server is running on PORT ${PORT}`);
  await connecToMongoDb();
});
