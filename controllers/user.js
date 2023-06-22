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
            data.push(idata);
        }
      });
    //   console.log(data);
    res.render("userdb",{data});
}

module.exports = {
    fetchProfile
}
