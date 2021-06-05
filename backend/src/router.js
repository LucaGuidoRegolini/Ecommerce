const { Router } = require("express");
const multer = require("multer");

const multerConfig = require("./config/multer");
const ProductController = require("./controller/ProductController");
const TagController = require("./controller/TagController");
const ProductTagController = require("./controller/ProductTagController");
const PostControle = require("./controller/PostController");

const router = Router();

router.get("/products/", ProductController.index);
router.get("/products/:id", ProductController.select);
router.post("/products", ProductController.create);

router.get("/products-tags/:id", ProductTagController.count);
router.get("/products-tags", ProductTagController.index);
router.post("/products-tags", ProductTagController.create);
router.delete("/products-tags", ProductTagController.delete);

router.post("/tags", TagController.create);

router.get("/posts/:id", PostControle.index);
router.get("/post/:id", PostControle.select);
router.post(
  "/post/:id",
  multer(multerConfig).single("file"),
  PostControle.create
);
router.delete("/post/:id", PostControle.delete);
router.delete("/posts/:id", PostControle.deleteAll);

module.exports = router;
