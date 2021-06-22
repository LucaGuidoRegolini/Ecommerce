exports.up = (knex) => {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary();
    table.string("product_name", 100).notNullable();
    table.integer("product_qty").unsigned();
    table.float("product_price").unsigned();
    table.text("product_about");
    table.timestamp("created_at").default(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("products");
};
