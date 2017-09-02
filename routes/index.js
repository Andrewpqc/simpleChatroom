var express = require('express');
var router = express.Router();


router.get('/login.html', function(req, res, next) {
	res.render('login');
});

router.get('/check.html',function(req,res,next){
	if(req.query.username){
		req.session.username=req.query.username;
		res.render('chat',{username:req.session.username})
	}else{
		res.redirect('/login.html')
	}
});

module.exports = router;


