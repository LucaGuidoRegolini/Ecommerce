exports.up = (knex) => {
  return knex.schema.createTable("productstags", (table) => {
    table
      .integer("product_id")
      .unsigned()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("tag_id")
      .unsigned()
      .references("tag_id")
      .inTable("tags")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.primary(["product_id", "tag_id"]);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("productstags");
};
