exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("tagt_id").primary();
    table.string("tag_name", 100).notNullable();
    table.string("created_at", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
