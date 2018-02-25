'use strict';

//  Модуль, который управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку, отрисовывает пины и
//  осуществляет взаимодействие карточки и метки на карте.

(function () {

  var map = document.querySelector('section.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.map = {
    disableActivePin: function () {
      var activePin = document.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    },
    removeCard: function () {
      var oldCard = map.querySelector('.popup');
      if (oldCard) {
        map.removeChild(oldCard);
      }
    },
    onEscKeydown: function (evt) {
      if (evt.keyCode === 27) {
        window.map.removeCard();
        window.map.disableActivePin();
        document.removeEventListener('keydown', window.map.onEscKeydown);
      }
    }
  };

  //  Функция переключения элементов форм из неактивного состояния в активное и обратно
  var toggleDisableElement = function (state) {
    var allFieldSets = document.querySelectorAll('fieldset');
    for (var i = 0; i < allFieldSets.length; i++) {
      allFieldSets[i].disabled = state;
    }
  };

  //  Выключаем все элементы формы при первом запуске
  toggleDisableElement(true);

  //  Drag and drop events

  var noticeFormAddress = document.querySelector('#address');
  noticeFormAddress.value = '375, ' + window.outerWidth / 2;

  var startMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    toggleDisableElement();
    noticeFormAddress.readOnly = true;
    noticeFormAddress.value = '429.5, ' + window.outerWidth / 2;
    window.renderPins(window.mapObjects);
    mapPinMain.removeEventListener('mousemove', startMap);
  };

  //  Обработчики mousemove и mouseup должны добавляться только при вызове обработчика mousedown
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      mapPinMain.addEventListener('mousemove', startMap);
    } else {

      evt.preventDefault();
      var MAIN_PIN_WIDTH = 65;
      var MAIN_PIN_HEIGHT = 87;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var newCoord = {
        x: evt.clientX,
        y: evt.clientY
      };

      var maxCoord = {
        x: map.offsetLeft + map.offsetWidth - (MAIN_PIN_WIDTH / 2),
        y: 500 - (MAIN_PIN_HEIGHT / 2)
      };

      var minCoord = {
        x: map.offsetLeft - (MAIN_PIN_WIDTH / 2),
        y: 150 - (MAIN_PIN_HEIGHT / 2)
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        //  Задаем ограничения по Y
        if (mapPinMain.offsetTop - shift.y >= maxCoord.y) {
          newCoord.y = maxCoord.y;
        } else if (mapPinMain.offsetTop - shift.y <= minCoord.y) {
          newCoord.y = minCoord.y;
        } else {
          newCoord.y = mapPinMain.offsetTop - shift.y;
        }

        //  Задаем ограничения по X
        if (mapPinMain.offsetLeft - shift.x >= maxCoord.x) {
          newCoord.x = maxCoord.x;
        } else if (mapPinMain.offsetLeft - shift.x <= minCoord.x) {
          newCoord.x = minCoord.x;
        } else {
          newCoord.x = mapPinMain.offsetLeft - shift.x;
        }

        //  Задаем новые координаты метки и записываем координаты в поле адреса
        mapPinMain.style.top = newCoord.y + 'px';
        mapPinMain.style.left = newCoord.x + 'px';
        noticeFormAddress.value = (newCoord.y + (MAIN_PIN_HEIGHT / 2)) + ', ' + newCoord.x;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        noticeFormAddress.value = (newCoord.y + (MAIN_PIN_HEIGHT / 2)) + ', ' + newCoord.x;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
