const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../services/article.service");

// CREATE
async function createArticleController(req, res, next) {
  try {
    const { titulo, contenido, fecha, imagen, userId } = req.body;

    //  VALIDACIÓN (esto evita el 400 silencioso)
    if (!titulo || !contenido || !userId) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios (titulo, contenido, userId)",
      });
    }

    const article = await createArticle({
      titulo,
      contenido,
      fecha,
      imagen,
      userId: Number(userId),
    });

    return res.status(201).json({
      status: "success",
      contador: 1,
      articulos: [article],
    });
  } catch (err) {
    next(err);
  }
}

// GET ALL
async function getArticlesController(req, res, next) {
  try {
    const articulos = await getArticles();

    return res.json({
      status: "success",
      contador: articulos.length,
      articulos,
    });
  } catch (err) {
    next(err);
  }
}

// GET BY ID
async function getArticleByIdController(req, res, next) {
  try {
    const articulo = await getArticleById(req.params.id);

    if (!articulo) {
      return res.status(404).json({
        status: "error",
        message: "Artículo no encontrado",
      });
    }

    return res.json({ status: "success", articulo });
  } catch (err) {
    next(err);
  }
}

// UPDATE
async function updateArticleController(req, res, next) {
  try {
    const articulo = await updateArticle(req.params.id, req.body);

    if (!articulo) {
      return res.status(404).json({
        status: "error",
        message: "Artículo no encontrado",
      });
    }

    return res.json({ status: "success", articulo });
  } catch (err) {
    next(err);
  }
}

// DELETE
async function deleteArticleController(req, res, next) {
  try {
    const ok = await deleteArticle(req.params.id);

    if (!ok) {
      return res.status(404).json({
        status: "error",
        message: "Artículo no encontrado",
      });
    }

    return res.json({
      status: "success",
      message: "Artículo eliminado",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
};