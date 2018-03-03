'use strict';

//  Модуль для фильтра по объектам на карте

(function () {

  var NUMBER_OF_PINS = 5;
  var LOW_PRICE_MAX = 10000;
  var HIGH_PRICE_MIN = 50000;
  var noticeFormFilters = document.querySelector('.map__filters');
  var offerTypeInput = noticeFormFilters.querySelector('#housing-type');
  var offerType = offerTypeInput.value;
  var offerPriceInput = noticeFormFilters.querySelector('#housing-price');
  var offerPrice = offerPriceInput.value;
  var offerRoomsInput = noticeFormFilters.querySelector('#housing-rooms');
  var offerRooms = offerRoomsInput.value;
  var offerGuestsInput = noticeFormFilters.querySelector('#housing-guests');
  var offerGuests = offerGuestsInput.value;
  var offerFeatures = [];

  offerTypeInput.addEventListener('change', function () {
    offerType = offerTypeInput.value;
    window.debounce(updatePins);
  });

  offerPriceInput.addEventListener('change', function () {
    offerPrice = offerPriceInput.value;
    window.debounce(updatePins);
  });

  offerRoomsInput.addEventListener('change', function () {
    offerRooms = offerRoomsInput.value;
    window.debounce(updatePins);
  });

  offerGuestsInput.addEventListener('change', function () {
    offerGuests = offerGuestsInput.value;
    window.debounce(updatePins);
  });

  var offerFeatureInputs = document.querySelectorAll('#housing-features input');

  for (var i = 0; i < offerFeatureInputs.length; i++) {
    offerFeatureInputs[i].addEventListener('change', function (evt) {
      var target = evt.target;
      var offerFeature = target.value;
      if (target.checked) {
        offerFeatures.push(offerFeature);
      } else {
        var id = offerFeatures.indexOf(offerFeature);
        offerFeatures.splice(id, 1);
      }
      window.debounce(updatePins);
    });
  }

  var updatePins = function () {
    var uniquePins = window.mapObjects;
    if (offerType !== 'any') {
      uniquePins = uniquePins.filter(function (it) {
        return it.offer.type === offerType;
      });
    }

    if (offerRooms !== 'any') {
      uniquePins = uniquePins.filter(function (it) {
        return it.offer.rooms === +offerRooms;
      });
    }

    if (offerRooms !== 'any') {
      uniquePins = uniquePins.filter(function (it) {
        return it.offer.rooms === +offerRooms;
      });
    }

    if (offerGuests !== 'any') {
      uniquePins = uniquePins.filter(function (it) {
        return it.offer.guests === +offerGuests;
      });
    }

    if (offerPrice !== 'any') {
      uniquePins = uniquePins.filter(function (it) {
        var simplePrice;
        if (it.offer.price < LOW_PRICE_MAX) {
          simplePrice = 'low';
        } else if (it.offer.price > HIGH_PRICE_MIN) {
          simplePrice = 'high';
        } else {
          simplePrice = 'middle';
        }
        return simplePrice === offerPrice;
      });
    }

    if (offerFeatures.length) {
      uniquePins = uniquePins.filter(function (it) {
        for (i = 0; i < offerFeatures.length; i++) {
          if (it.offer.features.indexOf(offerFeatures[i]) === -1) {
            return false;
          }
        }
        return it;
      });
    }
    window.clearPins();
    window.map.removeCard();
    window.renderPins(uniquePins, NUMBER_OF_PINS);
  };

})();
