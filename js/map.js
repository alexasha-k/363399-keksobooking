'use strict';

//  Временное решение. У блока .map уберите класс .map--faded

document.querySelector('.map').classList.remove('map--faded');

//  Создайте массив, состоящий из 8 сгенерированных JS объектов

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
var offerTypeRU = function () {
  switch (mapObjects[i].offer.type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    default: return 'Другой тип';
  }
};

//  Создаем пустой массив
var mapObjects = [];


//  Получение случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

//  Получение случайного элемента из массива
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

//  Получение случайного элемента из массива без повторения
var getRandomItemNoRepeat = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
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
    var random = Math.floor(Math.random() * myArr.length);
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
    var random = Math.floor(Math.random() * myArr.length);
    newArr.push(myArr[random]);
    myArr.splice(random, 1);
  }
  return newArr;
};

//  Получение массива
var getObjects = function (num) {
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

    mapObjects.push(mapObject);
  }
};

//  Получаем массив из 8 элементов для задания
getObjects(8);

//  END Создайте массив, состоящий из 8 сгенерированных JS объектов


//  На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте

var createDOMElement = function (el) {
  return el.content;
};

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('section.map');

//  Заполнение меток данными из массива
var mapBalloonTemplate = createDOMElement(document.querySelector('#map-balloon-template'));
var PIN_HEIGHT = 70;

for (var i = 0; i < mapObjects.length; i++) {

  var mapBalloonElement = mapBalloonTemplate.cloneNode(true);
  mapBalloonElement.querySelector('.map__pin').style.left = mapObjects[i].location.x + 'px';
  mapBalloonElement.querySelector('.map__pin').style.top = (mapObjects[i].location.y - (PIN_HEIGHT / 2)) + 'px';
  mapBalloonElement.querySelector('.map__pin').setAttribute('title', 'My title');
  mapBalloonElement.querySelector('img').setAttribute('src', mapObjects[i].author.avatar);

  mapPins.appendChild(mapBalloonElement);
}

//  Заполнение объявления данными из массива

var mapCardTemplate = createDOMElement(document.querySelector('#map-card-template'));
var mapFiltersContainer = document.querySelector('.map__filters-container');

for (i = 0; i < mapObjects.length; i++) {

  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('h3').textContent = mapObjects[i].offer.title;
  mapCardElement.querySelector('p > small').textContent = mapObjects[i].offer.address;
  mapCardElement.querySelector('.popup__price').textContent = mapObjects[i].offer.price + ' \u20BD /ночь';
  mapCardElement.querySelector('h4').textContent = offerTypeRU();
  mapCardElement.querySelector('h4 + p').textContent = mapObjects[i].offer.rooms + ' комнаты для ' + mapObjects[i].offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + mapObjects[i].offer.checkin + ', выезд до ' + mapObjects[i].offer.checkout;
  mapCardElement.querySelector('.popup__features + p').textContent = mapObjects[i].offer.description;
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', mapObjects[i].author.avatar);
  mapCardElement.querySelector('.popup__features + p').textContent = mapObjects[i].offer.description;

  //  Заполнение блока features
  var mapCardElementFeature = mapCardElement.querySelector('.popup__features li');

  for (var j = 0; j < mapObjects[i].offer.features.length; j++) {
    var mapCardElementFeatureElement = mapCardElementFeature.cloneNode(true);
    mapCardElementFeatureElement.classList.add('feature', 'feature--' + mapObjects[i].offer.features[j]);
    mapCardElement.querySelector('.popup__features').appendChild(mapCardElementFeatureElement);
  }

  //  Заполнение блока pictures
  var mapCardElementPictures = mapCardElement.querySelector('.popup__pictures li');

  for (var k = 0; k < mapObjects[i].offer.photos.length; k++) {
    var mapCardElementPictureElement = mapCardElementPictures.cloneNode(true);
    mapCardElementPictureElement.querySelector('img').setAttribute('src', mapObjects[i].offer.photos[k]);
    mapCardElementPictureElement.querySelector('img').setAttribute('width', 100);
    mapCardElementPictureElement.querySelector('img').setAttribute('height', 75);
    mapCardElement.querySelector('.popup__pictures').appendChild(mapCardElementPictureElement);
  }

  map.insertBefore(mapCardElement, mapFiltersContainer);
}

//  END На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте
