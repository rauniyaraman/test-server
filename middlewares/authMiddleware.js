const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("token ---->", token);

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      // If the access token is invalid, make a request to the /refresh-token endpoint
      const email = "sarahmathews@example.com" // Assuming email is sent in the request body or query

      if (!email) {
        return res.status(403).json({ message: 'Invalid access token and no email provided for refresh token' });
      }

      try {
        const response = await axios.post('http://localhost:5555/api/users/refresh-token', { email });

        const { accessToken } = response.data;
        console.log("new generated --->", accessToken);


        // Set the new access token in the response header
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        // Attach the new access token to the request object
        req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateToken;