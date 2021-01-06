
    var socket = io() // Connect to server
    // connection au serveur 
    socket.connect();

    console.log ("Page chargé : OK");

  

    socket.on('connect', function () {
      console.info('successfully established a working and authorized connection : ' + socket.id);
    });

    socket.on('data', function (data) {
      console.log(data);
    });

   socket.on('error', function (reason){
      console.error('Unable to connect Socket.IO', reason);
   });

 
 var pseudo = "";


 if (pseudo == "")  {
    $("#identification").show();
 }

    

 // On demande le pseudo de l'utilisateur
//  var pseudo = prompt('Votre pseudo ?') || 'Utilisateur';




var divTchat = $('#tchat');





 // Si quelqu'un a posté un message, le serveur nous envoie son message avec l'événement recupererNouveauMessage
 socket.on('message', function (message) {
    console.log ("on.message")
    divTchat.append('<div class="line"><b>'+message.pseudo+'</b> : '+message.msg+'</div>');
 });

// Pseudo
		$("#validate-pseudo").click(function(){
				// Envoi le pseudo
		  connect.emit('ConnectPseudo', {pseudo:$("#pseudo").val()});
		});
		
		
		connect.on('Message', (data) =>{      // Response to creating room
			msg = "<li>" + data.success + " : " + data.msg + "</li>";
			$(msg).appendTo('#messages')
		  <!-- $('#messages').text(msg); -->
		  <!-- console.log (data); -->
		});
		
		
		connect.on ('Pseudo', (data) => {
			pseudo = data.pseudo
			$("#join-lobby").hide();
			console.info(pseudo);	
			$('#H1-Pseudo').text(pseudo);
		});




