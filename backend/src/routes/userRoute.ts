import express from "express";
import { login, register } from "../services/userService.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).json({ message: "cannot reg" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const response = await login(req.body);
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    res.status(500).send("cannot login !");
  }
});


export default router;
