exports.seed = (knex) => {
  return knex("tags")
    .del()
    .then(() => {
      return knex("tags").insert([
        { tag_name: "Esporte" },
        { tag_name: "Futebol" },
        { tag_name: "limpesa" },
        { tag_name: "promoção" },
        { tag_name: "para casa" },
        { tag_name: "Movel" },
      ]);
    });
};
