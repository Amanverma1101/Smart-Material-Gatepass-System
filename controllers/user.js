const {db,firebase} = require("../config");

const fetchProfile = async(req,res)=>{
    const { email } = res.locals;
    // const email = "aman@ac.in";
    // const snap = await db.collection(email).doc('Pers-info').get();
    // const role = "employee";
    
    // if(role==="vendor"){
    //     pno = snap.data().vno;
    //     dept = "Non Employee"
    // }else{
    //     pno = snap.data().empno;
    //     dept = snap.data().dept;
    // }
    // const data = {
    //     name: snap.data().name,
    //     email: snap.data().email,
    //     gender: snap.data().gender[0].toUpperCase(),
    //     phone: snap.data().phone,
    //     pno: pno,
    //     dept: dept,
    //     role: role.toUpperCase()
    // }
    // console.log(data)
    const snap = await db.collection("users").doc("requesting").collection(email).get();
    let data=[];
    snap.forEach((doc) => {
        let idata = [];
        if(doc.id!=="Pers-info"){
            idata.name = doc.data().itemnames;
            idata.sup = doc.data().sup;
            idata.hod = doc.data().hod;
            idata.sec = doc.data().sec;
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
