const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const formParser = bodyParser.urlencoded();
const mongodb = require("mongodb");
console.log(mongodb.MongoClient);

const ObjectID = mongodb.ObjectId;
app.use("/views", express.static(__dirname + "/views")); ///
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const dbclient = new mongodb.MongoClient("mongodb://localhost:27017");
dbclient.connect();

const db = dbclient.db("users");
db.createCollection("users")
console.log(dbclient.db("users"));

app.set("view engine", "ejs"); //connect ejs
app.use(cors());
app.use(cookieParser());


app.post("/login.html",function(req,res){

    let user = users.find(n=>n.username==req.body.username);

    if(user && req.body.password==user.password){

        user.sid = Math.random();

        res.cookie("sid",user.sid)
        res.send("Login success");
        
    }else{
        res.send("Login Failed Incorrect username or password");
    }
})


app.get("/logout.html",function(req,res){

    res.cookie("sid","");
    res.send("You are logged out");
})

app.listen(8080);
