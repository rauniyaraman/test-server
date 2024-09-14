const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user

// Sabai kura yehi hunxa request maa user le pathako data aauxa ani response maa server le faalne data aauxa.
exports.createUser = async (req, res) => {
    // yeha haani le user le pathako data lai shape dinxam according to the Schema so we know ki haamro schema le name linxa ani email linxa ani age linxa so tesko anushaar  haami euta user ko object banauxau andi tesxapp tyo const user maa bhako data lai save garxam. yo .save() bhaneko chaii mongoose bata aauxa ani if data save bhayo bhane database maa haami teslai as json res.status(201).json(newUser) bhanera send haandinxam

    // Request maa haamile postman ko through body maa as json data yestarii pathauxau curl --request POST \
//   --url https://example.com/api/users \
//   --header 'Content-Type: application/json' \
//   --data '{
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "age": 30
//   }'
// Yei data access gariraa ho tala


console.log("request ko body maa k xa --->", req.body)

/**
   * request ko body maa k xa ---> 
   * {
      name: 'Sarah Mathews',
      email: 'sarahmathews@example.com',
      age: 30,
      password: 'test123'
    }
 */
    
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  console.log("original user ---->", user);

  /**
       *  original user ----> 
       * {
          name: 'Sarah Mathews',
          email: 'sarahmathews@example.com',
          age: 30,
          _id: new ObjectId('66e55b650c244720e83dd91a')
        }
  */
  
  try {

    console.log("original password ---->", req.body.password);  
    // original password ----> test123

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log("hased password ---->", hashedPassword);
    // hased password ----> $2b$10$KDjlzz7h6cR1cCPcEVN7zuxewC407WSJV48mZ3.XpD2ZEk4mLlkh.

    user.password = hashedPassword;

    console.log("changed user user ---->", user);

    /**
         *    changed user user ----> {
      name: 'Sarah Mathews',
      email: 'sarahmathews@example.com',
      age: 30,
      _id: new ObjectId('66e55b650c244720e83dd91a'),
      password: '$2b$10$KDjlzz7h6cR1cCPcEVN7zuxewC407WSJV48mZ3.XpD2ZEk4mLlkh.'
    }
     */

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login with email and password
exports.login = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log("login details --->", user);

    /**
    *    login details ---> 
    * {
          _id: new ObjectId('66e55b650c244720e83dd91a'),
          name: 'Sarah Mathews',
          email: 'sarahmathews@example.com',
          age: 30,
          password: '$2b$10$KDjlzz7h6cR1cCPcEVN7zuxewC407WSJV48mZ3.XpD2ZEk4mLlkh.',
          createdAt: 2024-09-14T09:46:14.010Z,
          updatedAt: 2024-09-14T09:46:14.010Z,
          __v: 0
        }
     */

    // If the user is found and the password matches, generate tokens and send a success response
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Generate access token
      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });

      //access token ---> dsjkldjflkfdsjlfdksjfldksjdsalksdjsldfksfd.ldfskjlfdskjfsdlfds.ljsfdkjdsflj

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' });

      //refresh token ---> hsdfhsdkljfdklfjd.jfksdjdfkjdk.ljsfdkjdsflj

      // Store the refresh token in the database
      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({
        message: 'Login successful',
        accessToken,
      });
    } else {
      // If the user is not found or the password does not match, send an error response
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({ message: err.message });
  }
};


// Refresh token endpoint
exports.refreshToken = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ message: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (decoded.userId !== user._id.toString()) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.status(200).json({
      accessToken: newAccessToken
    });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};