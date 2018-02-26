'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.notice__preview img');

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
    }
  });


  fileChooser.addEventListener('change', function () {
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
  });

  var objectFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var objectPreview = document.querySelector('.form__photo-container');

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
        newImg.height = '70';
        newImg.src = reader.result;

        objectPreview.appendChild(newImg);
      });

      reader.readAsDataURL(file);
    }
  });

  objectFileChooser.addEventListener('change', function () {
    var file = objectFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newImg = document.createElement('img');
        newImg.height = '70';
        newImg.src = reader.result;

        objectPreview.appendChild(newImg);
      });

      reader.readAsDataURL(file);
    }
  });
})();
