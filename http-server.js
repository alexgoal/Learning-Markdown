var express = require('express');
var app = express();
var http = require('http');
var URL = require('url');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var bodyParser = require('body-parser');

proxy.on('error', function (err, req, res) {
    log.warn('http proxy err:', err);
    res.status(404).send('Http proxy error occurred!');
});

app.use(bodyParser.text({type: 'text/*'}));
app.use(bodyParser.text({type: 'application/*'}));

app.all('/*', function (req, res) {
    var body = req.body;
    res.send({a: "success"});
    //res.send('{a: "success"}');
    return;
    var target = req.headers['dest'];

    if (!target) {
        res.status(404).send('Need dest in request headers');
        return;
    }

    if (target.indexOf('://') == -1) {
        target = 'http://' + target;
    }

    var targetHost = URL.parse(target).host;
    req.headers.host = targetHost;

    proxy.web(req, res, {target: target, secure: false, xfwd: true});
    //res.send('success');
});


var server = http.createServer(app);

server.listen(8888, function () {
    console.log('Express server listening on port 8888');
});