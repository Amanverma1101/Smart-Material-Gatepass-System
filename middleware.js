const { isTokenValid } = require('./utils');

const mw = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.locals.status = undefined;
        res.locals.email = undefined;
        res.locals.name = undefined;
        // res.locals.url = undefined;
        // console.log(undefined,undefined,undefined,undefined);
        next();
    }else{
        const payload = isTokenValid({token});
        user = {
          status: "Loggedin",
          email: payload.email,
          name: payload.name,
        //   url: payload.url
        }
        // console.log(user.status,user.email,user.name,user.url);
        res.locals.status = user.status;
        res.locals.email = user.email;
        res.locals.name = user.name;
        // res.locals.url = user.url;
        next();
    }    
}

module.exports = mw;
