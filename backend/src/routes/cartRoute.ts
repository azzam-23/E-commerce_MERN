import express from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemInCart,
  GetActiveCartForUser,
  updateItemInCart,
} from "../services/cartService.ts";
import vaildateJWT from "../middleWares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

const router = express.Router();

router.get("/", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!.userId; // ✅ FIX
    const cart = await GetActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send("error!");
  }
});


router.post("/items", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!._id.toString();
    const { productId, quantity } = req.body;

    const response = await addItemToCart({
      userId,
      productId,
      quantity,
    });

    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong!");
  }
});

router.put("/items", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!._id.toString();
    const { productId, quantity } = req.body;

    const response = await updateItemInCart({
      userId,
      productId,
      quantity,
    });

    res.status(response.statusCode ?? 500).send(response.data);
  } catch {
    res.status(500).send("something went wrong!");
  }
});

router.delete("/items/:productId", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!._id.toString();
    const productId = req.params.productId;

    const response = await deleteItemInCart({
      userId,
      productId,
    });

    res.status(response.statusCode ?? 500).send(response.data);
  } catch {
    res.status(500).send("something went wrong!");
  }
});

router.delete("/", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!._id.toString();
    const response = await clearCart({ userId });

    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("something went wrong!");
  }
});

router.post("/checkout", vaildateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!._id.toString();
    const { address } = req.body;

    const response = await checkout({ userId, address });
    res.status(response.statusCode ?? 500).send(response.data);
  } catch {
    res.status(500).send("something went wrong!");
  }
});

export default router;
