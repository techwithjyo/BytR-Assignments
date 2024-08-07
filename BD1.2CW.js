let express = require('express');
let app = express();
let port= 3001;

app.get("/total-distance", (req, res)=>{
  let distance1 = req.query.distance1;
  let distance2 = req.query.distance2;

  let totalDistance = parseFloat(distance1) + parseFloat(distance2);
  res.send(totalDistance.toString());
});

app.get("/total-time", (req,res)=>{
  let time1 = req.query.time1;
  let time2 = req.query.time2;
  let time3 = req.query.time3;

  let totalTimeSpent = parseFloat(time1) + parseFloat(time2) + parseFloat(time3);
  res.send(totalTimeSpent.toString());
});

app.get("/average-speed", (req,res) =>{
  let distance = req.query.totalDistance;
  let time = req.query.totalTime;

  let averageSpeed = parseFloat(distance) / parseFloat(time);
  res.send(averageSpeed.toString());
})

app.get("/eta", (req,res) =>{
  let distance = req.query.totalDistance;
  let speed = req.query.speed;

  let eta = parseFloat(distance) / parseFloat(speed);
  res.send(eta.toString());
})

app.get("/total-calories", (req,res) =>{
  let duration1 = req.query.duration1;
  let duration2 = req.query.duration2;
  let caloriesPerMinute = req.query.caloriesPerMinute;
  let totalCalories = (parseFloat(duration1) + parseFloat(duration2)) *           parseFloat(caloriesPerMinute);
  res.send(totalCalories.toString());
})

app.get("/interest-earned", (req,res) =>{
  let principal = req.query.principal;
  let rate = req.query.rate;
  let time = req.query.time;

  let interestEarned = (parseFloat(principal) * parseFloat(rate) * parseFloat(time)) / 100;
  res.send(interestEarned.toString());
})

app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});