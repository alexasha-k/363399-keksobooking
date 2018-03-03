'use strict';

//  Модуль, который работает с формой объявления

(function () {
  //  Форма отправки данных

  var MIN_PRICE_OF_TYPE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var noticeForm = document.querySelector('.notice__form');
  var formElementTitle = noticeForm.querySelector('.form__element #title');
  var formElementType = noticeForm.querySelector('.form__element #type');
  var formElementPrice = noticeForm.querySelector('.form__element #price');
  var formElementTimein = noticeForm.querySelector('.form__element #timein');
  var formElementTimeout = noticeForm.querySelector('.form__element #timeout');
  var formElementRoomNumber = noticeForm.querySelector('.form__element #room_number');
  var formElementCapacity = noticeForm.querySelector('.form__element #capacity');

  //  ms edge не понимает значение formElementTitle.minlength
  var minLengthValue = formElementTitle.getAttribute('minlength');

  //  Валидация минимальный длины заголовка объявления для Edge

  formElementTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < minLengthValue) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из ' + minLengthValue + ' символов');
    }
    target.setCustomValidity('');
  });

  //  Установить минимальную цену в зависимости от типа помещения
  formElementType.addEventListener('change', function (evt) {
    var target = evt.target;
    formElementPrice.min = MIN_PRICE_OF_TYPE[target.value];
  });

  //  Валидация цены помещения и кастомное сообщение об ошибке

  formElementPrice.addEventListener('invalid', function () {
    if (formElementPrice.validity.rangeUnderflow) {
      formElementPrice.setCustomValidity('Для выбранного типа жилья минимальная стоимость составляет ' + formElementPrice.min);
    } else if (formElementPrice.validity.rangeOverflow) {
      formElementPrice.setCustomValidity('Максимальная стоимость составляет 1000000');
    }

    formElementPrice.setCustomValidity('');
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
  var roomNumberCapacityChangeHandler = function (evt) {
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

  formElementCapacity.addEventListener('change', roomNumberCapacityChangeHandler);
  formElementRoomNumber.addEventListener('change', roomNumberCapacityChangeHandler);

  // Функция сброса формы
  var resetForm = function () {
    noticeForm.reset();
    window.resetAvatar();
    window.clearDropZone();
    window.clearPins();
    window.closeMap();
  };

  //  Кнопка reset
  var resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  // Кнопка отправки данных формы
  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), function () {
      window.showStatusMessage('Вы успешно отправили объявление');
    }, function (response) {
      window.showStatusMessage('Ваше объявление не было отправлено(' + response + ')');
    });
    resetForm();
    evt.preventDefault();
  });

})();
