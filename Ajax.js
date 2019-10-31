function getAjax(options) {
    var defaults = {
        information: {},
        method: 'get',
        url: '',
        geshi: 'x-www-form-urlencoded',
        success: function () {},
        error: function () {}
    }
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var attr in defaults.information) {
        params += attr + '=' + defaults.information[attr] + '&'
    }
    params = params.substring(0, params.length - 1);

    if (defaults.method == 'get') {
        xhr.open(defaults.method, defaults.url + '?' + params);
        xhr.send();
    } else if (defaults.method == 'post') {
        xhr.open(defaults.method, defaults.url)
        if (defaults.geshi == 'json') {
            xhr.setRequestHeader('Content-Type', 'application/' + defaults.geshi);
            var cs = JSON.stringify(options.information);
            xhr.send(cs);
        } else if (defaults.geshi == 'x-www-form-urlencoded') {
            xhr.setRequestHeader('Content-Type', 'application/' + defaults.geshi)
            xhr.send(params)
        }
    }

    xhr.onload = function () {
        var dataType = xhr.getResponseHeader('Content-Type')
        var responseText = xhr.responseText
        if (dataType.includes('json')) {
            responseText = JSON.parse(responseText);
        }

        // if (responseText.code == '1001') {
        //     defaults.success();
        // }else {
        //     defaults.error()
        // }

        // if() {

        // }
        if (xhr.status == 200) {
            defaults.success(responseText);
        } else {
            defaults.error(responseText);
        }

    };
    xhr.onerror = function () {
        defaults.error(xhr);
    }

};