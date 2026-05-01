const express = require('express');
const router = express.Router();
const { createUserController, getUsersController, getUserByIdController, updateUserController, deleteUserController, loginController } = require('../controllers/user.controller');
const { validateUser } = require('../validators/user.validator');

router.post('/login', loginController);
router.post('/', validateUser('create'), createUserController);
router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', validateUser('update'), updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;