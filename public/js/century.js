
    console.log ("Page chargé : OK");
    let socket = io();

    // connection au serveur 
    socket.connect();

 // On demande le pseudo de l'utilisateur
 var pseudo = prompt('Votre pseudo ?') || 'Utilisateur';

 var pseudo = "didou"

$('#pseudo').text(pseudo);
let divTchat = $('#tchat');
let imputMessage = $('#message');
let buttonMenage = $('#menage');


 // On crée l'événement recupererMessages pour récupérer direcement les messages sur serveur
 socket.on('recupererMessages', function (messages) {
    // messages est le tableau contenant tous les messages qui ont été écris sur le serveur
    console.log ("recupererMessages");
    console.log (messages);
    var html = '';
    for (var i = 0; i < messages.length; i++) {
      divTchat.append('<div class="line"><b>'+messages[i].pseudo+'</b> : '+messages[i].message+'</div>');
    }
    
 });

 // Si quelqu'un a posté un message, le serveur nous envoie son message avec l'événement recupererNouveauMessage
 socket.on('recupererNouveauMessage', function (message) {
    console.log ("recupererNouveauMessage")
    divTchat.append('<div class="line"><b>'+message.pseudo+'</b> : '+message.message+'</div>');
 });

 // Quand on veut envoyer un message (on a validé le formulaire)
 $('#send').click (function(){ 
    // On récupère le message
    message = imputMessage.val();

    // On appelle l'événement se trouvant sur le serveur pour qu'il enregistre le message et qu'il l'envoie à tous les autres clients connectés (sauf nous)
    // socket.emit('nouveauMessage', { 'pseudo' : pseudo, 'message' : message });
    socket.emit('nouveauMessage',  { 'pseudo' : pseudo, 'message' : imputMessage.val() });
    // On affiche directement notre message dans notre page
    divTchat.append('<div class="line"><b>'+pseudo+'</b> : '+message+'</div>')
    // On vide le formulaire
    imputMessage.val("");
    // On retourne false pour ne pas que le formulaire n'actualise la page
    return false;
});

buttonMenage.click (function(){ 
   socket.emit('menageMessage',  {});  

});




