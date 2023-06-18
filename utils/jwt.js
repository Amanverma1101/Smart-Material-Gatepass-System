const jwt = require("jsonwebtoken");

 const createJWT = ({payload})=>{
    const token =  jwt.sign(payload,'jwtSecret',{expiresIn: '1d'});
    return token;
 }
 const isTokenValid = ({token})=>{
   return jwt.verify(token,'jwtSecret');
 }
let d=1000*60*60*24;
 const attachCookiesTOResponse = ({res,user})=>{
    const token = createJWT({payload: user});
    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now() + d),
    });
 }
module.exports={
    createJWT,
    isTokenValid,
    attachCookiesTOResponse
};