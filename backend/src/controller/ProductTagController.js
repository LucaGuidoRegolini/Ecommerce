const connection = require("../database/conection");

module.exports = {
  async count(req, res) {
    const { id } = req.params;

    try {
      const tag = await connection("tags").where("tag_id", id);
      if (tag.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "id erro",
          error: `>Erro: tag_id not found`,
        });
      }
      const count = await connection("productstags")
        .count("tag_id")
        .where("tag_id", id);

      tag[0].count = count[0]["count(`tag_id`)"];
      console.log(tag);
      return res.status(200).json({
        status: "success",
        msg: "count tags-product done",
        tag: tag[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "tag erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async index(req, res) {
    const tags = [];
    try {
      const tagsBD = await connection("tags");
      for (tag of tagsBD) {
        const count = await connection("productstags")
          .count("tag_id")
          .where("tag_id", tag.tag_id);
        tag.count = count[0]["count(`tag_id`)"];
        tags.push({
          tag,
        });
      }

      return res.status(200).json({
        status: "success",
        msg: "tags-products index",
        tag: tags,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "tag erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async create(req, res) {
    const { productId, tagId } = req.body;

    const product = await connection("products").where("product_id", productId);
    const tag = await connection("tags").where("tag_id", tagId);

    try {
      if (product.length == 0 || tag.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "id erro",
          error: `>Erro: product_id or tag_id not found`,
        });
      }

      await connection("productstags").insert({
        product_id: productId,
        tag_id: tagId,
      });

      return res.status(200).json({
        status: "success",
        msg: "conecction tag-product create",
        tags: {
          product_id: product,
          tagt_id: tag,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "conecction erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async delete(req, res) {
    const { productId, tagId } = req.body;

    const product = await connection("products").where("product_id", productId);
    const tag = await connection("tags").where("tag_id", tagId);

    try {
      if (product.length == 0 || tag.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "id erro",
          error: `>Erro: product_id or tag_id not found`,
        });
      }

      await connection("productstags")
        .where({
          product_id: productId,
          tag_id: tagId,
        })
        .delete();

      return res.status(200).json({
        status: "success",
        msg: "conecction tag-product deleted",
        tags: {
          product_id: productId,
          tagt_id: tagId,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "conecction erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
