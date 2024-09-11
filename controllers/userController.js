const User = require('../models/User');

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
    age: req.body.age
  });
  

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};