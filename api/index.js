const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const User = require("./models/User");
const cookieParser = require("cookie-parser");
 
//jsonweb tokens
const jwt = require("jsonwebtoken");

// this will generate salt to hash my code
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const secret = "sjdkchjdskhkjasnhdkjash";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// for parsing data json parser
app.use(express.json());
//middle ware for cooky part
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://blogOasis:blogoasis123@cluster0.a6ofeet.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok shrey");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
  //res.json(passOk);
}); 
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout",(req,res)=>{
  res.cookie('token','').json('ok');
})
app.listen(4000);

// mongodb+srv://blogOasis:blogoasis123@cluster0.a6ofeet.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://shreymishra128:12345678shrey@cluster0.l3emdxo.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://project1:<password>@cluster0.q0o7vko.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://abcd:12345678shrey@cluster0.ivl9vbx.mongodb.net/?retryWrites=true&w=majority
