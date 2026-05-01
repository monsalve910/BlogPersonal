const { Article, User } = require("../models");

// CREAR ARTÍCULO
async function createArticle(data) {
  const article = await Article.create({
    titulo: data.titulo,
    contenido: data.contenido,
    fecha: data.fecha,
    imagen: data.imagen,
    userId: data.userId,
  });

  return article;
}

// OBTENER TODOS
async function getArticles() {
  return await Article.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id", "name", "email"],
      },
    ],
  });
}

// POR ID
async function getArticleById(id) {
  return await Article.findByPk(id, {
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id", "name", "email"],
      },
    ],
  });
}

// UPDATE
async function updateArticle(id, data) {
  const article = await Article.findByPk(id);

  if (!article) return null;

  await article.update(data);

  return article;
}

// DELETE
async function deleteArticle(id) {
  const article = await Article.findByPk(id);

  if (!article) return null;

  await article.destroy();

  return true;
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
