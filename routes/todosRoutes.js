const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');
const authenticateToken = require('../middlewares/authMiddleware');


// userController.createUser k ho jasto laagyo bane yetii bujnu ki userController maa chai euta createUser naam ko function xa. createUser lai haami method ni  bhanna sakxam jun haamile afai le banako ho 
router.post('/create', todosController.createtodos);
router.get('/all-todos', authenticateToken, todosController.getAllTodos);
router.put('/update-todos/:id', todosController.updateTodos); // :id is the params you want to send to the server 
router.delete('/delete-todos/:id', todosController.deleteTodos);

module.exports = router;

// Note: test these apis through post man  yo / k ho jasto laagyo bane it is http://localhost:5555/api/users/ choose Post method and body maa data pathaune 
// fetch('http://localhost:5555/api/todos')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));