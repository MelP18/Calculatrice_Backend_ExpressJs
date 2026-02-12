var express = require('express');
var router = express.Router();

/* GET API home page. */

router.get('/', function(req, res) {
  res.json({ message: "API Calculatrice Backend OK 🚀" });
});

module.exports = router;
