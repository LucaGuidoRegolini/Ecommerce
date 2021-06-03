exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments("product_id").primary();
    table.string("product_name", 100).notNullable();
    table.integer("product_qty").unsigned();
    table.float("product_price").unsigned();
    table.text("product_about");
    table.string("created_at", 50).notNullable();
    table.string("updated_at", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
