define(function (require) {
    function Ajax(method, url, success, error) {
        var isPromise = typeof success === "function"?false:true;
        var request = new XMLHttpRequest();


        function ajax() {
            request.open(method, url);
            request.onreadystatechange = function () {
                if (this.request.readyState === 4) {
                    if (this.request.status === 200) {
                        success.call(null, request.responseText);
                    } else {
                        error.call(null);
                    }
                }
            }
        }

        ajax.prototype.send = function (data) {
            request.send(data);
            if (isPromise) {
                return new Promise(function (revolve, reject) {
                    request.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                revolve(this.responseText);
                            } else {
                                reject();
                            }
                        }
                    }
                })
            } else {
                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            success.call(null, this.responseText);
                        } else {
                            if (typeof error === "function") {
                                error.call(null);
                            }
                        }
                    }
                }
            }

        };
        ajax.prototype.setRequestHeader = function () {
            if (typeof arguments[0] === "string") {
                request.setRequestHeader(arguments[0], arguments[1]);
            } else if (typeof arguments[0] === "object") {
                var dict = arguments[0];
                for (var i in dict) {
                    request.setRequestHeader(i, dict[i]);
                }
            }
        }

        return new ajax();

    }

    return {
        Ajax:Ajax
    }
})