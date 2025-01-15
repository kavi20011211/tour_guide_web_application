const express = require('express')
const router = express.Router()
const {signInFunction,signUpFunction} = require('../controllers/UserController')

//SignUp route
router.post('/protected/signup',signUpFunction)
//SignIn route
router.post('/protected/signin',signInFunction)
module.exports = router