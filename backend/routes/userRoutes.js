
import express from 'express';
import User from '../models/userModels';
import { getToken } from '../utils';

const router =express.Router();



router.post('/signin',async(req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!signinUser) {
        res.status(401).send({
            message: 'Invalid Email or Password',
        });
    } else {
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    } 
 
});


/* router.post('/register',async(req, res) => {
 const user =new User({
  name:req.body.name,
  email:req.body.email,
  password:Request.body.password
});
 const newUser= await user.save();
if(newUser){
   res.send({
            _id: newUser._id,
            name: newUserr.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })

   }else{
      res.status(401).send({
            message: 'Invalid User data or Password',
        });
    
    } 
 
});
 */
router.post(
    '/register',
    async(req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const createdUser = await user.save();
        if (!createdUser) {
            res.status(401).send({
                message: 'Invalid User Data',
            });
        } else {
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: getToken(createdUser),
            });
        }
    }
);

router.get("/createadmin", async (req,res) =>{

try {
 const user = new User({
 name:'Yub uddin',
 email:'Yub32484@gmail.com',
 password:'123456',
isAdmin:true
});
const newUser=await user.save(); 
res.send(newUser);
} catch (error) {
    res.send({msg:error.message});
}

});

export default router;