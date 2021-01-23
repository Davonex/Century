"use strict";

    var connect = io() // Connect to server
    // connection au serveur 
    connect.connect();



  



 

// div pour les messages servers
 var divTchat = $('#tchat');

 var InputPseudo = $("#input_pseudo");
// Form to Add or Join room
 var DivJoin = $("#join-pseudo");
 var H1Title =$("H1-Title");

 var pseudo = "";
 var room_name = ""
 var room_id = ""
 


 if (typeof(pseudo) === 'undefined' || pseudo === "")  {
  DivJoin.show();
 } else if (typeof(room) === 'undefined' || room === "") {
  DivJoin.show();
 }

    

 // On demande le pseudo de l'utilisateur
//  var pseudo = prompt('Votre pseudo ?') || 'Utilisateur';

$("#submit-pseudo").click (function(){
   // Envoi le pseudo sur click du bouton $("#submit-pseudo") 
   connect.emit('ConnectPseudo', { pseudo: InputPseudo.val() });

});



 






// Pseudo
		$("#validate-pseudo").click(function(){
				// Envoi le pseudo
		  connect.emit('ConnectPseudo', {pseudo:$("#pseudo").val()});
		});
		
		
		connect.on('Message', (data) =>{      // Response to creating room
			_showInfo (data.success + " : " + data.msg)
		});
		
  

		connect.on ('Pseudo', (data) => {
			pseudo = data.pseudo
			DivJoin.hide();
			console.info(pseudo);	
			H1Title.text(pseudo);
		});





connect.on('connect', function () {
  _showInfo (connect.id);
  

 });

 connect.on('data', function (data) {
   console.log(data);
 });

 connect.on('error', function (reason){
   console.error('Unable to connect Connect.IO', reason);
});


function _showInfo (msg)
{
  $("<p>" + msg + "</p>").appendTo('#messages')
  console.log ($('#messages').scrollTopMax);
  console.info (msg);
}


_showInfo ("Page Chargé.1")
