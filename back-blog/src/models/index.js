const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const UserModel = require("./User");
const ArticleModel = require("./Article");

const User = UserModel(sequelize, Sequelize.DataTypes);
const Article = ArticleModel(sequelize, Sequelize.DataTypes);

// 🔥 RELACIONES CORRECTAS
User.hasMany(Article, {
  foreignKey: "userId",
  as: "articles",
});

Article.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

module.exports = {
  sequelize,
  User,
  Article,
};
