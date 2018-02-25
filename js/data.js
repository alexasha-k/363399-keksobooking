'use strict';

//  Модуль, который создает данные

(function () {

  //  Перевод для вывода типа объектов
  window.offerTypeRU = function (el) {
    switch (el) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'house': return 'Дом';
      default: return 'Другой тип';
    }
  };

})();
