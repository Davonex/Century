


const PlayerClass = require('./PlayerClass.js')



class LobbyClass {
	
	constructor (){
		this.players_list = {};
		this.max_players = 10;
	}
	
	
	/*
	**
	**
	*/
	AddPlayer (data,connect,sid) {
		// 
		if (typeof(data.pseudo) === 'undefined' ||  data.pseudo === "" ){
			this._log (connect,'Le speudo est absent ou invalide!', false)
			//connect.emit('Message', {success:false, msg:'Le speudo est absent ou invalide!'})
			 // console.log ( connect)
		} else if (this.PlayerExist (sid)) {
			this.players_list[sid].SetPseudo (data.pseudo)
			connect.emit('Pseudo', {pseudo:data.pseudo});
			//this._log (connect,'Le SID ( '+sid+' ) existe deja!', false)
			this._log (connect,data.pseudo + ' a été modifié', true)
		} else {
			this.players_list[sid] = new PlayerClass (connect.id,sid,data.pseudo)
			this._log (connect,data.pseudo + ' a été ajouté', true)
			connect.emit('Pseudo', {pseudo:data.pseudo});
		}
		// Tester si le player exist 
		
	}
	
	
	/*
	**
	**
	*/
	PlayerExist (sid) {
		if (typeof (this.players_list[sid]) === 'undefined') {
			 return false;
		}
		else { 
			return true;
		}
	 
	}
	
	
	//
	//
	//
	_log (connect,msg,success) {
		connect.emit('Message', {success:success, msg:msg});
		console.log (success + ' : ' + msg);
	}
	
	
}





module.exports = LobbyClass;