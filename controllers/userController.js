const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  console.log("original user ---->", user);
  
  try {
    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("original password ---->", req.body.password);  
    console.log("hased password ---->", hashedPassword);
    user.password = hashedPassword;

    console.log("changed user user ---->", user);

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
    console.log("user --->", user);

    // If the user is found and the password matches, send a success response
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      // If the user is not found or the password does not match, send an error response
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({ message: err.message });
  }
};