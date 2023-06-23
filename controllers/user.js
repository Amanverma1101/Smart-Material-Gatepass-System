const {db,firebase} = require("../config");

const fetchProfile = async(req,res)=>{
    const { email } = res.locals;
    const snap = await db.collection("users").doc("requesting").collection(email).get();
    let data=[];
    snap.forEach((doc) => {
        let idata = [];
        if(doc.id!=="Pers-info"){
            idata.name = doc.data().itemnames;
            idata.sup = doc.data().supStatus;
            idata.hod = doc.data().hodStatus;
            idata.sec = doc.data().secStatus;
            idata.gpid = doc.data().gpid;
            idata.ref = doc.data().id;
            data.push(idata);
        }
      });
    //   console.log(data);
    res.render("userdb",{data});
}
const fetchform = async(req,res)=> {
    const femail = req.params.mail;
    const ref = req.params.id;
    const b = req.params.b;
    const snap = await db.collection("users").doc("requesting").collection(femail).doc(ref).get();
    const data = snap.data();
    if(b==="1"){msg=""}else{msg="none"}
    return res.render("formstatus",{data,msg:msg});
}

module.exports = {
    fetchProfile,fetchform
}
