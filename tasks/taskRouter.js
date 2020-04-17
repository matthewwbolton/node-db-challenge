const express = require("express");
const Tasks = require("../data/tasksModel");

const router = express.Router();

router.get("/", (req, res) => {
  Tasks.findTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Tasks.findTaskById(id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.post("/", (req, res) => {
  const newTask = req.body;
  Tasks.addTask(newTask)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.post("/", (req, res) => {});

module.exports = router;
