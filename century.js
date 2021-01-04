//Express
var express = require('express');
// Session
var session = require('express-session');
// template
var pug = require('pug');
// CookieParser
var cookie = require('cookie');





// Create app
var app = express();


// Creation du serveur
let server = app.listen(8333,"192.168.1.14", listen);

// Websocket
var io = require('socket.io')(server);



// Class century
var ALLPlayersClass = require('./server/ALLPlayersClass')
var ALLPlayers = new ALLPlayersClass.ALLPlayers();


function listen(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Century Server Started at http://' + host + ':' + port);
}

// Create secret
// app.use(session({
//   secret: 'ssshhhhh',
//   resave: false,
//   saveUninitialized: true
//   // cookie: { secure: true }
// }));


// the directory where the template files are located
//app.set('views', './views')
//the template engine to use
//app.set('view engine', 'pug')

/* 
app.get('/', function(req, res){
  
  console.log ('sessionID : ' +req.sessionID)
  // teste si session existe :
  //ALLPlayers.createPlayer(req.sessionID);
  // res.cookie('name', 'express').send('cookie set'); //Sets name = express
  // console.log (ALLPlayers);
  
  if(req.session.know){
     //deja connue
     // req.session.page_views++;
     res.render('index', { title: 'Century', message: "Votre pseudo c'est : ...."})
  } else {
    // 1er Visite
     req.session.know = true;
     res.render('index', { title: 'Century', message: "C'est votre premier visite et on ne connais pas votre pseudo !"})
    //  res.send("Welcome to this page for the first time!");
  }
  //  res.render('index', { title: 'Hey', message: 'You visited this page ' + req.session.page_views + ' times '})

});
*/

//app.use('/js', express.static('public/js'));
//app.use('/css', express.static('public/css'));

// Files for client
app.use(express.static('public')) 




// Objects to keep track of sockets, rooms and players
// let CLIENT_LIST = {};
// let ROOM_LIST = {};
// let PLAYER_LIST = {};
// var messages = [];
/* 
var socket = io.listen(app, {
  flashPolicyServer: false,
  transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
}); */




// Quand une personne se connecte au serveur
io.on('connection', function(socket) {

    // ConnectID => socket.id
    cid = socket.id;
    message = 'socket.id : ' + cid;
    console.log (message);
    //SessionID => socket.handshake.headers.cookie
    sid = cookie.parse (socket.handshake.headers.cookie)['connect.sid'].substr(2, 32)
    message = '      sid : ' + sid
    console.log (message);
  
    //io.emit('message', {pseudo:"SRV", msg:message})
    
}); 

// s%3A3GD66p3jQc80CgVjoh2966bQg7fx7EkW

// // Quand une personne se connecte au serveur
// io.sockets.on('connection', function (socket) {

// 	// On donne la liste des messages (evenement cree du cote client)
//   socket.emit('recupererMessages', messages);
  
//   //on efface les message
//   socket.emit('menageMessage', function () {
//     messages = [];
//     socket.emit('recupererMessages', messages);
//   });
// 	// Quand on recoit un nouveau message
// 	socket.on('nouveauMessage', function (mess) {
// 		// On l'ajout au tableau (variable globale commune a tous les clients connectes au serveur)
// 		messages.push(mess);
// 		console.log (mess);
// 		// On envoie a tout les clients connectes (sauf celui qui a appelle l'evenement) le nouveau message
//     socket.broadcast.emit('recupererNouveauMessage', mess);
// 	});
// });