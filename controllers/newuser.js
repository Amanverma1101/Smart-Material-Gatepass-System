const {db,firebase} = require("../config");

const saveUserData = async(req,res)=>{
    const password = req.body['password'];
    if(password[0]!==password[1]){
        return res.render('usersignup',{msg: "Parsswords do not Match!"});
    }else{
        const n= req.body['name'];
        const user = {
            name: n[0]+" "+n[1],
            phone: req.body['phone'],
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
                // photoURL: user.profile,
              };
            firebase.auth().updateUser(result.uid,update);
            const dbase = db.collection(user.email);
            dbase.doc("Pers-info").set(user).then(()=>{   
                //    const tuser = {email:user.email, name: user.name, url: user.profile};
                //    attachCookiesTOResponse({ res, user: tuser });
                   return res.redirect("/");
                });})
                .catch((error) => {
                  console.error('Error creating new user:', error);
                  res.status(400).send('Error creating user : '+ error);
                });
        }
};

module.exports = {
    saveUserData
};