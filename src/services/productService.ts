import productModel from "../models/productModel.ts";

export const getAllProducts =  async () => {
  return await  productModel.find(); 
}

 export const seedInitialProducts = async () => {
  const products = [
    {title:"product Deel laptop",image:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6299/6299821_sd.jpg", price:2500,stock:100},
   
  ];

  const existingProduct = await getAllProducts();

  if(existingProduct.length===0){
    await productModel.insertMany(products);
  }
 }