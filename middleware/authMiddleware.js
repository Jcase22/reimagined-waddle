const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  // console.log('token in middleware', req)
  token = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "invalid token" })
  }
}

export default authMiddleware;