'use strict';

//  Общие вспомагательные функции

(function () {

  var STATUS_MESSAGE_TIMEOUT = 3000;

  //  Перевод для вывода типа объектов
  window.offerTypeRU = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
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
    }, STATUS_MESSAGE_TIMEOUT);
  };

})();
