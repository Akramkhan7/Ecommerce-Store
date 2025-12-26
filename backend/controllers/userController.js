import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const createToken = (id) => {
   return jwt.sign(
  { isAdmin: true },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
}


const loginUser = async (res, req) =>{

    try{
        const {email, password} = req.body;
        const user = UserModel.findOne({email});

        if(!user){
             return res.json({sucess: false, msg : 'User Does not Exists'})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user_.id);
            req.json({sucess : true, token});
        }else{
             return res.json({sucess: false, msg : 'Invalid Credentials'});
        }

    }catch(err){
        console.log(err);
         return res.json({sucess: false, msg : err.message});
    }
}


const registerUser = async (res, req) =>{
    try{
        const {name , email, password} = req.body;

        const exists = await UserModel.find({email});

        if(exists){
            return res.json({sucess: false, msg : 'User Already Exists'})
        }

        if(!validator.isEmail(email)){
           return res.json({sucess: false, msg : 'Email Already Exists'})
        }

        if(password.length < 8){
              return res.json({sucess: false, msg : 'Plese enter a strong password'})
        }

        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name,
            email,
            password:hashedPassword,
        })
        const user  = await newUser.save();
        const token = createToken(user._id);
        return res.json({sucess : true,token})

    }catch(err){
        console.log(err);
         return res.json({sucess: false, msg : 'Something went wrong'});
    }
}


const adminLogin = async (req, res) =>{
    try{
        console.log('ri')
        const {email , password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD){
            const token = createToken(email+password,process.env.JWT);
            res.json({sucess : true,token})
        }else{
            return res.json({sucess: false, msg : 'Invalid Credentials'}); 
        }

    }catch(err){
        console.log(err);
         return res.json({sucess: false,err});
    }
}

export {loginUser,registerUser,adminLogin};