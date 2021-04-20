// const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');
require('dotenv').config();

// создаем дополнительное условие в hbs которое
// позволяем в создать свой if и сравнивать между собой значения
hbs.registerHelper('if_eq', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const telegramRouter = require('./routes/telegram');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

// подключаем локальную базу данных
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// подключаем паршиалс
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// настройка сессий
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'kasjdfl', // секретный ключ для кодировки id сессии кодирует данные express-session
    resave: true, // пересохранять сессию даже при отсутствии изменений
    saveUninitialized: false, // сохранять сессию при первом обращении к сайта
    cookie: { maxAge: 30000000, secure: false },
    httpOnly: true, // ?
  })
);
// Мидлваре которая ко всем запросам к сереверу добавляет переменные в сессию
app.use((req, res, next) => {
  res.locals.username = req.session?.username; // записываем глобальную переменную username для hbs
  // записываем userId для указания автора
  res.locals.userId = req.session?.userId;
  // записываем роль для разграничения прав
  res.locals.role = req.session?.role;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/forms', telegramRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
