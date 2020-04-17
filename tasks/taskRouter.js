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

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Tasks.findTaskById(id)
    .then((task) => {
      if (task) {
        Tasks.updateTask(changes, id).then((updatedTask) => {
          res.status(200).json(updatedTask);
        });
      } else {
        res.status(404).json({
          error: `There are no tasks associated with the ID of ${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Tasks.deleteTask(id)
    .then(() => {
      res
        .status(200)
        .json({
          message: `The task with ID ${id} has been successfully deleted from the database.`,
        });
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

module.exports = router;
