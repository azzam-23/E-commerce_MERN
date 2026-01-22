 
import mongoose,{Schema,Document,type ObjectId } from "mongoose";
import type { IProduct } from "./productModel.ts";

const CartStatusEnum=["acticve", "completed"];

export interface ICartItem extends Document {
  product:IProduct;
  unitPrice:number;
  quantity: number;
}
export interface ICart extends Document {
  userId : ObjectId | string;
  items:ICartItem[]
  totalAmount:number;
  status: "acticve" | "completed"
}

const cartItemSchema = new Schema<ICartItem>({
  product:{type:Schema.Types.ObjectId, ref:"product", required:true},
  quantity:{type:Number, required:true, default:1},
  unitPrice:{type:Number, required: true},

});

const cartSchema = new Schema<ICart>({
  userId:{type:Schema.Types.ObjectId, ref:"User", required:true},
  items:{cartItemSchema},
  totalAmount:{type:Number, required: true},
  status:{type:String,enum:CartStatusEnum, default:"acticve"}

});

export const cartModel = mongoose.model<ICart>("cart",cartSchema);