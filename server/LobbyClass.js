
const PlayerClass = require('./PlayerClass.js')
const RoomClass = require('./RoomClass.js')



class LobbyClass {
	
	constructor (){
		this.players_list = {};
		this.rooms_list = {};
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
	AddRoom (data,connect) {
		// Check room_name
		if (typeof(data.room_name) === 'undefined' ||  data.room_name === "" ){
			this._log (connect,'Le speudo est absent ou invalide!', false)
			//connect.emit('Message', {success:false, msg:'Le speudo est absent ou invalide!'})
			 // console.log ( connect)
		} 
		// Check if room_name exist already
		// else if (this.PlayerExist (sid)) {
		// 	this.players_list[sid].SetPseudo (data.room_name)
		// 	connect.emit('Pseudo', {room_name:data.room_name});
		// 	this._log (connect,'Le SID ( '+sid+' ) existe deja!', false)
		// 	this._log (connect,data.room_name + ' a été modifié', true)
		// } 
		else {
			room = new RoomClass (data.room_name)
			this.rooms_list[room.GetId()] = room
			this._log (connect,data.room_name + ' a été cree', true)
			connect.emit('Room', {room_id:room.GetId(),room_name:room.GetName() });
		}

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
	
	/*
	**
	**
	*/
	PlayerRoomExist (sid) {
		if (this.PlayerExist(sid) && typeof (this.players_list[sid]) != 'undefined') {
			return this.players_list[sid].roomid;
		}
		else { 
			return false;
		}
	 
	}


	/*
	**
	**
	*/
	listeRoomId () {

	}
	//
	// Private function 
	//
	_log (connect,msg,success) {
		connect.emit('Message', {success:success, msg:msg});
		console.log (success + ' : ' + msg);
	}
	
	
}





module.exports = LobbyClass;