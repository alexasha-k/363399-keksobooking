'use strict';

//  Модуль, который отвечает за создание пина — метки на карте.

(function () {

  var PIN_HEIGHT = 70;
  var mapBalloonTemplate = document.querySelector('#map-balloon-template').content;

  var onClickPin = function (obj) {
    return function (evt) {
      var target = evt.currentTarget;
      window.map.disableActivePin();
      target.classList.add('map__pin--active');
      window.map.removeCard();
      window.showCard(obj);
      document.addEventListener('keydown', window.map.onEscKeydown);
    };
  };

  var getPinElement = function (obj) {
    var mapBalloonElement = mapBalloonTemplate.querySelector('.map__pin').cloneNode(true);
    mapBalloonElement.style.left = obj.location.x + 'px';
    mapBalloonElement.style.top = (obj.location.y - (PIN_HEIGHT / 2)) + 'px';
    mapBalloonElement.title = obj.offer.title;
    mapBalloonElement.querySelector('img').src = obj.author.avatar;
    mapBalloonElement.addEventListener('click', onClickPin(obj));

    return mapBalloonElement;
  };

  window.renderPins = function (arr, num) {
    var fragment = document.createDocumentFragment();
    if (!num || num > arr.length) {
      num = arr.length;
    }
    for (var i = 0; i < num; i++) {
      var pinElement = getPinElement(arr[i]);
      fragment.appendChild(pinElement);
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.clearPins = function () {
    var childs = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < childs.length; i++) {
      document.querySelector('.map__pins').removeChild(childs[i]);
    }
  };

})();
