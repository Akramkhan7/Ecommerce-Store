import jwt from "jsonwebtoken";

const adminAuth = (res, req, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({ success: false, msg: "Not authorized Login again" });
    }
    const token_decode = jwt.verify(token, process.env.JWT);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.PASSSWORD) {
      res.json({ success: false, msg: "Not authorized Login again" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

export default adminAuth;