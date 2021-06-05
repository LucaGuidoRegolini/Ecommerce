const connection = require("../database/conection");

module.exports = {
  async index(req, res) {
    const productsBD = await connection("products");
    const products = [];
    try {
      for (product of productsBD) {
        const tags = await connection
          .select(["tags.tag_name", "tags.tag_id"])
          .table("productstags")
          .innerJoin(
            "products",
            "products.product_id",
            "productstags.product_id"
          )
          .innerJoin("tags", "tags.tag_id", "productstags.tag_id")
          .where("products.product_id", product.product_id);

        products.push({
          product,
          tags,
        });
      }

      return res.status(200).json({
        status: "success",
        msg: "products found",
        products: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "products erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async select(req, res) {
    const { id } = req.params;
    const product = await connection("products").where("product_id", id);
    if (product.length == 0) {
      return res.status(400).json({
        status: "error",
        msg: "product_id not found",
      });
    }
    try {
      const tags = await connection
        .select(["tags.tag_name", "tags.tag_id"])
        .table("productstags")
        .innerJoin("products", "products.product_id", "productstags.product_id")
        .innerJoin("tags", "tags.tag_id", "productstags.tag_id")
        .where("products.product_id", id);

      return res.status(200).json({
        status: "success",
        msg: "product found",
        product: product[0],
        tags,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "product erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async create(req, res) {
    const { name, qty, price, about } = req.body;
    try {
      const id = await connection("products").insert({
        product_name: name,
        product_qty: qty,
        product_price: price,
        product_about: about,
      });
      return res.status(200).json({
        status: "success",
        msg: "product create",
        product: {
          product_id: id[0],
          product_name: name,
          product_qty: qty,
          product_price: price,
          product_about: about,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "product erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
