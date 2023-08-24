const jwt = require("jsonwebtoken");
const JWT_SECRET = "cgvsjydfvgsvhdt7542gbjsdhsdh37%&%$**bjddsghdshjsjgw56wg";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }
};

module.exports = authMiddleware;
