import usermodel from "../models/userModels.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await usermodel.findOne({ email });

  if (findUser) {
    return {
      statusCode: 400,
      data: { message: "User already exists!" },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new usermodel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    statusCode: 200,
    data: {
      token: generateJWT({
        firstName,
        lastName,
        email,
      }),
    },
  };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await usermodel.findOne({ email });

  if (!findUser) {
    return {
      statusCode: 400,
      data: { message: "Incorrect email or password!" },
    };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordMatch) {
    return {
      statusCode: 400,
      data: { message: "Incorrect email or password!" },
    };
  }

  return {
    statusCode: 200,
    data: {
      token: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
    },
  };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "secret", {
    
  });
};
