const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
import {db} from '../config/database.js';
const UserModel = require('./user')(sequelize, DataTypes);
const ArticleModel = require('./article')(sequelize, DataTypes);

UserModel.hasMany(ArticleModel, { foreignKey: 'userId' });
ArticleModel.belongsTo(UserModel, { foreignKey: 'userId' });

module.exports = { User: UserModel, Article: ArticleModel, sequelize };