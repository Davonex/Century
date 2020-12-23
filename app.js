
var express = require('express');

// Create app
var app = express();

// Creation du serveur
let server = app.listen(8333,"192.168.1.14", listen);

function listen(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Century Server Started at http://' + host + ':' + port);
}

// Files for client
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
  res.render('./public/index.html');
});

 
// Websocket
let io = require('socket.io')(server);
// io = io.listen(server); 



// Objects to keep track of sockets, rooms and players
let CLIENT_LIST = {};
let ROOM_LIST = {};
let PLAYER_LIST = {};
var messages = [];
/* 
var socket = io.listen(app, {
  flashPolicyServer: false,
  transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
}); */




/* // Quand une personne se connecte au serveur
io.on('connection', function(client) {

    console.log ('Un client est connecté : ' + client.id);
    
    // On donne la liste des messages (événement créé du côté client)
    io.emit('recupererMessages', MSG_ROOM);

    // Quand on reçoit un nouveau message
    io.on('nouveauMessage', function (mess) {
        // On l'ajoute au tableau (variable globale commune à tous les clients connectés au serveur)
        console.log (mess);
        MSG_ROOM.push(mess);
        // On envoie à tout les clients connectés (sauf celui qui a appelé l'événement) le nouveau message
        socket.broadcast.emit('recupererNouveauMessage', MSG_ROOM);
        console.log (MSG_ROOM)
    });

    io.on('tonPseudo', function(data){
        console.log (data);
    });
    
}); */


// Quand une personne se connecte au serveur
io.sockets.on('connection', function (socket) {

	// On donne la liste des messages (evenement cree du cote client)
  socket.emit('recupererMessages', messages);
  
  //on efface les message
  socket.emit('menageMessage', function () {
    messages = [];
    socket.emit('recupererMessages', messages);
  });
	// Quand on recoit un nouveau message
	socket.on('nouveauMessage', function (mess) {
		// On l'ajout au tableau (variable globale commune a tous les clients connectes au serveur)
		messages.push(mess);
		console.log (mess);
		// On envoie a tout les clients connectes (sauf celui qui a appelle l'evenement) le nouveau message
    socket.broadcast.emit('recupererNouveauMessage', mess);
	});
});