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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Projects.findProjectById(id)
    .then((project) => {
      if (project) {
        Projects.updateProject(changes, id).then((updatedProject) => {
          res.status(200).json(updatedProject);
        });
      } else {
        res.status(404).json({
          error: `A project with the id of ${id} could not be found.`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.deleteProject(id)
    .then((project) => {
      res
        .status(200)
        .json({
          message: `The project with ID ${id} has been successfully deleted from the database.`,
        });
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

module.exports = router;
