'use strict';

//  Общие вспомагательные функции

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

  // Функция для вывода информационных сообщений

  window.showStatusMessage = function (message) {
    var body = document.querySelector('body');
    var responseMessage = document.createElement('div');
    responseMessage.classList.add('response-message');
    responseMessage.textContent = message;
    body.appendChild(responseMessage);
    setTimeout(function () {
      body.removeChild(responseMessage);
    }, 3000);
  };

})();
