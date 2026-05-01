import {db} from '../config/database.js';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false },
    imagen: { type: DataTypes.STRING, defaultValue: 'default.png' },
    version: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, { tableName: 'articles', timestamps: true });

  Article.prototype.toJSON = function () {
    const v = this.get();
    const result = {
      _id: v.id,
      titulo: v.titulo,
      contenido: v.contenido,
      fecha: v.fecha,
      imagen: v.imagen,
      __v: v.version
    };
    if (v.User) result.User = v.User;
    return result;
  };

  return Article;
};