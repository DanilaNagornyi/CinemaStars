const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.pluralize(null);

const User = mongoose.model('user', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  sex: String,
  location: String,
  tel: { type: String, required: true },
  instagram: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  photo: {
    type: String,
    default:
      'https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png',
  },
  video: String,
  description: { type: String },
  minSalary: Number,
  maxSalary: Number,
  projectType: [String],
  genre: [String],
  myProject: [String],
  possibleOrders: [{ type: mongoose.ObjectId, ref: 'event' }],
});
// const user = new User({ name: 'Zildjian', email: '33@ya.ru', password: '123', role: 'admin' });
// user.save().then(() => console.log('ok'));
module.exports = User;
