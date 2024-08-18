const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];

app.get('/activities/add', (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const type = req.query.type;
  const duration = parseInt(req.query.duration);
  const caloriesBurned = parseInt(req.query.caloriesBurned);

  const addActivity = (id, type, duration, caloriesBurned) => {
    activities.push({ activityId: id, type: type, duration: duration, caloriesBurned: caloriesBurned });
  };

  addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: activities });
});

app.get('/activities/sort-by-duration', (req, res) => {
  const sortActivitiesByDuration = () => {
    return activities.slice().sort((a, b) => a.duration - b.duration);
  };

  const sortedActivities = sortActivitiesByDuration();
  res.json({ activities: sortedActivities });
});

app.get('/activities/filter-by-type', (req, res) => {
  const type = req.query.type;

  const filterActivitiesByType = (type) => {
    return activities.filter(activity => activity.type === type);
  };

  const filteredActivities = filterActivitiesByType(type);
  res.json({ activities: filteredActivities });
});

app.get('/activities/total-calories', (req, res) => {
  const calculateTotalCalories = () => {
    return activities.reduce((total, activity) => total + activity.caloriesBurned, 0);
  };

  const totalCaloriesBurned = calculateTotalCalories();
  res.json({ totalCaloriesBurned: totalCaloriesBurned });
});

app.get('/activities/update-duration', (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const duration = parseInt(req.query.duration);

  const updateActivityDuration = (id, duration) => {
    const activity = activities.find(activity => activity.activityId === id);
    if (activity) {
      activity.duration = duration;
    }
  };

  updateActivityDuration(activityId, duration);
  res.json({ activities: activities });
});

app.get('/activities/delete', (req, res) => {
  const activityId = parseInt(req.query.activityId);

  const deleteActivity = (id) => {
    activities = activities.filter(activity => activity.activityId !== id);
  };

  deleteActivity(activityId);
  res.json({ activities: activities });
});

app.get('/activities/delete-by-type', (req, res) => {
  const type = req.query.type;

  const deleteActivitiesByType = (type) => {
    activities = activities.filter(activity => activity.type !== type);
  };

  deleteActivitiesByType(type);
  res.json({ activities: activities });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});