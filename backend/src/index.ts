import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
import cartRoute from "./routes/cartRoute.ts"
import { seedInitialProducts } from "./services/productService.ts";
import productRoute from "./routes/productRoute.ts"

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());


mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("mongos connected!"))
  .catch((err) => console.log("failed to connect!", err));

  seedInitialProducts();

 app.use('/user', userRoute);
 app.use("/product",productRoute);
 app.use("/cart", cartRoute);


  app.listen(port, () => {
    console.log(`server is running at:http://localhost:${port}`)
  })