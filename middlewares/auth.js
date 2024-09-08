const {getUser} = require("../service/auth")
// async function restrictToLoggedinUserOnly(req,res,next){
//     //two types of sending tokens...
//     //1. cookies..
//     const userUid  = req.cookies?.uid;
//     //2. header (Authorization Bearer (.x..trs..) token)
//     // const userUid = req.headers["authorization"];
//     // console.log(req.headers);
//     // const token = userUid.split("Bearer ")[1];
//     // const user = getUser(token);

//     if(!userUid)return res.redirect("/login");
//     const user = getUser(userUid);
//     if(!user)return res.redirect("/login");
//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){

//     //1. token...
//     const userUid  = req.cookies?.uid;
//     //2. header sending token in json(Authorization Bearer ....token) 
//     // const userUid = req.headers["authorization"];
//     // console.log(req.headers);
//     // const token = userUid.split('Bearer ')[1];
//     // const user = getUser(token);
//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie)return next();
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();

}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}
module.exports = {
    // restrictToLoggedinUserOnly, checkAuth , 
    checkForAuthentication,restrictTo
}