const fs = require("fs");

const connection = require("../database/conection");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    try {
      const posts = await connection("posts").where("product_id", id);
      if (posts.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "product_id not found",
        });
      }
      return res.status(200).json({
        status: "success",
        msg: "posts found",
        posts,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        msg: "id erro",
        error: `>Erro: product_id not found`,
      });
    }
  },

  async select(req, res) {
    const { id } = req.params;
    try {
      const post = await connection("posts").where("post_id", id);
      if (post.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "post_id not found",
        });
      }
      return res.status(200).json({
        status: "success",
        msg: "post found",
        post: post[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        msg: "id erro",
        error: `>Erro: product_id not found`,
      });
    }
  },

  async create(req, res) {
    const { id } = req.params;
    const product = await connection("products").where("product_id", id);
    if (product.length == 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        status: "error",
        msg: "product_id not found",
      });
    }
    try {
      const post_id = await connection("posts").insert({
        product_id: id,
        post_name: req.file.originalname,
        post_key: req.file.filename,
        post_path: req.file.path,
      });
      return res.status(200).json({
        status: "success",
        msg: "post create",
        product,
        post_id: post_id[0],
        post_name: req.file.originalname,
        post_key: req.file.filename,
        post_path: req.file.path,
      });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      return res.status(500).json({
        status: "error",
        msg: "post erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    let post = await connection("posts").where("post_id", id);
    try {
      if (post.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "id erro",
          error: `>Erro: post_id not found`,
        });
      }

      post = post[0];
      await connection("posts").where("post_id", post.post_id).delete();
      fs.unlinkSync(post.post_path);

      return res.status(200).json({
        status: "success",
        msg: "posts deleted",
        post: {
          post_id: post.post_id,
          post_name: post.post_name,
          post_path: post.post_path,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "post erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async deleteAll(req, res) {
    const { id } = req.params;
    const posts = await connection("posts").where("product_id", id);
    try {
      if (posts.length == 0) {
        return res.status(400).json({
          status: "error",
          msg: "id erro",
          error: `>Erro: product_id not found`,
        });
      }

      await connection("posts").where("product_id", id).delete();
      for (post of posts) {
        fs.unlinkSync(post.post_path);
      }

      return res.status(200).json({
        status: "success",
        msg: "posts deleted",
        posts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "post erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
