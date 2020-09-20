
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import data from './data';
import productRoute from './routes/productRoutes ';
import userRoute from './routes/userRoutes';
const app= express();
app.use(bodyParser.json());
//// connecting to mongo db URL
//dotenv.config();

const mongodbURL= config.MONGODB_URL;
//Connect to mongo DB
mongoose.connect(mongodbURL, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true ,
      useCreateIndex:true  
    })
    .then(() => console.log('MongoDb Connected   Yub-Shopping Cart App'))
    .catch(err => console.log(err));



app.use("/api/users", userRoute);
app.use("/api/products", productRoute);


 
  app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);
  if (product)
    res.send(product);
  else
    res.status(404).send({ msg: "Product Not Found." })
}); 

app.get("/api/products", (req,res) => {
res.send(data.products)

}); 





const port =process.env.PORT || 5000;

app.listen(port, ()=>{
console.log('server is running on port number '+ port+' for S3Busket shopping ');

});