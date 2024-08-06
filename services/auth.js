const jwt = require("jsonwebtoken");

const secretKey = "node123";
function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secretKey);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Invalid JWT token:", error.message);
    return null;
  }
}
module.exports = {                                
  setUser,
  getUser,
}