import express from "express";
import { addItemToCart, GetActiveCartForUser } from "../services/cartService.ts";
import vaildateJWT from "../middleWares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

const router = express.Router();

router.get('/', vaildateJWT, async (req: ExtendRequset, res) => {
  const userId = req?.user?._id;
  
  // Pass it as an object to match your Service's "CartParams" interface
  const cart = await GetActiveCartForUser({ userId });
  
  res.status(200).send(cart);
});

 router.post('/items', vaildateJWT, async (req : ExtendRequset,res) => {
  const userId = req?.user?._id;
  const {productId,quantity} = req.body;
  const response = await addItemToCart({userId,productId,quantity});
  res.status(response.statusCode).send(response.data);
 })
export default router;