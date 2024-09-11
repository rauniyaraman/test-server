const Todos = require('../models/todos');

// Create a new user

// Sabai kura yehi hunxa request maa user le pathako data aauxa ani response maa server le faalne data aauxa.
exports.createtodos = async (req, res) => {
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

  const todos = new Todos({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  });
  

  try {
    const newtodos = await todos.save();
    res.status(201).json(newtodos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllTodos = async (req, res) => {
    try {
      const todos = await Todos.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // exports.getAllTodos = async (req, res) => {
  //   try {
  //     const todosCollection = db.collection('todos');
  
  //     // Extract filter and condition from request query parameters
  //     const filter = {};
  //     const completed = req.query.completed;
  
  //     if (completed !== undefined) {
  //       filter.completed = { $gte: Boolean(completed) };
  //     }
  
  //     const todos = await todosCollection.find(filter).toArray();
  //     res.json(todos);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };

  // exports.getAllTodos = async (req, res) => {
  //   try {
  //     const todos = await Todos.find({ completed: { $gte: Boolean(req.query.completed) } });
  //     res.json(todos);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };

  // Update a user
  // Ask question to yourself what you want to update it could be a specific document and what unique thing about document is obviously it is _id: in the mongo db document. so send id in the params or query or body whereever you want and send paylaoad data you need to update yeah i know you forgot about payload it is data in body you send. so send the data you want to update in body it is same data you send in create. 
  // -data '{
    //     "name": "John Doe",
    //     "email": "johndoe@example.com",
    //     "age": 30
    //   }'

    // parameters are here: http://localhost:555/api/update/1234 <------ this 123 4 is parameter after slash the number you see
    // quyery is here http://localhost:555/api/update?id=123 <----- this is query that is after ? mark
exports.updateTodos = async (req, res) => {
  try {
    console.log("SSSSSS");
    const todos = await Todos.findById(req.params.id);
    console.log("todosid ---->", todos);

    if (!todos) return res.status(404).json({ message: 'Todos not found' });

    if (req.body.title) todos.title = req.body.title;
    if (req.body.description) todos.description = req.body.description;
    if (req.body.completed) todos.completed = req.body.completed;

    const updatedTodos = await todos.save();
    res.json(updatedTodos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
exports.deleteTodos = async (req, res) => {
  try {
    const todos = await Todos.findById(req.params.id);

    if (!todos) return res.status(404).json({ message: 'Todos not found' });

    await todos.deleteOne();
    res.json({ message: 'Todos deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};