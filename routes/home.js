var express = require('express')
var router = express.Router()

const calculationController = require('../controllers/calculation.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/',authMiddleware, function(req, res, next){
    const user = req.user
    const userPath = `../avatars/`+req.user.avatar
    console.log(userPath)
    res.status(200).send(user)
})

router.post('/calculation', calculationController.addCalculation)
router.get('/history', calculationController.getCalculation)
module.exports = router