const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../services/article.service');

async function createArticleController(req, res, next) {
  try {
    const article = await createArticle(req.body);
    res.status(201).json({ status: 'success', contador: 1, articulos: [article] });
  } catch (err) {
    next(err);
  }
}

async function getArticlesController(req, res, next) {
  try {
    const articulos = await getArticles();
    res.json({ status: 'success', contador: articulos.length, articulos });
  } catch (err) {
    next(err);
  }
}

async function getArticleByIdController(req, res, next) {
  try {
    const articulo = await getArticleById(req.params.id);
    if (!articulo) return res.status(404).json({ status: 'error', message: 'Artículo no encontrado' });
    res.json({ status: 'success', articulo });
  } catch (err) {
    next(err);
  }
}

async function updateArticleController(req, res, next) {
  try {
    const articulo = await updateArticle(req.params.id, req.body);
    if (!articulo) return res.status(404).json({ status: 'error', message: 'Artículo no encontrado' });
    res.json({ status: 'success', articulo });
  } catch (err) {
    next(err);
  }
}

async function deleteArticleController(req, res, next) {
  try {
    const ok = await deleteArticle(req.params.id);
    if (!ok) return res.status(404).json({ status: 'error', message: 'Artículo no encontrado' });
    res.json({ status: 'success', message: 'Artículo eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createArticleController, getArticlesController, getArticleByIdController, updateArticleController, deleteArticleController };