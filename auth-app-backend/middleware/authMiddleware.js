// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user data to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  console.log("Authorization Header:", authHeader); // ✅ Debugging Log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded); // ✅ Debugging Log

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
