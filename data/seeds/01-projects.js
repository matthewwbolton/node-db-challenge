exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "Sprint Challenge",
          project_description: "Complete Sprint Challenge",
        },
        {
          project_name: "Learn PostgreSQL",
          project_description:
            "Do More In-Depth Study of PostgreSQL and PGAdmin",
        },
        {
          project_name: "Challenge Code Review",
          project_description: "1:1 Sprint Challenge Code Review",
        },
      ]);
    });
};
