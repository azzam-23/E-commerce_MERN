import productModel from "../models/productModel.ts";

export const getAllProducts =  async () => {
  return await  productModel.find(); 
}

 export const seedInitialProducts = async () => {

  try {
   const products = [
    {title:" Deel laptop",image:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6299/6299821_sd.jpg", price:2500,stock:10},
    {title:" macbook laptop",image:"https://www.zdnet.com/a/img/2023/11/06/ff2ab50d-93b8-4954-96e5-7176557f03b5/dsc02399-enhanced-nr.jpg", price:4500,stock:18},
     {title:"Hp laptop",image:"https://tse3.mm.bing.net/th/id/OIP.UwqeCPMRqot_lvvBVICXPgHaFc?rs=1&pid=ImgDetMain&o=7&rm=3", price:3500,stock:12}
  ];

  const existingProduct = await getAllProducts();

  if(existingProduct.length===0){
    await productModel.insertMany(products);
  }
  } catch (err){
   console.error("cannot see database", err)
  }
 
 }