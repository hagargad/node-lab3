const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const jsonParser = bodyParser.json();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const dbclient = new  mongodb.MongoClient("mongodb://localhost:27017");
dbclient.connect();
const db = dbclient.db("MySchool3");




app.get("/emps.html",function(req,res){
    res.sendFile(__dirname+"/empsFE.html");
})


app.post("/addemp",jsonParser,function(req,res){
    //req.body.id=empIndex++;
    //emps.push(req.body);
    //saveEmpsToFile();
    //console.log(emps);
    db.collection("Employees").insertOne(req.body);
    res.send({msg:"emp added"});
})


app.get("/emps",async function(req,res){
    if(req.query.name==undefined) req.query.name="";
    
    //let filteredEmps = emps.filter(emp=>emp && emp.name.toLowerCase().indexOf(req.query.name.toLowerCase())>-1)
    let regex = RegExp(req.query.name,"i");
    let filteredEmps = await db.collection("Employees").find({name:regex}).toArray();
    res.send(filteredEmps);
});


app.delete("/deleteemp",function(req,res){
    //console.log(req.query,emps);
    //let empIndex = emps.findIndex(emp=>emp && emp.id==req.query.id);
    //emps.splice(empIndex,1);
    //delete emps[empIndex];
    //saveEmpsToFile();
    db.collection("Employees").deleteOne({_id: new ObjectId(req.query.id)})
    res.send({msg:"Emp deleted"});

})

app.put("/editemp",jsonParser,function(req,res){
    //let emp = emps.find(emp=> emp && emp.id==req.body.id);
    //emp.name = req.body.name;
    //emp.age = req.body.age;
    //emp.salary=req.body.salary;
    //saveEmpsToFile();
    let emp = {};
    emp.name = req.body.name;
    emp.age = req.body.age;
    emp.salary=req.body.salary;
    console.log(req.body);
    db.collection("Employees").updateOne({_id:new ObjectId(req.body._id)},{$set:emp})
    res.send({msg:"emp saved"});

})


app.get("/getemp",async function(req,res){
    //let emp = emps.find(emp=> emp && emp.id==req.query.id);
    // select * from Employees where _id = req.query.id limit 1 
    let emp = await db.collection("Employees").findOne({_id:new ObjectId(req.query.id)})
    res.send(emp);
})
app.listen(8080);