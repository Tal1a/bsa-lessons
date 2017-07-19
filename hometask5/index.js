const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const chat = require("./server")(io);

const staticPath = path.normalize(__dirname + '/public');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 1428;
http.listen(port, function () {
    console.log("Server listening at port %d", port);
});



