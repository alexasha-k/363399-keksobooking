'use strict';

//  Модуль, который отвечает за создание карточки объявлений.

(function () {

  var CARD_IMAGE_HEIGHT = 50;
  var CARD_IMAGE_WIDTH = 66.66;
  var map = document.querySelector('section.map');

  window.showCard = function (obj) {
    var mapCardElement = document.querySelector('#map-card-template').content.querySelector('.map__card').cloneNode(true);
    mapCardElement.querySelector('h3').textContent = obj.offer.title;
    mapCardElement.querySelector('p > small').textContent = obj.offer.address;
    mapCardElement.querySelector('.popup__price').textContent = obj.offer.price + ' \u20BD /ночь';
    mapCardElement.querySelector('h4').textContent = window.offerTypeRU[obj.offer.type];
    mapCardElement.querySelector('h4 + p').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    mapCardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);
    mapCardElement.querySelector('.popup__features + p').textContent = obj.offer.description;

    var oldFeatures = mapCardElement.querySelector('.popup__features');
    var newFeatures = oldFeatures.cloneNode();

    obj.offer.features.forEach(function (item) {
      var liElementFeatures = document.createElement('li');
      liElementFeatures.className = 'feature feature--' + item;
      newFeatures.appendChild(liElementFeatures);
    });

    mapCardElement.replaceChild(newFeatures, oldFeatures);

    var oldPictures = mapCardElement.querySelector('.popup__pictures');
    var newPictures = oldPictures.cloneNode();

    obj.offer.photos.forEach(function (item) {
      var liElementPhotos = document.createElement('li');
      var imageElement = document.createElement('img');
      imageElement.src = item;
      imageElement.width = CARD_IMAGE_WIDTH;
      imageElement.height = CARD_IMAGE_HEIGHT;
      liElementPhotos.appendChild(imageElement);
      newPictures.appendChild(liElementPhotos);
    });

    mapCardElement.replaceChild(newPictures, oldPictures);
    map.appendChild(mapCardElement);
    mapCardElement.querySelector('.popup__close').addEventListener('click', window.map.removeCard);
  };

})();
