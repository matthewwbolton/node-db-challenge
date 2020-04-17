const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

module.exports = {
  findTasks,
  findTaskById,
  addTask,
};

function findTasks() {
  return db("tasks");
}

function findTaskById(task_id) {
  return db("tasks").where("tasks.id", task_id).first();
}

function addTask(newTask) {
  return db("tasks")
    .insert(newTask, "id")
    .then(([id]) => {
      return findTaskById(id);
    });
}
