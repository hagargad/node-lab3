const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const formParser = bodyParser.urlencoded();
const mongodb = require("mongodb");


const dbclient = new  mongodb.MongoClient("mongodb://localhost:27017");


dbclient.connect();

const db = dbclient.db("MySchool3");

db.collection("Users").insert({name:"Ahmed",age:30})


app.set("view engine","ejs");
app.use(cors())
app.use(formParser);
app.use(cookieParser());

app.get("/",function(req,res){
    let emaill = "ahmed@ahmed.com";

    let user = {
        name:"ahmed",
        age:40,
        address:"Alex",
        mobilePhones :["010","012"]
    }

    res.render("home.ejs",{email:emaill,user:user});
});

app.get("/about.html",function(req,res){
    res.render("about.ejs");
})


app.listen(8080);