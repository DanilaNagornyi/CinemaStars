// Я вынес логику обработки данных в отдельный файл
const router = require('express').Router();
const ctrlTelegram = require('../api/telegramMsg');
router.post('/telegram', ctrlTelegram.sendMsg);

module.exports = router;
