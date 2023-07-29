const express = require('express');
const cors= require('cors');
const app= express();
app.use(cors());
// for parsing data

app.use(express.json());

app.post('/register', (req,res)=>{
 const {username,password} =req.body;
 res.json({requestData:{username,password}});
 res
});
 
 
app.listen(4000);        