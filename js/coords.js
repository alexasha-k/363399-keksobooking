'use strict';

// Модуль для перемещения меткт по карте
(function () {

  var MAIN_PIN_HEIGHT = 87;
  var RESTRICTION_COORDS_TOP = 150;
  var RESTRICTION_COORDS_BOTTOM = 500;
  var map = document.querySelector('section.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeFormAddress = document.querySelector('#address');

  window.getNewCoords = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var newCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var maxCoord = {
      x: map.offsetWidth,
      y: RESTRICTION_COORDS_BOTTOM - (MAIN_PIN_HEIGHT / 2)
    };

    var minCoord = {
      x: 0,
      y: RESTRICTION_COORDS_TOP - (MAIN_PIN_HEIGHT / 2)
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
      noticeFormAddress.value = newCoord.x + ', ' + (newCoord.y + (MAIN_PIN_HEIGHT / 2));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      noticeFormAddress.value = newCoord.x + ', ' + (newCoord.y + (MAIN_PIN_HEIGHT / 2));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

})();
