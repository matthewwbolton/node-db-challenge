const express = require("express");
const helmet = require("helmet");

const projectRouter = require("../projects/projectsRouter");
const tasksRouter = require("../tasks/taskRouter");
const resourceRouter = require("../resources/resourceRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/tasks", tasksRouter);
server.use("/api/resources", resourceRouter);

module.exports = server;
