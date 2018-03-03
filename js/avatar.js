'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_AVATAR_DEFAULT_SRC = 'img/muffin.png';
  var FORM_IMAGE_HEIGHT = '70';

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.notice__preview img');

  window.resetAvatar = function () {
    preview.src = PREVIEW_AVATAR_DEFAULT_SRC;
  };

  var dropZone = document.querySelector('.drop-zone');
  var draggedItem = null;
  dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    draggedItem = evt.dataTransfer;
    var file = draggedItem.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.showStatusMessage('Неверный формат файла');
    }

  });

  var uploadFile = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };


  fileChooser.addEventListener('change', uploadFile);

  var objectFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var objectPreview = document.querySelector('.form__photo-container');

  window.clearDropZone = function () {
    var child = objectPreview.querySelectorAll('img');
    for (var i = 0; i < child.length; i++) {
      objectPreview.removeChild(child[i]);
    }
  };

  var objectDropZone = document.querySelector('.form__photo-container .drop-zone');
  objectDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  objectDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    draggedItem = evt.dataTransfer;
    var file = draggedItem.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newImg = document.createElement('img');
        newImg.height = FORM_IMAGE_HEIGHT;
        newImg.src = reader.result;

        objectPreview.appendChild(newImg);
      });

      reader.readAsDataURL(file);
    } else {
      window.showStatusMessage('Неверный формат файла');
    }

  });

  var objectFileChooserChangeHandler = function () {
    var file = objectFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newImg = document.createElement('img');
        newImg.height = FORM_IMAGE_HEIGHT;
        newImg.src = reader.result;

        objectPreview.appendChild(newImg);
      });

      reader.readAsDataURL(file);
    }
  };

  objectFileChooser.addEventListener('change', objectFileChooserChangeHandler);

})();
