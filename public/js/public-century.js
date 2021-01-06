
    var connect = io() // Connect to server
    // connection au serveur 
    connect.connect();



  



 

// div pour les messages servers
 var divTchat = $('#tchat');

 var InputPseudo = $("#input_pseudo");


 if (typeof(pseudo) === 'undefined' || pseudo === "")  {
    $("#identification").show();
 }

    

 // On demande le pseudo de l'utilisateur
//  var pseudo = prompt('Votre pseudo ?') || 'Utilisateur';

$("#submit-pseudo").click (function(){
   // Envoi le pseudo sur click du bouton $("#submit-pseudo") 
   connect.emit('ConnectPseudo', { pseudo: InputPseudo.val() });

});


connect.on('Pseudo',(data) => {
   pseudo = data.pseudo
   $("#identification").hide();
});
 








// message du serveur 
 connect.on('Message', (data) =>{      // Response to creating room
   msg = "<li>" + data.success + " : " + data.msg + "</li>";
   $(msg).appendTo(divTchat)
  <!-- $('#divTchat').text(msg); -->
  <!-- console.log (data); -->
});



connect.on('connect', function () {
   console.info('successfully established a working and authorized connection : ' + connect.id);
 });

 connect.on('data', function (data) {
   console.log(data);
 });

 connect.on('error', function (reason){
   console.error('Unable to connect Connect.IO', reason);
});


console.log ("Page chargé : OK");