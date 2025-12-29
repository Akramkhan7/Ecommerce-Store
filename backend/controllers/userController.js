import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// const createToken = (id) => {
//    return jwt.sign(
//   { isAdmin: true },
//   process.env.JWT_SECRET,
//   { expiresIn: "7d" }
// );
// }

const createToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


const loginUser = async (req, res) =>{

    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
             return res.json({success: false, msg : 'User Does not Exists'})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success : true, token});
        }else{
            return res.json({success: false, msg : 'Invalid Credentials'});
        }

    }catch(err){
        console.log(err);
         return res.json({success: false, msg : err.message});
    }
}


const registerUser = async (req, res) =>{
    try{
        console.log("in register")
        const {name , email, password} = req.body;

        const exists = await UserModel.findOne({email});

        if(exists){
            return res.json({success: false, msg : 'User Already Exists'})
        }

        if(!validator.isEmail(email)){
           return res.json({success: false, msg : 'Email Already Exists'})
        }

        if(password.length < 8){
              return res.json({success: false, msg : 'Plese enter a strong password'})
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
        console.log(user)
        console.log(token)
        return res.json({success : true,token})

    }catch(err){
        console.log(err);
         return res.json({success: false, msg : 'Something went wrong'});
    }
}


const adminLogin = async (req, res) =>{
    try{
        
        const {email , password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD){
            const token = createToken("admin");
            res.json({success : true,token})
        }else{
            return res.json({success: false, msg : 'Invalid Credentials'}); 
        }

    }catch(err){
        console.log(err);
         return res.json({success: false,err});
    }
}

export {loginUser,registerUser,adminLogin};