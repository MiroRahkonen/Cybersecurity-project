var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
    const authHeader = req.headers["authorization"];
    let token;
    if(authHeader){
        token = authHeader.split(" ")[1];
    }
    else{
        token = null;
    }
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err) return res.sendStatus(401);
        res.json(user);
    })
});

module.exports = router;
