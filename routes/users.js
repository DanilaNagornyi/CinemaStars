/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const express = require('express');

// создаем экземпляр роутера из объекта экспресс
const router = express.Router();
// подключаем библиотеку для шифрования паролей
const bcrypt = require('bcrypt');
// подключаем модель юзера
const User = require('../models/user');
// подключаем модель event
const Event = require('../models/event');

// сколько рандов мы будем хешировать кодировать;
const saltRounds = 10;
// деструктурируем объект консоль
const { log } = console;
/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
// registration handle
router.get('/register', (req, res) => {
  // отправляем на рендер шаблон страницы с двумя переменными
  res.render('user/register', {
    title: 'Регистрация',
    message: 'Пожалуйста зарегистрируйтесь',
  });
});
// ручка которая обрабатываем форму регистрации
router.post('/', async (req, res) => {
  log(req.body);
  // деструктурируем переменную
  const {
    firstName,
    lastName,
    age,
    email,
    tel,
    role,
    instagram,
    location,
    genre,
    projectType,
    sex,
    photo,
    video,
    description,
    minsulary,
    password,
  } = req.body;
  // ищем пользователя в базе
  const findUser = await User.findOne({ email });
  // если есть такой пользователь то отправляем сообщение что у
  if (findUser) {
    res.render('error', {
      message: 'Пользователь с таким email уже зарегистрирован',
    });
  }
  // log(await User.findOne({ email }));
  // генерируем соль для шифрование паролей
  const salt = bcrypt.genSaltSync(saltRounds);
  // создаем пароль
  const hash = bcrypt.hashSync(password, salt);
  // создаем нового юзера по модели
  const user = await User.create({
    firstName,
    lastName,
    age,
    email,
    tel,
    role,
    instagram,
    location,
    genre,
    projectType,
    sex,
    photo,
    video,
    description,
    minsulary,
    password: hash,
  });

  // сохраняем его в базу
  // await user.save();
  // снова ищем его из базы что бы получить его id
  // findUser = await User.findOne({ email });
  // записываем в сессию имя пользователя id и role
  req.session.username = user.firstName;
  req.session.userId = user._id;
  req.session.role = user.lastName.role;
  res.redirect('/users/profile');
});
// login
router.get('/login', (req, res) => {
  res.render('user/login', {
    title: 'Авторизация',
    message: 'Пожалуйста авторизуруйтесь',
  });
});
// обрабатываем форму авторизации
router.post('/login', async (req, res) => {
  log('singin handle');
  const { email, password } = req.body;
  log(req.body);
  const user = await User.findOne({ email });
  log('user', user);
  if (user) {
    log('Логин верен');
    // сравниваем пароли через bcript
    if (bcrypt.compareSync(password, user.password)) {
      log('логин и пароль верны');
      // записываем в сессию  переменные
      req.session.username = user.firstName;
      log(user);
      req.session.userId = user._id;
      req.session.role = user.role;
      log(user.id);
      res.redirect('/users/profile');
    } else {
      res.render('error', { message: 'неверный пароль' });
    }
  } else {
    res.render('error', { message: 'Данный пользователь не зарегистрирован' });
  }
});

// Routes profile .includes(user._id)
router.get('/profile', async (req, res) => {
  let user;
  let createEvents;
  let stafEvents;
  try {
    user = await User.findById(req.session.userId);
    createEvents = await Event.find({ creator: user._id });
    stafEvents = await Event.find();
    log(stafEvents);
    stafEvents = stafEvents.filter((el) => el.staff.includes(user._id));
  } catch (error) {
    return res.render('error', { message: 'Пользователь не найден!' });
  }
  return res.render('profile', { user, createEvents, stafEvents });
});

// Profile current user
router.get('/profile/:id', async (req, res) => {
  let user;
  let createEvents;
  let stafEvents;
  try {
    user = await User.findById(req.params.id);
  } catch (error) {
    return res.render('error', { message: 'Пользователь не найден!' });
  }
  return res.render('profile', { user });
});

// logout
router.get('/logout', (req, res) => {
  // разрушаю сессию
  req.session.destroy();
  // очищаем cookie у пользователя
  res.clearCookie('connect.key');
  res.redirect('/');
});
module.exports = router;
