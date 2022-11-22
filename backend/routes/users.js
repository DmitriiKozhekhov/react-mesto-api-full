const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validationOfUser, validationOfUserId, validationOfAvatar } = require('../middlewares/reqValidation');

const {
  getUsers,
  getUser,
  createUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.use(auth);
router.get('/', getUsers);
router.get('/me', getUser);
router.post('/', createUser);
router.patch('/me', validationOfUser, editUser);
router.patch('/me/avatar', validationOfAvatar, editAvatar);
router.get('/:userId', validationOfUserId, getUser);

module.exports = router;
