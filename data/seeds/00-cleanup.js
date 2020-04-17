const cleaner = require("knex-cleaner");
exports.seed = function (knex) {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "Knex_migrations_lock"],
  });
};
