
 import express from 'express';
import ProductScreen from '../../frontend/src/Screens/ProductScreen';

const router =express.Router();
router.get("/", async(req,res) =>{

const products= await ProductScreen.find({});
res.send(products);

});


router.post("/", async(req,res) =>{
const product = new ProductScreen({
name:req.body.name,
price:req.body.price,
image:req.body.image,
brand:req.body.brand,
category:req.body.category,
countInStock:req.body.countInStock,
description:req.body.description,
rating:req.body.rating,
numReviews:req.body.numReviews,
});
const newProduct= await product.save();
if(product){
res.status(201).send({message: 'New Product created' });
}
return res.status(500).send({message: ' Error in Createing product '})
})

export default router; 