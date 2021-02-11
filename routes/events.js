const express = require('express');

const router = express.Router();

// All events
router.get('/idevent', (req, res) => {
  res.render('event', { title: 'Событие' });
});

module.exports = router;
