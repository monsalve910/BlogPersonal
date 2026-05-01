const { Article, User } = require("../models");

// CREATE
async function createArticle(data) {
  return await Article.create({
    titulo: data.titulo,
    contenido: data.contenido,
    fecha: data.fecha || new Date(),
    imagen: data.imagen || "default.png",
    userId: Number(data.userId),
  });
}

// GET ALL
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

// GET BY ID
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