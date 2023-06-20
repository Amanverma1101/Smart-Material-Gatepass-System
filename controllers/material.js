const {db,firebase} = require("../config");

const saveMatInfo = async(req,res)=>{
    const {email} = res.locals;
    const data = {
        email: email,
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
            await db.collection('depatments').doc(data.sdept).collection('assigned').doc(docId).set({gpid:gpid,itname:itms,dref:docId});
            res.redirect("/user/profile");
        })
        .catch((err) => {
            console.error("Error writing document:", err);
            res.send("Error writing document:", err);
        });
}

module.exports = {
    saveMatInfo
};