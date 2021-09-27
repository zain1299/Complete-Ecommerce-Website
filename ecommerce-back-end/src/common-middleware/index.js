const jwt = require('jsonwebtoken');

exports.requireSignin = function(req , res , next){
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;       
    }else{
        return res.status(400).json({ message : 'Authorizatin Required!' });
    }
    next();
    // jwt.decode()
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message : 'Admin Acces Denied' });
    }
    next();
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({ message : 'User Acces Denied' });
    }
    next();
}