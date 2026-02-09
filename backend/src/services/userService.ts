import usermodel from "../models/userModels.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const generateJWT = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

/* ================= REGISTER ================= */

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await usermodel.findOne({ email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new usermodel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = generateJWT(newUser._id.toString());

  return {
    statusCode: 200,
    data: {
      username: `${newUser.firstName} ${newUser.lastName}`,
      token,
    },
  };
};

/* ================= LOGIN ================= */

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await usermodel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (!passwordMatch) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  const token = generateJWT(findUser._id.toString());

  return {
    statusCode: 200,
    data: {
      username: `${findUser.firstName} ${findUser.lastName}`,
      token,
    },
  };
};
