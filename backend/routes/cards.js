const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validationOfCard, validationOfCardId } = require('../middlewares/reqValidation');

const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

router.use(auth);
router.get('/', getCard);
router.post('/', validationOfCard, createCard);
router.delete('/:cardId', validationOfCardId, deleteCard);
router.put('/:cardId/likes', validationOfCardId, likeCard);
router.delete('/:cardId/likes', validationOfCardId, dislikeCard);

module.exports = router;
