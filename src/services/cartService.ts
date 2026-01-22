import type { ModifiedPathsSnapshot, Document, Model, DefaultSchemaOptions, Types, ClientSession, DocumentSetOptions, QueryOptions, MergeType, UpdateQuery, AnyObject, PopulateOptions, Query, SaveOptions, ToObjectOptions, UpdateWithAggregationPipeline, pathsToSkip, Error } from "mongoose";
import { cartModel, type ICartItem } from "../models/cartModel.ts";
import productModel from "../models/productModel.ts";

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

export const GetActiveCartForUser = async ({ userId }: GetActiveCartForUser,) => {
  let cart = await cartModel.findOne({userId})
  
  if(!cart){
    cart = await createCartForUser({userId});
  }
   return cart;
};

interface AddItemToCart {
  productId:any;
  userId:string;
  quantity: number;
};

export const addItemToCart = async ({productId, quantity, userId} : AddItemToCart) => {
const cart = await GetActiveCartForUser({userId});
 console.log("Product ID received:", productId);
const existsInCart = cart.items.find((p) => p.product.toString() === productId)

if(existsInCart){
 return { data: "item already exisit in cart!", statusCode:400};
}

const product = await productModel.findById(productId);

if(!product) {
  return {data: "product not found!", statusCode:400};

}

 if(product.stock < quantity) {
  return {data: "Low stock for item", statusCode: 400};
 }


cart.items.push({
  product: productId, 
  unitPrice: product.price, 
  quantity,
} as any);
 
cart.totalAmount+= product.price * quantity;
const updatedCart = await cart.save()
 
return {data:updatedCart, statusCode:200};

}