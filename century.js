"use strict";

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




//  Defined Lobby
const LobbyClass = require('./server/LobbyClass.js')
var lobby = new LobbyClass ();


// Quand une personne se connecte au serveur
io.on('connection', function(connect) {

    // ConnectID => connect.id
    let cid = connect.id;
    //SessionID => connect.handshake.headers.cookie
     let sid = cookie.parse (connect.handshake.headers.cookie)['connect.sid'].substr(2, 32)

	if (lobby.PlayerExist (sid)) { 
		connect.emit('Pseudo', {pseudo:lobby.players_list[sid].GetPseudo()})
		};
    //io.emit('message', {pseudo:"SRV", msg:message})
	
	connect.on('ConnectPseudo', (data) => {lobby.AddPlayer(data,connect,sid)});
    


    
    // Test si le SID existe deja
    if (lobby.PlayerExist (sid)) { 
      connect.emit('Pseudo', {pseudo:lobby.players_list[sid].GetPseudo()})
      };
   
    
    connect.on('ConnectPseudo', (data) => {lobby.AddPlayer(data,connect,sid)});

  });     
