const { Router } = require("express");
const ProductController = require("./controller/ProductController");
const TagController = require("./controller/TagController");

const router = Router();

router.post("/products", ProductController.create);

router.post("/tags", TagController.create);

module.exports = router;
