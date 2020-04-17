const express = require("express");

const Resources = require("../data/resourceModel");

const router = express.Router();

router.get("/", (req, res) => {
  Resources.findResource()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Resources.findResourceById(id)
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

router.post("/", (req, res) => {
  const newResource = req.body;
  Resources.addResource(newResource)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

module.exports = router;
