const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data (tasks)
let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build REST API', completed: true },
];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// POST a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) an existing task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks[index] = updatedTask;
    res.json(updatedTask);
  }
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/**
 * end points -
 * GET all tasks: GET http://localhost:3000/tasks
GET a specific task by ID: GET http://localhost:3000/tasks/1
POST a new task: POST http://localhost:3000/tasks with a JSON body
PUT (update) an existing task by ID: PUT http://localhost:3000/tasks/1 with a JSON body
DELETE a task by ID: DELETE http://localhost:3000/tasks/1
 */