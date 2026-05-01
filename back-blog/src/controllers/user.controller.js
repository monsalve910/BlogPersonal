const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../services/user.service');

async function createUserController(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ status: 'success', contador: 1, usuarios: [user] });
  } catch (err) {
    next(err);
  }
}

async function getUsersController(req, res, next) {
  try {
    const usuarios = await getUsers();
    res.json({ status: 'success', contador: usuarios.length, usuarios });
  } catch (err) {
    next(err);
  }
}

async function getUserByIdController(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', usuario: user });
  } catch (err) {
    next(err);
  }
}

async function updateUserController(req, res, next) {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', usuario: user });
  } catch (err) {
    next(err);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const ok = await deleteUser(req.params.id);
    if (!ok) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'success', message: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
}

async function loginController(req, res, next) {
  try {
    const user = await require('../services/user.service').loginUser(req.body);
    if (!user) return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    res.json({ status: 'success', usuario: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUserController, getUsersController, getUserByIdController, updateUserController, deleteUserController, loginController };