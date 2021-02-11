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
  const { title, description, photo, projectType, genre, roles, location } = req.body;
  try {
    await Event.create({
      title, description, photo, projectType, genre, roles, location, creator: req.session.userId
    });
    return res.redirect('/');
  } catch (error) {
    log(error);
    return res.render('error', { message: 'Не удалось сохранить в базу' });
  }
});

router.get('/:id', async (req, res) => {
  log('========>', req.params.id);
  const event = await Event.findById(req.params.id).populate('creator');
  log(1111, event.description);
  res.render('event', { event });
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
