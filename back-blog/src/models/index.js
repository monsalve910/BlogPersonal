const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const UserModel = require('./user')(sequelize, DataTypes);
const ArticleModel = require('./article')(sequelize, DataTypes);

UserModel.hasMany(ArticleModel, { foreignKey: 'userId', as: 'Articles' });
ArticleModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'User' });

module.exports = { User: UserModel, Article: ArticleModel, sequelize };