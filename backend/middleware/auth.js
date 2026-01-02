import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.token;   


  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Not Authorized Login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;       
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
};

export default authUser;
