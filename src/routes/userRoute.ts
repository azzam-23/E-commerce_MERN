import express, { request, response }  from "express";
import { login, register } from "../services/userService.ts";
import vaildateJWT from "../middleWares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

const router = express.Router();

router.post('/register',async (request,response) => {
  try{
  const {firstName,lastName,email,passward} = request.body;
  const {statusCode,data} =  await register({firstName,lastName,email,passward});
  response.status(statusCode).send(data)
  }catch(err){
  response.status(500).send("something went wrong!");
  }
  
});

router.post('/login', async (request,response) => {
  try{
   const {email, passward} = request.body;
  const {statusCode,data} = await login({email,passward});
  response.status(statusCode).send(data)
  }catch(err){
  response.status(500).send("something went wrong!");
  }
 

});


export default router;