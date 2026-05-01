const { Article, User } = require('../models');

async function createArticle(data) {
  const article = await Article.create({
    titulo: data.titulo,
    contenido: data.contenido,
    fecha: data.fecha,
    imagen: data.imagen,
    userId: data.userId
  });
  return article;
}

async function getArticles() {
  return await Article.findAll({ include: [{ model: User, as: 'User' }] });
}

async function getArticleById(id) {
  return await Article.findByPk(id, { include: [{ model: User, as: 'User' }] });
}

async function updateArticle(id, data) {
  const a = await Article.findByPk(id);
  if (!a) return null;
  await a.update(data);
  return a;
}

async function deleteArticle(id) {
  const a = await Article.findByPk(id);
  if (!a) return null;
  await a.destroy();
  return true;
}

module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle };