const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function createUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({ name: data.name, email: data.email, password: hashed });
  return user;
}

async function getUsers() {
  return await User.findAll();
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  await user.update(data);
  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

async function loginUser(data) {
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) return null;
  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) return null;
  return user;
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };