exports.up = function (knex) {
  return knex.schema.createTable("productstags", function (table) {
    table
      .integer("product_id")
      .references("products.product_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("tagt_id")
      .references("tags.tagt_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("productstags");
};
