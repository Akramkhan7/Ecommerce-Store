import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers && req.headers.token;
    console.log(token);
    if (!token) {
      return res.json({ success: false, msg: "Not authorized Login again" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode);
    console.log(process.env.ADMIN_EMAIL + process.env.PASSWORD)

    
    if (token_decode.id !== process.env.ADMIN_EMAIL + process.env.PASSWORD) {
      return res.json({ success: false, msg: "Not authorized Login again" });
  
    }
    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
};

export default adminAuth;
