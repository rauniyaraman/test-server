const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// userController.createUser k ho jasto laagyo bane yetii bujnu ki userController maa chai euta createUser naam ko function xa. createUser lai haami method ni  bhanna sakxam jun haamile afai le banako ho 
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/getallusers', userController.getAllUsers);


module.exports = router;

// Note: test these apis through post man  yo / k ho jasto laagyo bane it is http://localhost:5555/api/users/ choose Post method and body maa data pathaune 