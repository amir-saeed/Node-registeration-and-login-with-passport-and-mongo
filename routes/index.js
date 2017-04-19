var express = require('express');
var router = express.Router();

var logger  = require('../log/index');

logger.info('i am in routes/index');

// Get Homepage
router.get('/', function(req, res){
     logger.info('index.js in route folder');
	res.render('index');
});

module.exports = router;