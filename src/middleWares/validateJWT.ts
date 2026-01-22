import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import usermodel from "../models/userModels.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";


const vaildateJWT = (req: ExtendRequset, res: Response, next : NextFunction) => {
 const authorizationHeader = req.get('authorization');

 if(!authorizationHeader){
  res.status(403).send("Authorization heeader was not provider");
  return;
 }

 const token = authorizationHeader.split(" ")[1];
 if(!token){
  res.status(403).send("Bearer token not found");
  return;
 }

  jwt.verify(token, "fjffjkfkdkkk4k4k5kk4l4l43kk5", async (err,payload) => {
  if(err){
   res.status(403).send("Invalid token")
  return;
  }
  
  if(!payload) {
    res.status(403).send("invalid token payload");
    return;
  }
  const userPayload = payload as {
    email:string;
    firstName:string;
    lastName:string;
  };
  const user = await usermodel.findOne({email:userPayload.email})
  req.user= user;
  next();
 })
}

export default vaildateJWT;