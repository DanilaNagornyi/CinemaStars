const mongoose = require("mongoose");
const User = require("./models/user");
const Event = require('./models/order')
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
    // photo: 
        // ['https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png'],
    // video: 'https://www.youtube.com/watch?v=Wn0HQbchgww',
    description: 'Я отличаюсь от многих других актёров тем что благодаря дополнительному образованию и непрерывному стремлению к саморазвитию я глубже, дотошнее и тщательнее вживаюсь в роль. Я не поверхностный актёр и всегда глубоко погружаюсь в образ. Я мечтаю сыграть множество разноплановых ролей, я не сторонник какого-то одного жанра, я за многообразие)',
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
    // photo: ['https://www.pinclipart.com/picdir/big/416-4160500_you-wont-have-any-technical-issues-to-deal.png'],
    // video: 'https://www.youtube.com/watch?v=_mZHMwbk_6c&feature=emb_logo',
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
    // photo: ['https://sun9-63.userapi.com/c854420/v854420986/370d7/PJ0lwyoGjHI.jpg', 'https://i02.fotocdn.net/s114/124c7320d5cd6578/user_l/2591692911.jpg'],
    // video: 'https://www.youtube.com/watch?v=iq8UAvKTqtw',
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
  await User.insertMany(users);
  
  const elbrusLife = new Event({
    title: 'Elbrus',
    description: 'Документальный фильм о жизни в первом буткемпе в России',
    // photo: 'https://elbrusboot.camp/images/campus/03.JPG',
    creator: [director._id],
    projectType: 'Полнометражный',
    genre: 'Документальный',
    staff: [actorDanila._id, operator._id],
    roles: ['актер', 'оператор', 'композитор'],
    location: 'Москва',
  });
  events.push(elbrusLife)
  await Event.insertMany(events)
}
main()
