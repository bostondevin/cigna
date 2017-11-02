const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ntlm = require('express-ntlm');


app.use(ntlm());


app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.json(req.ntlm);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(4201, function(){
  console.log('Cigna API listening on port 4201!');
});
