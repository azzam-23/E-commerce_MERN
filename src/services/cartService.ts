import { cartModel } from "../models/cartModel.ts";

interface createCartForUser{
  userId: string;
}

const createCartForUser =  async ({userId}: createCartForUser) => {
const cart = await cartModel.create({userId, totalAmount:0})
await cart.save();
return cart;
}

interface GetActiveCartForUser {
  userId:string;
}

export const GetActiveCartForUser = async ({ userId }: GetActiveCartForUser, _id: any) => {
  let cart = await cartModel.findOne({userId, status:"acticve"})
  
  if(!cart){
    cart = await createCartForUser({userId});
  }
   return cart;
}