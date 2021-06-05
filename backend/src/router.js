const { Router } = require("express");
const multer = require("multer");

const multerConfig = require("./config/multer");
const ProductController = require("./controller/ProductController");
const TagController = require("./controller/TagController");
const ProductTagController = require("./controller/ProductTagController");

const router = Router();

router.get("/products/", ProductController.index);
router.get("/products/:id", ProductController.select);
router.post("/products", ProductController.create);

router.get("/products-tags/:id", ProductTagController.count);
router.get("/products-tags", ProductTagController.index);
router.post("/products-tags", ProductTagController.create);
router.delete("/products-tags", ProductTagController.delete);

router.post("/tags", TagController.create);

router.post("/post", multer(multerConfig).single("file"), (req, res) => {
  console.log(req.file);
  return res.json({ hello: "Rocket" });
});

module.exports = router;
