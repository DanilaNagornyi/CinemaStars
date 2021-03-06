const express = require('express');
const Event = require('../models/event');
const User = require('../models/user');

const router = express.Router();

const { log } = console;

// All events
router.get('/idevent', (req, res) => {
  res.render('event', { title: 'Событие' });
});
// add event
router.get('/addevent', (req, res) => {
  res.render('addEvent');
});

// create event
router.post('/', async (req, res) => {
  log('post event');
  const {
    title,
    description,
    photo,
    projectType,
    genre,
    roles,
    location,
  } = req.body;
  try {
    await Event.create({
      title,
      description,
      photo,
      projectType,
      genre,
      roles,
      location,
      creator: req.session.userId,
    });
    return res.redirect('/');
  } catch (error) {
    log(error);
    return res.render('error', { message: 'Не удалось сохранить в базу' });
  }
});

router.get('/addevent/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    return res.render('addEvent', { event });
  } catch (error) {
    return res.render('error', { message: 'Не удалось сохранить в базу' });
  }
});

//Редактируем немного по колхозному

router.put('/:id', async (req, res) => {
  log('======>>>  ok!');
  const {
    title,
    description,
    photo,
    projectType,
    genre,
    roles,
    location,
  } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      photo,
      projectType,
      genre,
      roles,
      location,
      creator: req.session.userId,
    });
    return res.redirect('/users/profile');
  } catch (error) {
    return res.render('error', { message: 'Не удалось сохранить в базу' });
  }
});

//Delete event
router.get('/delete/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
  } catch (error) {
    return res.render('error', { message: 'Не удалось сохранить в базу' });
  }
  return res.redirect('/users/profile');
});

//Подтягиваем на страницу из базы данные
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id).populate('creator');
  const staffP = await Event.findById(req.params.id).populate('staff');
  console.log(event);
  const vacancies = event.roles;

  let users = [];
  for (let i = 0; i < vacancies.length; i++) {
    let tempUsers = await User.find({ role: vacancies[i] });
    users = [...users, ...tempUsers];
  }
  console.log('users_____________________', users);
  function compare(arrUser, arrEvent) {
    for (let i = 0; i < arrUser.length; i++) {
      if (arrEvent.includes(arrUser[i])) return true;
    }
    return false;
  }

  let userFilter = users.filter((el) => !event.staff.includes(el._id));

  userFilter = userFilter.filter((el) => compare(el.genre, event.genre));
  console.log('userFilter----------------s', userFilter);

  // console.log('event.genre==========================>', event.genre);
  // console.log('USERFILLLTER==========================>', userFilter);
  // console.log('USERS=======================>',users);
  // console.log('StafffffFF=======================>',event.staff);

  // const userForHireDiv = document.querySelector('.single-team-member');
  // userForHireDiv.addEventListener('click', (event)=>{
  //   console.log(event.target(userId));
  // });
  log('taffP.staff', staffP.staff);
  res.render('event', { event, users: userFilter, staff: staffP.staff });
});

// Add user to  the project team
router.get('/hire/:idUser/:idEvent', async (req, res) => {
  const { idUser, idEvent } = req.params;
  console.log('======>>>>>>>>>>>>>>', idEvent);
  const user = await User.findById(idUser);
  const event = await Event.findOneAndUpdate(
    { _id: idEvent },
    { $push: { staff: user._id } }
  );
  res.redirect(`/events/${idEvent}`);
});
// Delete user from  the project team
router.get('/fire/:idUser/:idEvent', async (req, res) => {
  // const event = await Event.findById(req.params.idEvent).lean();
  // const eventFilter = event.staff.filter((el) => el !== req.params.idUser);
  await Event.findByIdAndUpdate(req.params.idEvent, {
    $pullAll: { staff: [req.params.idUser] },
  });
  res.redirect(`/events/${req.params.idEvent}`);
  // await Event.findByIdAndUpdate(req.params.idEvent, { staff: eventFilter });
  // await eventFilter.save();
});

// {{!-- title: { type: String, required: true },
// description: { type: String },
// photo: { type: String, default: 'https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png' },
// creator: { type: mongoose.ObjectId, ref: 'user' },
// createdAt: { type: Date, default: Date.now() },
// projectType: [String],
// genre: [String],
// staff: [{ type: mongoose.ObjectId, ref: 'user' }],
// roles: [{ type: String, required: true }],
// location: String, --}}

module.exports = router;
