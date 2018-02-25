'use strict';

//  Модуль, который работает с формой объявления

(function () {
  //  Форма отправки данных

  var noticeForm = document.querySelector('.notice__form');
  var formElementTitle = document.querySelector('.form__element #title');
  var formElementType = document.querySelector('.form__element #type');
  var formElementPrice = document.querySelector('.form__element #price');
  var formElementTimein = document.querySelector('.form__element #timein');
  var formElementTimeout = document.querySelector('.form__element #timeout');
  var formElementRoomNumber = document.querySelector('.form__element #room_number');
  var formElementCapacity = document.querySelector('.form__element #capacity');
  var minLengthValue = formElementTitle.minLength;

  //  Валидация минимальный длины заголовка объявления для Edge
  formElementTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < minLengthValue) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из ' + minLengthValue + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });

  //  Установить минимальную цену в зависимости от типа помещения
  formElementType.addEventListener('change', function (evt) {
    var target = evt.target;
    switch (target.value) {
      case 'bungalo':
        formElementPrice.min = 0;
        break;
      case 'flat':
        formElementPrice.min = 1000;
        break;
      case 'house':
        formElementPrice.min = 5000;
        break;
      case 'palace':
        formElementPrice.min = 10000;
        break;
      default: formElementPrice.min = 0;
    }
  });

  //  Валидация цены помещения и кастомное сообщение об ошибке
  formElementPrice.addEventListener('invalid', function () {
    if (formElementPrice.validity.rangeUnderflow) {
      formElementPrice.setCustomValidity('Для выбранного типа жилья минимальная стоимость составляет ' + formElementPrice.min);
    } else if (formElementPrice.validity.rangeOverflow) {
      formElementPrice.setCustomValidity('Максимальная стоимость составляет 1000000');
    } else {
      formElementPrice.setCustomValidity('');
    }
  });

  //  Чтобы время заезда и выезда были одинаковыми
  formElementTimein.addEventListener('change', function () {
    formElementTimeout.value = formElementTimein.value;
  });

  formElementTimeout.addEventListener('change', function () {
    formElementTimein.value = formElementTimeout.value;
  });

  //  Зависимость количества комнат от количества гостей
  //  Определила значения, чтобы они были видны одному инпуту при изменении другого инпута
  var roomNumberValue = formElementRoomNumber.value;
  var capacityValue = formElementCapacity.value;

  //  Функция
  //  Пришлось с каждого инпута удалять setCustomValidity, чтобы при ошибке на одном элементе
  //  можно было менять другой для валидного значения
  var setRoomNumberCapacityValidity = function (evt) {
    var target = evt.target;
    roomNumberValue = formElementRoomNumber.value;
    capacityValue = formElementCapacity.value;
    if ((+roomNumberValue === 100 && +capacityValue !== 0) || (+capacityValue === 0 && +roomNumberValue !== 100)) {
      target.setCustomValidity('Недопустимое значение');
    } else if (+roomNumberValue < +capacityValue) {
      target.setCustomValidity('Количество гостей не должно быть больше количества комнат');
    } else {
      formElementCapacity.setCustomValidity('');
      formElementRoomNumber.setCustomValidity('');
    }
  };

  formElementCapacity.addEventListener('change', setRoomNumberCapacityValidity);
  formElementRoomNumber.addEventListener('change', setRoomNumberCapacityValidity);

  //  Кнопка сброса полей формы и возврата метки в первоначальное состояние
  var resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
    window.clearPins();
    window.closeMap();
  });

  noticeForm.addEventListener('submit', function (evt) {
    var body = document.querySelector('body');

    window.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
      window.clearPins();
      window.closeMap();

      var responseMessage = document.createElement('div');
      responseMessage.classList.add('response-message');
      responseMessage.textContent = 'Вы успешно отправили объявление';
      body.appendChild(responseMessage);
      setTimeout(function () {
        body.removeChild(responseMessage);
      }, 3000);

    }, function (response) {
      var responseMessage = document.createElement('div');
      responseMessage.classList.add('response-message');
      responseMessage.textContent = 'Ваше объявление не было отправлено(' + response + ')';
      body.appendChild(responseMessage);
      setTimeout(function () {
        body.removeChild(responseMessage);
      }, 3000);
    });
    evt.preventDefault();
  });

})();
