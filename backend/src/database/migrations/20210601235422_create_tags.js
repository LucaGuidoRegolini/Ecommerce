exports.up = (knex) => {
  return knex.schema.createTable("tags", (table) => {
    table.increments("tag_id").primary();
    table.string("tag_name", 100).notNullable();
    table.timestamp("created_at").default(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("tags");
};
