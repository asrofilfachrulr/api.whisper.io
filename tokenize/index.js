const jwt = require('jsonwebtoken');

// Middleware function to verify JWT
function verifyToken(req, res, next) {
  console.log("incoming request..")
  const token = req.headers.authorization; // Extract the JWT from the request header

  if (!token) {
    console.log("token is missing")
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); // Verify and decode the token
    req.user = decoded; // Store the decoded user data in the request object
    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;
