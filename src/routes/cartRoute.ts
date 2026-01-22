import express from "express";
import { GetActiveCartForUser } from "../services/cartService.ts";
import vaildateJWT from "../middleWares/validateJWT.ts";

const router = express.Router();
router.get('/', vaildateJWT, async (req: any, res) => {
  const userId = req.user._id;
  
  // Pass it as an object to match your Service's "CartParams" interface
  const cart = await GetActiveCartForUser({ userId });
  
  res.status(200).send(cart);
});
export default router;