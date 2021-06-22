const connection = require("../database/conection");

module.exports = {
  async create(req, res) {
    const { name } = req.body;
    try {
      const id = await connection("tags").insert({
        tag_name: name,
      });
      return res.status(200).json({
        status: "success",
        msg: "tag create",
        tags: {
          tag_id: id[0],
          tag_name: name,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "tag erro",
        error: `>Erro: ${error}`,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const tag = await connection("tags").where("tag_id", id);
    if (tag.length == 0) {
      return res.status(400).json({
        status: "error",
        msg: "tag_id not found",
      });
    }

    try {
      await connection("tags").where("tag_id", id).delete();
      return res.status(200).json({
        status: "success",
        msg: "tag deleted",
        tag_id: id,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "tag erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
