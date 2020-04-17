exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          task_description: "Clone Repo",
          task_notes: null,
          project_id: 1,
        },
        {
          task_description: "Model Data",
          task_notes: "Complete Data Model Diagram",
          project_id: 1,
        },
        {
          task_description: "Migrate Database",
          task_notes: "Run Migrations and Seeds",
          project_id: 1,
        },
        {
          task_description: "Watch YouTube Videos on PostgreSQL",
          task_notes: null,
          project_id: 2,
        },
        {
          task_description: "Take Notes on Using PGAdmin",
          task_notes: "Learn How to do Advanced Queries Using PGAdmin",
          project_id: 2,
        },
        {
          task_description: "Wait for Tim to Get Back From Lunch",
          task_notes: "Wait Wait Wait",
          project_id: 3,
        },
        {
          task_description: "Wait some More",
          task_notes: "Waiting Waiting Waiting...",
          project_id: 3,
        },
        {
          task_description: "Have Code Review",
          task_notes: "Welcome to the Weekend",
          project_id: 3,
        },
      ]);
    });
};
