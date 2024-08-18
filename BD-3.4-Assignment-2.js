const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);

  const addTask = (id, text, priority) => {
    tasks.push({ taskId: id, text: text, priority: priority });
  };

  addTask(taskId, text, priority);
  res.json({ tasks: tasks });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  const sortTasksByPriority = () => {
    return tasks.slice().sort((a, b) => a.priority - b.priority);
  };

  const sortedTasks = sortTasksByPriority();
  res.json({ tasks: sortedTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);

  const editTaskPriority = (id, priority) => {
    const task = tasks.find(task => task.taskId === id);
    if (task) {
      task.priority = priority;
    }
  };

  editTaskPriority(taskId, priority);
  res.json({ tasks: tasks });
});

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;

  const editTaskText = (id, text) => {
    const task = tasks.find(task => task.taskId === id);
    if (task) {
      task.text = text;
    }
  };

  editTaskText(taskId, text);
  res.json({ tasks: tasks });
});

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);

  const deleteTask = (id) => {
    tasks = tasks.filter(task => task.taskId !== id);
  };

  deleteTask(taskId);
  res.json({ tasks: tasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);

  const filterTasksByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const filteredTasks = filterTasksByPriority(priority);
  res.json({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});