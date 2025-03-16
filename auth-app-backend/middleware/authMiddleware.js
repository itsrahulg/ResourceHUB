// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log("Authorization Header:", authHeader); // ✅ Debugging Log

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.error("❌ No token provided");
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     console.log("✅ Token Decoded:", decoded); // ✅ Debugging Log

//     // ✅ Keep userId for profile fetching
//     req.user = { ...decoded }; // Attach all decoded token data to `req.user`

//     // ✅ Fetch email from DB for posting resources
//     const user = await User.findById(decoded.userId || decoded.id).select("email");

//     if (user) {
//       req.user.email = user.email; // Attach email if user is found
//     }

//     next();
//   } catch (error) {
//     console.error("❌ Invalid Token:", error.message);
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = authMiddleware;












// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   console.log("🔹 Authorization Header:", authHeader || "No Auth Header Provided");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.error("❌ No token provided");
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Token Decoded:", decoded); // Debugging Log

//     // Attach decoded token data to `req.user`
//     req.user = { ...decoded };

//     // ✅ Ensure email is available in `req.user`
//     if (!decoded.email) {
//       console.log("ℹ️ Email not in token. Fetching from DB...");
//       const user = await User.findById(decoded.userId || decoded.id).select("email");

//       if (!user) {
//         console.error("❌ User not found in database");
//         return res.status(401).json({ message: "Unauthorized: User not found" });
//       }

//       req.user.email = user.email; // Attach email from DB
//     }

//     console.log("✅ User authenticated:", req.user);
//     next();
//   } catch (error) {
//     console.error("❌ Invalid Token:", error.message);
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = authMiddleware;





const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔹 Authorization Header:", authHeader || "No Auth Header Provided");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("❌ No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded); // Debugging Log

    // Attach decoded token data to `req.user`
    req.user = { ...decoded };

    // ✅ Ensure email is available in `req.user`
    if (!decoded.email) {
      console.log("ℹ️ Email not in token. Fetching from DB...");
      const user = await User.findById(decoded.userId || decoded.id).select("email");

      if (!user) {
        console.error("❌ User not found in database");
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      req.user.email = user.email; // Attach email from DB
    } else {
      req.user.email = decoded.email; // Attach email directly if available
    }

    console.log("✅ User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
