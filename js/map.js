'use strict';

//  Модуль, который управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку, отрисовывает пины и
//  осуществляет взаимодействие карточки и метки на карте.

(function () {

  var ESCAPE_KEY = 27;
  var START_PIN_COORDS_Y = 375;
  var START_PIN_COORDS_X = (window.outerWidth / 2);

  var map = document.querySelector('section.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

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
      if (evt.keyCode === ESCAPE_KEY) {
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

  //  Выключаем все элементы формы подбора подходящего объявления при первом запуске
  var toggleMapFiltersSelects = function (state) {
    var mapFiltersSelects = document.querySelectorAll('.map__filters select');
    for (var i = 0; i < mapFiltersSelects.length; i++) {
      mapFiltersSelects[i].disabled = state;
    }
  };

  toggleMapFiltersSelects(true);

  // Устанавливаем начальное значение адреса
  var noticeFormAddress = document.querySelector('#address');
  noticeFormAddress.value = START_PIN_COORDS_X + ', ' + START_PIN_COORDS_Y;

  var startMap = function () {
    window.mapObjects = [];
    window.load(function (data) {
      window.mapObjects = data;
      window.renderPins(window.mapObjects, 5);
      toggleMapFiltersSelects();
    });
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    toggleDisableElement();
    noticeFormAddress.readOnly = true;
    window.renderPins(window.mapObjects);
    mapPinMain.removeEventListener('mousemove', startMap);
  };

  window.closeMap = function () {
    window.map.removeCard();
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    toggleDisableElement(true);
    noticeFormAddress.value = START_PIN_COORDS_X + ', ' + START_PIN_COORDS_Y;
    mapPinMain.style.top = START_PIN_COORDS_Y + 'px';
    mapPinMain.style.left = '';
    toggleMapFiltersSelects(true);
  };

  //  Обработчики mousemove и mouseup должны добавляться только при вызове обработчика mousedown
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      startMap();
      window.getNewCoords(evt);
    }
    window.getNewCoords(evt);
  });

})();
