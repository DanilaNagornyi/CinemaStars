/* eslint-disable max-len */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.pluralize(null);

const Event = mongoose.model('event', {
  title: { type: String, required: true },
  description: String,
  photo: { type: String, default: 'https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png' },
  creator: { type: mongoose.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now() },
  video: String,
  projectType: [String],
  genre: [String],
  staff: [{ type: mongoose.ObjectId, ref: 'user' }],
  roles: [{ type: String, required: true }],
  location: String,
});

module.exports = Event;
