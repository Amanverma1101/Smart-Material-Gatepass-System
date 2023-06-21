const { isTokenValid } = require('./utils');

const mw = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.locals.status = undefined;
        res.locals.email = undefined;
        res.locals.name = undefined;
        res.locals.phone = undefined;
        res.locals.role = undefined;
        res.locals.pno = undefined;
        res.locals.dept = undefined;
        res.locals.gender = undefined;
        // res.locals.url = undefined;
        console.log(undefined,undefined,undefined,undefined);
        next();
    }else{
        const payload = isTokenValid({token});
        user = {
          status: "Loggedin",
          email: payload.email,
          name: payload.name,
          phone :payload.phone,
          role: payload.role,
          pno: payload.pno,
          dept: payload.dept,
          gender: payload.gender
        //   url: payload.url
        }
        console.log(user.status,user.email,user.name,user.role);
        res.locals.status = user.status;
        res.locals.email = user.email;
        res.locals.name = user.name;
        res.locals.phone = user.phone;
        res.locals.role = user.role;
        res.locals.pno = user.pno;
        res.locals.dept = user.dept;
        res.locals.gender = user.gender;
        next();
    }    
}

module.exports = mw;
