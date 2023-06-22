const {db,firebase} = require("../config");

const saveMatInfo = async(req,res)=>{
    const {email, name} = res.locals;
    const data = {
        name: name,
        email: email,
        phone: req.body.phone,
        sdept: req.body.sourceDept,
        sgno: req.body.sourceGno,
        tdept: req.body.destDept,
        tgno: req.body.destGno,
        arrival: req.body.arrive,
        departure: req.body.depart,
        nitems: req.body.nitems
    }
    for(var i=1;i<=data.nitems;i++){
        data[`it${i}Name`]= req.body[`it${i}Name`];
        data[`it${i}Pno`] = req.body[`it${i}Pno`];
        data[`it${i}Qty`] = req.body[`it${i}Qty`];
    }
    let itms="";
    const n=data.nitems;
    for(let i=1;i<=n;i++){
        itms+=data[`it${i}Name`];
        itms+=(i!=n)?", ":"";
    }
    data["itemnames"] = itms;
    const docRef = db.collection("users").doc("requesting").collection(email).doc();
    const docId = docRef.id;
    let gpid = docId.substring(0,2).toUpperCase();
    gpid+=docId.substring(18,20).toUpperCase();
    await docRef.set({...data,id:docId,gpid:gpid})
        .then(async() => {
            console.log("Document written with ID:", docId);
            await db.collection('departments').doc(data.sdept).collection('assigned').doc(docId).set({requestor:name,email:email,gpid:gpid,itname:itms,dref:docId});
            res.redirect("/user/profile");
        })
        .catch((err) => {
            console.error("Error writing document:", err);
            res.send("Error writing document:", err);
        });
}

const fetchMatForm = async(req,res)=>{
    const fid = req.params.id;
    const rmail = req.params.mail;
    const snap = await db.collection("users").doc("requesting").collection(rmail).doc(fid).get();
    const data = snap.data();
    return res.render("approveform",{data,refid: fid,});
}

const approveMatform = async(req,res)=>{
    const {role} = res.locals;
    try{
        const data = req.body;
        console.log(data);
        const updateData = {};
        for (const [key, value] of Object.entries(req.body)) {
          if (value !== undefined) {
            updateData[key] = value;
          }
        }
        const promises = [];
         if((role === "Supervisor" && data.supStatus==="approved") || (role === "HOD" && data.hodStatus==="approved") || (role === "Security" && data.secStatus==="approved")) 
           {
            const docRef1 =  db.collection("users").doc("requesting").collection(data.email).doc(data.refid);
            const p1 = docRef1.update(updateData);
            promises.push(p1);
            const docRef2 =  db.collection("departments").doc(data.sourceDept).collection("assigned").doc(data.refid);
            const p2 = docRef2.update(updateData);
            promises.push(p2);
            await Promise.all(promises);
            return res.redirect("/approver/profile");
        }else{
            // const docRef2 =  db.collection("departments").doc(data.sourceDept).collection("assigned").doc(data.refid);
            // const p2 = await docRef2.delete().then(()=>{
                console.log("delete ho jaayega bhaii!")
                return res.redirect("/approver/profile");
            // })
        }
    }catch(error){
        console.log(error);
        return res.status(400).send("Error hai bhaii !!");
    }
    return;
}

module.exports = {
    saveMatInfo,fetchMatForm, approveMatform
};