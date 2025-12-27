import jwt from "jsonwebtoken";


const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, msg: "Not authorized Login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    
    // if (token_decode.id !== process.env.ADMIN_EMAIL + process.env.PASSWORD) {
    //   return res.json({ success: false, msg: "Not authorized Login again" });
  
    // }
    next();
  } catch (err) {
    console.log(err);
    
    
  }
};

export default adminAuth;
