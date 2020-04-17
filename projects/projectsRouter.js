const express = require("express");

const Projects = require("../data/project-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.findProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.findProjectById(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Projects.addProject(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;
  Projects.findProjectsAndTasks(id)
    .then((combo) => {
      res.status(200).json(combo);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

module.exports = router;
