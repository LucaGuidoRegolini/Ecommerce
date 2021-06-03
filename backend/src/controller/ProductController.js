const connection = require("../database/conection");

module.exports = {
  async create(req, res) {
    const { name, qty, price, about } = req.body;
    const timestamp = Date.now().toString();
    try {
      const id = await connection("products").insert({
        product_name: name,
        product_qty: qty,
        product_price: price,
        product_about: about,
        created_at: timestamp,
        updated_at: timestamp,
      });
      return res.json({
        status: "success",
        msg: "product create",
        product: {
          product_id: id[0],
          product_name: name,
          product_qty: qty,
          product_price: price,
          product_about: about,
          created_at: timestamp,
          updated_at: timestamp,
        },
      });
    } catch (error) {
      return res.json({
        status: "error",
        msg: "product erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
