const { default: mongoose } = require('mongoose');
const Cards = require('../models/card');
const { CAST_ERROR,
} = require('../constants');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.getCard = (req, res, next) => {
  Cards.find({}).sort({ createdAt: -1 })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Некорректные данные запроса'));
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId).orFail(() => new NotFound('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не можете удалить не свою карточку');
      }
      return Cards.findByIdAndRemove(req.params.cardId)
        // eslint-disable-next-line no-shadow
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequest('Некорректные данные запроса'));
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFound('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequest('Некорректные данные запроса'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFound('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequest('Некорректные данные запроса'));
      }
      return next(err);
    });
};
