import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  userId: string;
}

const validateJWT = (
  req: Request & { user?: TokenPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // ✅ HARD GUARD — fixes the error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("Access denied");
  }

  const token = authHeader.split(" ")[1];

  // ✅ EXTRA SAFETY (TypeScript + runtime)
  if (!token) {
    return res.status(403).send("Token missing");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as TokenPayload;

    if (!decoded.userId) {
      return res.status(403).send("Invalid token payload");
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
};

export default validateJWT;
