const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

module.exports = {
  findResource,
  findResourceById,
  addResource,
};

function findResource() {
  return db("resources");
}

function findResourceById(resource_id) {
  return db("resources").where("resources.id", resource_id).first();
}

function addResource(newResource) {
  return db("resources")
    .insert(newResource, "id")
    .then(([id]) => {
      return findResourceById(id);
    });
}
