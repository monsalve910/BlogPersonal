const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const UserModel = require("./user");
const ArticleModel = require("./article");

const User = UserModel(sequelize, Sequelize.DataTypes);
const Article = ArticleModel(sequelize, Sequelize.DataTypes);

//  RELACIONES CORRECTAS
Article.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

User.hasMany(Article, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Article,
};
