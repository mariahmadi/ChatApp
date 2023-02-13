const express = require('express')
const router = express.Router()
const { SignUp, Login, Logout } = require('./Controller/UserController')

router.post('/SignUp', SignUp)
router.post('/Login', Login)
router.get('/Logout', Logout)
module.exports = router