'use strict';

//  Временное решение. У блока .map уберите класс .map--faded


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
var offerTypeRU = function (el) {
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

//  Получаем массив из 8 элементов для задания
var mapObjects = getObjects(8);

//  END Создайте массив, состоящий из 8 сгенерированных JS объектов


//  На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте

var createDOMElement = function (el) {
  return el.content;
};

var map = document.querySelector('section.map');

//  Заполнение меток данными из массива
var mapBalloonTemplate = createDOMElement(document.querySelector('#map-balloon-template'));
var PIN_HEIGHT = 70;

//  Заполнение объявления данными из массива

var showCard = function (obj) {
  var mapCardElement = createDOMElement(document.querySelector('#map-card-template')).querySelector('.map__card').cloneNode(true);
  mapCardElement.querySelector('h3').textContent = obj.offer.title;
  mapCardElement.querySelector('p > small').textContent = obj.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = obj.offer.price + ' \u20BD /ночь';
  mapCardElement.querySelector('h4').textContent = offerTypeRU(obj.offer.type);
  mapCardElement.querySelector('h4 + p').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);
  mapCardElement.querySelector('.popup__features + p').textContent = obj.offer.description;

  var oldFeatures = mapCardElement.querySelector('.popup__features');
  var newFeatures = oldFeatures.cloneNode();
  for (var i = 0; i < obj.offer.features.length; i++) {
    var liElementFeatures = document.createElement('li');
    liElementFeatures.className = 'feature feature--' + obj.offer.features[i];
    newFeatures.appendChild(liElementFeatures);
  }

  mapCardElement.replaceChild(newFeatures, oldFeatures);

  var oldPictures = mapCardElement.querySelector('.popup__pictures');
  var newPictures = oldPictures.cloneNode();


  for (var k = 0; k < obj.offer.photos.length; k++) {
    var liElementPhotos = document.createElement('li');
    var imageElement = document.createElement('img');
    imageElement.src = obj.offer.photos[k];
    imageElement.width = 100;
    imageElement.height = 75;
    liElementPhotos.appendChild(imageElement);
    newPictures.appendChild(liElementPhotos);
  }
  mapCardElement.replaceChild(newPictures, oldPictures);
  map.appendChild(mapCardElement);
  mapCardElement.querySelector('.popup__close').addEventListener('click', removeCard);

};

var disableActivePin = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};
var removeCard = function () {
  var oldCard = map.querySelector('.popup');
  if (oldCard) {
    map.removeChild(oldCard);
  }
};


var onEscKeydown = function (evt) {
  if (evt.keyCode === 27) {
    removeCard();
    disableActivePin();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

var onClickPin = function (obj) {

  return function (evt) {
    var target = evt.currentTarget;
    disableActivePin();
    target.classList.add('map__pin--active');
    removeCard();
    showCard(obj);
    document.addEventListener('keydown', onEscKeydown);
  };
};

var getPinElement = function (obj) {
  var mapBalloonElement = mapBalloonTemplate.querySelector('.map__pin').cloneNode(true);
  mapBalloonElement.style.left = obj.location.x + 'px';
  mapBalloonElement.style.top = (obj.location.y - (PIN_HEIGHT / 2)) + 'px';
  mapBalloonElement.title = 'My title';
  mapBalloonElement.querySelector('img').src = obj.author.avatar;

  mapBalloonElement.addEventListener('click', onClickPin(obj));

  return mapBalloonElement;
};

//  END На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте

var noticeForm = document.querySelector('.notice__form');
var formElementInput = document.querySelectorAll('.notice__form input');
var formElementTextarea = document.querySelectorAll('.notice__form textarea');
var formElementSelect = document.querySelectorAll('.notice__form select');
var formElementButton = document.querySelectorAll('.notice__form button');

var mapPinMain = document.querySelector('.map__pin--main');

//  Делаем из выбранных ДОМ элементов массив
var nodeListToArray = function (myNodeList) {
  var arr = [];
  for (var i = 0; i < myNodeList.length; i++) {
    var item = myNodeList[i];
    arr.push(item);
  }
  return arr;
};

//  Объединяем несколько выбранных групп элементов в массив
var getArrOfFormElement = function () {
  var myArr = [];
  for (var i = 0; i < arguments.length; i++) {
    var nodeListArr = nodeListToArray(arguments[i]);
    myArr = myArr.concat(nodeListArr);
  }
  return myArr;
};

//  Получаем все элементы, которые надо активировать/дезактивировать
var ArrOfFormElement = getArrOfFormElement(formElementInput, formElementTextarea, formElementSelect, formElementButton);

//  Функция переключения элементов форм из неактивного состояния в активное и обратно
var toggleDisableElement = function (arr, state) {
  var i;
  if (state) {
    for (i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  } else {
    for (i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  }
};

//  Выключаем все элементы формы при первом запуске
toggleDisableElement(ArrOfFormElement, true);

var noticeFormAddress = document.querySelector('#address');
noticeFormAddress.value = '375, ' + window.outerWidth / 2;

var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var pinElement = getPinElement(arr[i]);
    fragment.appendChild(pinElement);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  toggleDisableElement(ArrOfFormElement);
  noticeFormAddress.value = '429.5, ' + window.outerWidth / 2;
  renderPins(mapObjects);
});
