exports.up = (knex) => {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id").primary();

    table
      .integer("product_id")
      .unsigned()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("post_name", 100).notNullable();
    table.string("post_key", 100).notNullable();
    table.string("post_path").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("posts");
};
