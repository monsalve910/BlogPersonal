const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const UserModel = require('./user')(sequelize, DataTypes);
const ArticleModel = require('./article')(sequelize, DataTypes);

UserModel.hasMany(ArticleModel, { foreignKey: 'userId' });
ArticleModel.belongsTo(UserModel, { foreignKey: 'userId' });

module.exports = { User: UserModel, Article: ArticleModel, sequelize };