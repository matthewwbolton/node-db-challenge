exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("project_name", 255).notNullable().index();
      tbl.string("project_description", 255);
      tbl.boolean("project_completed").defaultTo(false).notNullable();
    })

    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.string("resource_name", 255).notNullable().index();
      tbl.string("resource_description", 255);
    })

    .createTable("project_resources", (tbl) => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.string("task_description", 255).notNullable();
      tbl.string("task_notes", 255);
      tbl.boolean("task_completed").defaultTo(false).notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
