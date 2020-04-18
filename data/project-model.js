const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

module.exports = {
  findProjects,
  findProjectById,
  addProject,
  findProjectsAndTasks,
  updateProject,
  deleteProject,
  getEverythingFromProjects,
  getAllProject,
};

function findProjects() {
  return db("projects");
}

function findProjectById(project_id) {
  return db("projects").where("projects.id", project_id).first();
}

function addProject(newProject) {
  return db("projects")
    .insert(newProject, "id")
    .then(([id]) => {
      return findProjectById(id);
    });
}

// function findProjectsAndTasks(project_id) {
//   return db
//     .select(
//       "p.project_name",
//       "p.project_description",
//       "t.task_description",
//       "t.task_notes",
//       "t.task_completed"
//     )
//     .from("projects as p")
//     .join("tasks as t", "t.project_id", "p.id")
//     .where("p.id", project_id);
// }

function findProjectsAndTasks(project_id) {
  return db
    .select("*")
    .from("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where("t.project_id", project_id);
}

function updateProject(changes, project_id) {
  return db("projects")
    .update(changes)
    .where("projects.id", project_id)
    .then(() => {
      return findProjectById(project_id);
    });
}

function deleteProject(project_id) {
  return db("projects as p").where("p.id", project_id).del();
}

function getEverythingFromProjects(project_id) {
  return db
    .select("*")
    .from("project_resources as pr")
    .innerJoin("projects as p", "pr.project_id", "p.id")
    .innerJoin("tasks as t", "t.project_id", "pr.project_id")
    .innerJoin("resources as r", "pr.resource_id", "r.id")
    .where("p.id", project_id)
    .groupBy("t.id")
    .groupBy("r.id");
}

function getAllProject(project_id) {
  const project = db("projects")
    .where("id", project_id)
    .then((project) => project);

  const tasks = db("tasks")
    .where("project_id", project_id)
    .then((task) => task);

  const resources = db
    .select("*")
    .from("resources as r")
    .join("project_resources as pr", "pr.resource_id", "r.id")
    .where("resource_id", project_id)
    .then((resources) => resources);

  return Promise.all([project, tasks, resources]).then(([pV, tV, rV]) => {
    const object = {
      project: pV,
      tasks: tV.map((elem) => elem),
      resources: rV.map((elem) => elem),
    };
    return object;
  });
}
