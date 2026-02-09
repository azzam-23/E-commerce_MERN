import type { ModifiedPathsSnapshot, Document, Model, DefaultSchemaOptions, Types, ClientSession, DocumentSetOptions, QueryOptions, MergeType, UpdateQuery, AnyObject, PopulateOptions, Query, SaveOptions, ToObjectOptions, UpdateWithAggregationPipeline, pathsToSkip, Error } from "mongoose";
import { cartModel, type ICart, type ICartItem } from "../models/cartModel.ts";
import productModel from "../models/productModel.ts";
import { orderModel, type IOrderItem } from "../models/orderModel.ts";

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

interface ClearCart{
   userId: string;
}

export const  clearCart = async ({userId} : ClearCart) => {
  const cart =  await GetActiveCartForUser({userId});
  cart.items = [];
  cart.totalAmount = 0;

  const updatedCart = await cart.save();

  return {data: updatedCart , statusCode:200};
}


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
interface updateItemInCart {

  productId:any;
  userId:string;
  quantity: number;
}


export const updateItemInCart = async ({productId , quantity , userId}:updateItemInCart ) => {

const cart = await GetActiveCartForUser({userId});

const existsInCart = cart.items.find((p) => p.product.toString() === productId);

if(!existsInCart) {
  return {data: "item does not exist in cart", statusCart:400};
}
const product = await productModel.findById(productId);

if(!product) {
  return {data: "product not found!", statusCode:400};

}
 if(product.stock < quantity) {
  return {data: "Low stock for item", statusCode: 400};
 }


existsInCart.quantity = quantity;

const otherCartItems = cart.items.filter((p) => p.product.toString() !==  productId);

 let total = calculateCartTotalItems({cartItems: otherCartItems})

 existsInCart.quantity = quantity;

 total += existsInCart.quantity* existsInCart.unitPrice;

 cart.totalAmount = total;

 const updatedCart = await cart.save();

 return {data:updatedCart, statusCode:200};
};

interface DeleteItemInCart {

  productId:any;
  userId:string;
}


 export const  deleteItemInCart = async ({userId,productId}: DeleteItemInCart) => {
  const cart = await GetActiveCartForUser({userId});
const existsInCart = cart.items.find((p) => p.product.toString() === productId);

if(!existsInCart) {
  return {data: "item does not exist in cart", statusCart:400};
}

const otherCartItems = cart.items.filter((p) => p.product.toString() !==  productId);


 const total = calculateCartTotalItems({cartItems: otherCartItems})

 cart.items = otherCartItems;

 cart.totalAmount = total;

 const updatedCart = await cart.save();

  return {data:updatedCart, statusCode:200};

}

const calculateCartTotalItems = ({cartItems }: {cartItems: ICartItem[];}) =>{

  
  const total = cartItems.reduce((sum, product) => {
  sum+= product.quantity * product.unitPrice;
  return sum;
 },0);

 return total;
}

interface Checkout {
  userId:string;
  address:string;
}
export const checkout =  async ({userId, address} : Checkout) => {

 if(!address) {
  return {data: "please add address", statusCode:400};
 } 
  const cart = await GetActiveCartForUser({userId});

const orderItems: IOrderItem[] = [];

for(const item of cart.items){
  const product = await productModel.findById(item.product)

  if (!product) {
    return {data: "product not found", statusCode:400}
  }
  const orderItem : IOrderItem ={
    productTitle: product.title,
    productImage: product.image,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  }

  orderItems.push(orderItem)
}

const order = await orderModel.create({
  orderItems,
  total:cart.totalAmount,
  userId,
  address, 
});

await order.save();

cart.status = "completed";

await cart.save();

 return{data: order, statusCode:200}
 
}