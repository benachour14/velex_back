const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const articlesController = require("../services/article.services");
const router = express.Router();

router.post("/", verifyToken, articlesController.createArticle);
router.get("/",  articlesController.getAllArticles);
router.get("/:id", verifyToken, articlesController.getArticle);
router.put("/:id", verifyToken, articlesController.updateArticle);
router.delete("/:id", verifyToken, articlesController.deleteArticle);

module.exports = router;