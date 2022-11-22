const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Users = require('../models/user');
const {
  NOT_FOUND, CAST_ERROR,
} = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
module.exports.getUser = (req, res, next) => {
  Users.findById(req.params.userId || req.user._id)
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequest('Некорректные данные заапроса'));
      }

      if (err.message === NOT_FOUND) {
        return next(new NotFound('Пользователь не найден'));
      }

      return next(err);
    });
};
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Некорректные данные запроса'));
      }

      if (err.code === 11000) {
        return next(new Conflict('Пользователь с такими данными уже существует'));
      }

      return next(err);
    });
};
module.exports.editUser = (req, res, next) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFound('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Некорректные данные запроса'));
      }

      return next(err);
    });
};
module.exports.editAvatar = (req, res, next) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFound('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Некорректные данные запроса'));
      }

      return next(err);
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
        .status(200).send({ message: 'Авторзация прошла успешно' });
    })
    // eslint-disable-next-line arrow-body-style, no-unused-vars
    .catch(next);
};
