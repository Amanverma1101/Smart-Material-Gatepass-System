const {db,firebase} = require("../config");

const fetchreq = async(req,res)=>{
    const { email,role,dept } = res.locals;
    const snap = await db.collection("departments").doc(dept).collection("assigned").get();
    let data=[];
    snap.forEach((doc) => {
        let d=[];
        d.name = doc.data().itname;
        d.gpid = doc.data().gpid;
        d.email = doc.data().email;
        d.dref = doc.data().dref;
        d.requestor = doc.data().requestor;
        d.supStatus = doc.data().supStatus;
        d.hodStatus = doc.data().hodStatus;
        d.secStatus = doc.data().secStatus;
        data.push(d);    
      });
    res.render("appdb",{msg: "",data});
}

module.exports={
    fetchreq
}