const {sessions} = require('../store');
module.exports= (req, res, next)=>{
    console.log("Auth middleware called");
    console.log(req.userId);
    console.log(req.headers);
    
    const token= req.headers["x-auth-token"];

    if(!token || !sessions[token]){
        return res.status(401).json({message: "Unauthorized"});
    }
    req.userId= sessions[token];
    next();
}