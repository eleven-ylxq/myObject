function getFormData(options) {
    var parameter = document.querySelector(options.tagId);
    var form = new FormData(parameter);
    console.log(form);
    var xhr = new XMLHttpRequest();
    xhr.open('post', options.url);
    xhr.send(form);
    xhr.onload = function () {
        options.success(xhr.responseText);
    }
} 