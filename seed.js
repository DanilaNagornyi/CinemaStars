const mongoose = require('mongoose');
const User = require('./models/user');
const Event = require('./models/event');
async function main() {
  const users = [];
  const events = [];
  const actorDanila = new User({
    firstName: 'Данила',
    lastName: 'Нагорный',
    age: 33,
    sex: 'Мужчина',
    location: 'Москва',
    tel: '+7926345567',
    instagram: 'https://www.instagram.com/danila_nagornyi/',
    email: 'danilanag@gmail.com',
    password: 'qwerty123',
    role: 'Актер',
    photo:
      'https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png',
    video: 'https://www.youtube.com/watch?v=Wn0HQbchgww',
    description:
      'Я отличаюсь от многих других актёров тем что благодаря дополнительному образованию и непрерывному стремлению к саморазвитию я глубже, дотошнее и тщательнее вживаюсь в роль. Я не поверхностный актёр и всегда глубоко погружаюсь в образ. Я мечтаю сыграть множество разноплановых ролей, я не сторонник какого-то одного жанра, я за многообразие)',
    minSalary: 100000,
    maxSalary: 100000000,
    projectType: ['Краткометражный', 'Полнометражный', ' Реклама'],
    genre: ['драма', 'триллер', 'боевик'],
    myProject: ['Interstellar', 'Toyota', 'Большой дом'],
    // possibleOrders: [{ type: mongoose.ObjectId, ref: 'event' }],
  });
  users.push(actorDanila);

  const operator = new User({
    firstName: 'Илья',
    lastName: 'Бондаренко',
    age: 35,
    sex: 'Мужчина',
    location: 'Москва',
    tel: '+7926345789',
    instagram: 'https://www.instagram.com/bdgou/',
    email: 'ilya88@gmail.com',
    password: 'qwerty123',
    role: 'Оператор',
    photo:
      'https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png',
    video: 'https://www.youtube.com/watch?v=_mZHMwbk_6c&feature=emb_logo',
    description: `Как актёр, сыграл в более 40 музыкальных клипах звёзд Российской эстрады( главные роли ). Более 30 рекламных видеороликов. Работы в кино: от сериалов до полного метра. Ставил и режиссировал шоу разного плана.
    Характер спокойный. Стрессоустойчивый. Хорошее чувство кадра и гибкость в работе с режиссёрами. Занимался кикбоксингом 8 лет. Хорошая боевая подготовка. Акробатика.
    Танцы-профессионально. Постановка хореографии. Владение всеми современными направлениями.
    Вождение авто, мото( права «В»; «А»).
    `,
    minSalary: 200000,
    maxSalary: 120000000,
    projectType: ['Краткометражный', 'Клипы', ' Реклама'],
    genre: ['драма', 'мелодрама', 'боевик'],
    myProject: ['Colgate', 'Toyota', 'Город'],
    // possibleOrders: [{ type: mongoose.ObjectId, ref: 'event' }],
  });
  users.push(operator);

  const director = new User({
    firstName: 'Александр',
    lastName: 'Блинков',
    age: 35,
    sex: 'Мужчина',
    location: 'Москва',
    tel: '+7927845789',
    instagram: 'https://www.instagram.com/blinkovfpv/',
    email: 'aleks90@gmail.com',
    password: 'qwerty123',
    role: 'Режиссер',
    photo:
      'https://sun9-63.userapi.com/c854420/v854420986/370d7/PJ0lwyoGjHI.jpg',
    video: 'https://www.youtube.com/watch?v=iq8UAvKTqtw',
    description: `Первый раз в кино снимался в армии в фильм Теплые ветры древних булгар. Потом он назывался по другому. В массовых сценах играли воинов этих самых булгар. 
    Там же первый раз снялся в эпизоде в бое с каскадером крупным планом) Где я был нападающим на деревню, а каскадер эту деревню защищал. Потом надолго отошел от этого процесса.
    В 35 лет решил попробовать актерское искусство, пошел на курсы. Отучился год и понял, что хочу в этом развиваться. Пошел в ИТИ. Сейчас закончил (2020). 
    За плечами на это время съемки в телесериалах работа на съемочной площадке на различных позициях и съемки в полном метре, В театре ТСД два сезона
    `,
    minSalary: 200500,
    maxSalary: 120005000,
    projectType: ['Полнометражный', 'Сериалы', ' Реклама'],
    genre: ['ужасы', 'ром-ком', 'фэнтези'],
    myProject: ['Шерлок', 'реклама McDonalds', 'Чики'],
    // possibleOrders: [{ type: mongoose.ObjectId, ref: 'event' }],
  });
  users.push(director);
  const igor = new User({
    firstName: 'Игорь',
    lastName: 'Никифоров',
    age: 34,
    sex: 'Мужской',
    location: 'Москва',
    tel: '+79268756709',
    instagram: 'instagram.com',
    email: 'kolobamanacas+cinema@outlook.com',
    password: '123',
    role: 'Композитор',
    photo:
      'https://avatars.githubusercontent.com/u/20444060?s=460&u=8cd5178ee1838423d12eedf9d0343fb498365c21&v=4',
    video: 'https://www.youtube.com/watch?v=b7cch1vBfeA&feature=youtu.be',
    description: 'hi',
    minSalary: 20000000,
    maxSalary: 400000000000,
    projectType: ['полнометражный'],
    genre: ['ужасы', 'фэнтези'],
    myProject: ['Зведные войны'],
    possibleOrders: [],
  });
  users.push(igor);

  const simon = new User({
    firstName: 'Семен',
    lastName: 'Жолобов',
    age: 30,
    sex: 'Мужской',
    location: 'Москва',
    tel: '+792089756709',
    instagram: 'https://www.instagram.com/zholobovss/',
    email: 'kolobamanacas+cinema@outlook.com',
    password: '123',
    role: 'Композитор',
    photo:
      'https://sun9-33.userapi.com/impf/c630726/v630726624/3fd58/7ndc8DVffeE.jpg?size=2560x1707&quality=96&proxy=1&sign=c4eac4863c97f688188f1a0c0de7f22e&type=album',
    video: 'https://www.youtube.com/watch?v=b7cch1vBfeA&feature=youtu.be',
    description: 'bye',
    minSalary: 29000000,
    maxSalary: 400000800000,
    projectType: ['реклама'],
    genre: ['ужасы', 'фэнтези'],
    myProject: ['Диор'],
    possibleOrders: [],
  });
  users.push(simon);

  const tapac = new User({
    firstName: 'Тарас',
    lastName: 'Голомозый',
    age: 33,
    sex: 'Мужской',
    location: 'Москва',
    tel: '+792609756709',
    instagram: 'instagram.com',
    email: 'tapac@gmail.com',
    password: '123',
    role: 'Актер',
    photo:
      'https://yt3.ggpht.com/a/AATXAJxg7ZeVPRmAd4RTHx017wng9kUf37N_6kt3fd7V=s900-c-k-c0xffffffff-no-rj-mo',
    video: 'https://www.youtube.com/channel/UCaKZxz2d1KI-wN3l6fX7zdQ',
    description: 'pryovet',
    minSalary: 70000000,
    maxSalary: 980000000000,
    projectType: ['полнометражный', 'реклама'],
    genre: ['ужасы', 'фэнтези', 'драма'],
    myProject: ['Скрытые фигуры'],
    possibleOrders: [],
  });
  users.push(tapac);
  const gosha = new User({
    firstName: 'Георгий',
    lastName: 'Бабаян',
    age: 35,
    sex: 'Мужской',
    location: 'Москва',
    tel: '+792089756456',
    instagram: 'https://www.instagram.com/george.babayan/',
    email: 'g_babayan@gmail.com',
    password: '123',
    role: 'Сценарист',
    photo:
      'https://sun9-67.userapi.com/impf/c851032/v851032858/9fb3f/cfJamRj6xOs.jpg?size=1265x2160&quality=96&proxy=1&sign=2e95cc63c705545de0c33e69d1ec9642&type=album',
    video: 'https://www.youtube.com/watch?v=2pQ1vp0mcXQ',
    description: 'gggg',
    minSalary: 29000000,
    maxSalary: 400000800000,
    projectType: ['клипы'],
    genre: ['фэнтези'],
    myProject: ['Лобода-'],
    possibleOrders: [],
  });
  users.push(gosha)
  await User.insertMany(users);

  const elbrusLife = new Event({
    title: 'Elbrus',
    description: 'Документальный фильм о жизни в первом буткемпе в России',
    photo: 'https://elbrusboot.camp/images/campus/03.JPG',
    video: 'https://www.youtube.com/watch?v=Un3ST7BiiO4',
    creator: [director._id],
    projectType: 'Полнометражный',
    genre: 'Документальный',
    staff: [actorDanila._id, operator._id],
    roles: ['актер', 'оператор', 'композитор'],
    location: 'Москва',
  });
  events.push(elbrusLife);
  await Event.insertMany(events);
}
main();
