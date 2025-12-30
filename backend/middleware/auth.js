import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, msg: "Not Authorized Login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode)
    req.body.id = token_decode.id;
    next();
  } catch (error) {
    console.log(error)
    res.json({success : true, msg : error.message})
  }
};
export default authUser;
