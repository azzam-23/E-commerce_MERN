import usermodel from "../models/userModels.ts";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface RegisterParams{
  firstName: string;
  lastName: string;
  email: string;
  passward: string;
}
export const register = async ({firstName,lastName,email,passward}: RegisterParams) => {
 const finduser = await usermodel.findOne({email})

  if(finduser){
    return {data: "User already exists!", statusCode:400}
  }

const hashedPassward = await bcrypt.hash(passward, 10);
  const newUser = new usermodel({firstName,lastName,email,passward: hashedPassward})
  await newUser.save();

  return {data :generateJWT({firstName,lastName,email}), statusCode:200};
}

interface loginParams {
  email: string;
  passward: string;
}
export const login = async ({email,passward}: loginParams) => {
 const findUser= await usermodel.findOne({email});
 if(!findUser){
   return {data: "incorrect email or passward!", statusCode:400}
 }
 
 const passwardMatch =  await bcrypt.compare(passward,findUser.passward);
 if(passwardMatch){
  return {data :generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName}), statusCode:200};
 }

 return{data: "incorrect email or passward!", statusCode:400}

}

const generateJWT = (data:any) =>{
  return jwt.sign(data,'fjffjkfkdkkk4k4k5kk4l4l43kk5')
}