'use strict';

//  Модуль, который создает данные

(function () {
//  Константы для создания массива
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var OFFER_TYPES = ['flat', 'house', 'bungalo'];

  var OFFER_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  //  Перевод для вывода типа объектов
  window.offerTypeRU = function (el) {
    switch (el) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'house': return 'Дом';
      default: return 'Другой тип';
    }
  };

  //  Получение случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  //  Получение случайного элемента из массива
  var getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  //  Получение случайного элемента из массива без повторения
  var getRandomItemNoRepeat = function (arr) {
    var randomElement = getRandomNumber(0, arr.length - 1);
    var randomElementItem = arr[randomElement];
    arr.splice(randomElement, 1);
    return randomElementItem;
  };

  //  Получение нескольких случайных элементов из массива без повторений
  //  без изменения массива для следующего объекта
  var getRandomItemNoRepeatAll = function (arr, num) {
    var newArr = [];
    var myArr = arr.slice();
    for (var i = 0; i < num; i++) {
      var random = getRandomNumber(0, myArr.length - 1);
      newArr.push(myArr[random]);
      myArr.splice(random, 1);
    }
    return newArr;
  };

  //  Элементы массива в случайном порядке
  var shuffleArr = function (arr) {
    var newArr = [];
    var myArr = arr.slice();
    var num = myArr.length;
    for (var i = 0; i < num; i++) {
      var random = getRandomNumber(0, myArr.length - 1);
      newArr.push(myArr[random]);
      myArr.splice(random, 1);
    }
    return newArr;
  };

  //  Получение массива
  var getObjects = function (num) {
    var arr = [];
    for (var i = 0; i < num; i++) {

      var locationX = getRandomNumber(300, 900);
      var locationY = getRandomNumber(150, 500);
      var mapObject = {
        'author': {
          'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
        },

        'offer': {
          'title': getRandomItemNoRepeat(OFFER_TITLES),
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(1000, 1000000),
          'type': getRandomItem(OFFER_TYPES),
          'rooms': getRandomNumber(1, 5),
          'guests': getRandomNumber(1, 20),
          'checkin': getRandomItem(OFFER_CHECKIN_TIMES),
          'checkout': getRandomItem(OFFER_CHECKOUT_TIMES),
          'features': getRandomItemNoRepeatAll(OFFER_FEATURES, 2),
          'description': '',
          'photos': shuffleArr(OFFER_PHOTOS)
        },

        'location': {
          'x': locationX,
          'y': locationY
        }
      };

      arr.push(mapObject);
    }
    return arr;
  };

  window.mapObjects = getObjects(8);

})();
