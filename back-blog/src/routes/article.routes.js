const express = require('express');
const router = express.Router();
const { createArticleController, getArticlesController, getArticleByIdController, updateArticleController, deleteArticleController } = require('../controllers/article.controller');
const { validateArticle } = require('../validators/article.validator');

router.post('/', validateArticle('create'), createArticleController);
router.get('/', getArticlesController);
router.get('/:id', getArticleByIdController);
router.put('/:id', validateArticle('update'), updateArticleController);
router.delete('/:id', deleteArticleController);

module.exports = router;