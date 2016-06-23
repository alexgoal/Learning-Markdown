var request = require('request');

var options = {
    url: 'http://127.0.0.1:8888/hello/world?a=1',
    method: 'POST',
    timeout: 5000,
    json: true,
    body: {hello: "world"},
    //form: {'body': JSON.stringify({hello: "world"})},
    //strictSSL: false,
    headers: {
        //'Content-Type': 'text/plain; charset=utf-8',
        //'dest': 'http://www.zhihu.com'
        'Accept': 'text/plain'
    }
};

request(options, function (error, response, body) {
    if (error) {
        console.log(error);
        return;
    }

    console.log(body);
});