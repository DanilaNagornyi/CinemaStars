module.exports.sendMsg = (req, res) => {
  console.log('dfghj,');
  //токен и id чата берутся из config.json
  const config = require('../config.json');
  let http = require('request')
  let reqBody = req.body
  console.log('req.body====>', req.body);

  //каждый элемент обьекта запихиваем в массив
  let fields = [
    '<b>Name</b>: ' + reqBody.name,
    '<b>Email</b>: ' + reqBody.email,
    reqBody.text
  ]
  let msg = ''
  //проходимся по массиву и склеиваем все в одну строку
  fields.forEach(field => {
    msg += field + '\n'
  });
  //кодируем результат в текст, понятный адресной строке
  msg = encodeURI(msg)
  console.log(msg);
  //делаем запрос
  http.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`, function (error, response, body) {  
    //не забываем обработать ответ
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode); 
    // console.log('body:', body); 
    if(response.statusCode===200){
      res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
    }
    if(response.statusCode!==200){
      res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
    }
  });

}
