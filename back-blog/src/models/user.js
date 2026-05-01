module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: 'users', timestamps: true });

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values._id = values.id;
    delete values.id;
    delete values.password;
    return values;
  };

  return User;
};