exports.seed = (knex) => {
  return knex("products")
    .del()
    .then(() => {
      return knex("products").insert([
        {
          product_name: "Bola",
          product_qty: 2,
          product_price: 15,
          product_about: "So uma bola",
        },
        {
          product_name: "Vassora",
          product_qty: 5,
          product_price: 7.5,
          product_about: "So uma vassora",
        },
        {
          product_name: "Sofa",
          product_qty: 1,
          product_price: 150,
          product_about: "So um sofa",
        },
      ]);
    });
};
