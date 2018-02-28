'use strict';

//  Модуль для фильтра по объектам на карте

(function () {

  var offerType = document.querySelector('#housing-type').value;
  var offerPrice = document.querySelector('#housing-price').value;
  var offerRooms = document.querySelector('#housing-rooms').value;
  var offerGuests = document.querySelector('#housing-guests').value;
  var offerFeatures = [];

  document.querySelector('#housing-type').addEventListener('change', function () {
    offerType = document.querySelector('#housing-type').value;
    window.debounce(updatePins);
  });

  document.querySelector('#housing-price').addEventListener('change', function () {
    offerPrice = document.querySelector('#housing-price').value;
    window.debounce(updatePins);
  });

  document.querySelector('#housing-rooms').addEventListener('change', function () {
    offerRooms = document.querySelector('#housing-rooms').value;
    window.debounce(updatePins);
  });

  document.querySelector('#housing-guests').addEventListener('change', function () {
    offerGuests = document.querySelector('#housing-guests').value;
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
        if (it.offer.price < 10000) {
          simplePrice = 'low';
        } else if (it.offer.price > 50000) {
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
    window.renderPins(uniquePins, 5);
  };

})();
