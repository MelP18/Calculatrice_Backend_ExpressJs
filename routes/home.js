// var express = require('express')
// var router = express.Router()

// const calculationController = require('../controllers/calculation.controller')
// const authMiddleware = require('../middleware/auth.middleware')

// router.get('/',authMiddleware, function(req, res, next){
//     const user = req.user
//     const userPath = `../avatars/`+req.user.avatar
//     res.status(200).send(user)
// })

// router.post('/calculation', calculationController.addCalculation)
// router.get('/history', calculationController.getCalculation)
// module.exports = router

const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculation.controller');
const authMiddleware = require('../middleware/auth.middleware');
const path = require('path');

/* =======================
   GET user profile
======================= */
router.get('/', authMiddleware, (req, res) => {
  try {
    const user = req.user;
    // Construire le chemin de l'avatar de manière safe
    const userPath = path.join('..', 'avatars', req.user.avatar);

    res.status(200).json({
      user,
      avatarPath: userPath
    });
  } catch (err) {
    console.error("GET /user error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/* =======================
   POST add calculation
======================= */
router.post('/calculation', authMiddleware, calculationController.addCalculation);

/* =======================
   GET calculation history
======================= */
router.get('/history', authMiddleware, calculationController.getCalculations);

module.exports = router;
