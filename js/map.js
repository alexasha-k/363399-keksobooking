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

  var noticeFormAddress = document.querySelector('#address');
  noticeFormAddress.value = '375, ' + window.outerWidth / 2;

  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    toggleDisableElement();
    noticeFormAddress.readOnly = true;
    noticeFormAddress.value = '429.5, ' + window.outerWidth / 2;
    window.renderPins(window.mapObjects);
  });
})();
