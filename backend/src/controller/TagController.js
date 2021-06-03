const connection = require("../database/conection");

module.exports = {
  async create(req, res) {
    const { name } = req.body;
    const timestamp = Date.now().toString();
    try {
      const id = await connection("tags").insert({
        tag_name: name,
        created_at: timestamp,
      });
      return res.json({
        status: "success",
        msg: "tag create",
        tags: {
          tagst_id: id[0],
          tags_name: name,
          created_at: timestamp,
        },
      });
    } catch (error) {
      return res.json({
        status: "error",
        msg: "tag erro",
        error: `>Erro: ${error}`,
      });
    }
  },
};
