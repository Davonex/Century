

const PlayerClass = require('./PlayerClass')

var ALLPlayers = function(io) {
    //this.io = io;
    this.playersSID = {};
    //this.playersIID = {};
  };


ALLPlayers.prototype.createPlayer = function(sessionID) {
    if (! this.players[sessionID]) {
        this.players[sessionID] = new PlayerClass.Player(sessionID);
    }
    
}

ALLPlayers.prototype.getPlayer = function(sessionID) {
    if (this.players[sessionID]) {
        return this.players[sessionID];
    } else {
        return  { error : 'Sorry, this player no exists ...'};
    }
    
}



exports.ALLPlayers = ALLPlayers;