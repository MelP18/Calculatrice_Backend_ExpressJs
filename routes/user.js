var express = require('express')
var router = express.Router()

const userController = require('../controllers/user.controller')
const upload = require('../upload')

router.post('/signup', upload.single("avatar"), userController.registration )
router.post('/signin', userController.connection)
router.post('/verify-code', userController.verifyCode)

module.exports = router