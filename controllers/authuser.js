const {db,firebase} = require("../config");
const { attachCookiesTOResponse } = require('../utils');
const {FirebaseScrypt} = require('firebase-scrypt');
require('dotenv').config();
const firebaseParameter = {
  memCost: 14,
  rounds: 8, 
  saltSeparator: 'Bw==', 
  signerKey: process.env.signerKey,  
}
const scrypt = new FirebaseScrypt(firebaseParameter);

const saveUserDataAndSignup = async(req,res)=>{
    const password = req.body['password'];
    if(password[0]!==password[1]){
        return res.render('usersignup',{msg: "Parsswords do not Match!"});
    }else{
        const n= req.body['name'];
        const user = {
            name: n[0]+" "+n[1],
            phone: "+91"+String(req.body['phone']),
            email: req.body['email'],
            role: req.body['role'],
            empno: req.body['eno'],
            dept: req.body['dept'],
            vno: req.body['vno'],
            gender: req.body['gender'],
            password: req.body['password'][0]
        } 
        await firebase.auth().createUser({
            email: user.email,
            password: user.password
          })
            .then((result) => {
              const update = {
                displayName: user.name,
              };
            firebase.auth().updateUser(result.uid,update);
            const dbase = db.collection(user.email);
            dbase.doc("Pers-info").set(user).then(()=>{   
                   const tuser = {email:user.email, name: user.name};
                  //  attachCookiesTOResponse({ res, user: tuser });
                   return res.redirect("/user/profile");
                });})
                .catch((error) => {
                  console.error('Error creating new user:', error);
                  res.status(400).send('Error creating user : '+ error);
                });
        }
};

const loginUser = async(req,res)=>{
  const { email, password } = req.body;
  let c=0;
  await firebase.auth().listUsers(1000)
  .then((listUsersResult) => {
      listUsersResult.users.forEach(async (userRecord) => {
        if (userRecord && userRecord.email === email && userRecord.passwordHash) {
          const name = userRecord.displayName;
          const hash = userRecord.passwordHash;
          const salt = userRecord.passwordSalt;
          c=1;
            await scrypt.verify(password, salt, hash)
             .then(async(isValid) =>{
                if(isValid){
                  const snap = await db.collection(email).doc('Pers-info').get();
                  const tuser = {email: email, name: name, role: snap.data().role};
                  console.log(tuser) ;
                  //  attachCookiesTOResponse({ res, user: tuser });
                  return res.redirect("/user/profile");
                  // return res.status(200).send("Correct Credentials");
                } else{
                  console.log('Not valid !');
                  return res.status(400).send("Sahi password daal saale🤦‍♂️!");
                }
             }).catch((error) => {
              console.error('Error comparing passwords:', error);
              return res.status(400).send("error in password");
            });
          } 

          
    }); if(c==0){return res.send("No Such User Exists!");}

  })
  .catch((error) => {
    console.log('No user found ', error);
    return res.status(401).send({ error: error.message });
  });
};

module.exports = {
    saveUserDataAndSignup,loginUser
};