let express = require('express');
let cors = require("cors");

const app=express();
app.use(cors());

app.get("/", (req, res)=>{
  res.send("Welcome to Stock Portfolio analysis API!");
})

app.listen(3000, () => console.log('Server running on port 3000'));