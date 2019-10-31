function myajax(opts) {

    var defs = {
        type: 'get',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (resData, xhr) {
            console.log('进入了默认的成功函数');
        },
        error: function (resData, xhr) {
            console.log('进入了默认的错误函数，发生错误了', resData, xhr);
        }
    };

    opts = Object.assign(defs, opts);

    var paramsStr = '';
    for (var attr in opts.data) {
        paramsStr += '&' + attr + '=' + opts.data[attr]
    }
    paramsStr = paramsStr.substring(1);

    var xhr = new XMLHttpRequest();

    if (opts.type == 'get') {
        opts.url = opts.url + '?' + paramsStr;
    }

    xhr.open(opts.type, opts.url);
    // 在服务端响应完成的时候触发
    xhr.onload = function () {
        var httpStateCode = xhr.status;
        if (httpStateCode == 200) {
            var resData = xhr.responseText;
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType.includes('application/json')) {
                resData = JSON.parse(resData);
            }
            opts.success(resData, xhr);
        } else {
            opts.error(resData, xhr);
        }
    };
    xhr.onerror = function () {
        opts.error('断网了', xhr);
    };
    if (opts.type == 'post') {
        var contentType = opts.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        if (contentType.includes('application/json')) {
            paramsStr = JSON.stringify(opts.data);
        }
        xhr.send(paramsStr);
    } else {
        xhr.send();
    }
}