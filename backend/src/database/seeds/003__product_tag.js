exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("productstags")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("productstags").insert([
        { product_id: 1, tag_id: 1 },
        { product_id: 1, tag_id: 2 },

        { product_id: 2, tag_id: 3 },
        { product_id: 2, tag_id: 4 },
        { product_id: 2, tag_id: 5 },

        { product_id: 3, tag_id: 6 },
      ]);
    });
};
