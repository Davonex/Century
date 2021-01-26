
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
		this._showvar("Player_list",this.players_list );
		if (typeof(data.pseudo) === 'undefined' ||  data.pseudo === "" ){
			this._log (connect,'Le speudo est absent ou invalide!', false)
			//connect.emit('Message', {success:false, msg:'Le speudo est absent ou invalide!'})
			 // console.log ( connect)
			 let dataReturn = {'error': 'Room name is not valid'}
			 return (dataReturn);
		} else if (this.PlayerExist (sid)) {
			this.players_list[sid].SetPseudo (data.pseudo)
			connect.emit('Pseudo', {pseudo:data.pseudo});
			//this._log (connect,'Le SID ( '+sid+' ) existe deja!', false)
			this._log (connect,data.pseudo + ' existait et  a été modifié', true)
			return ({'name' : data.pseudo});
		} else {
			this.players_list[sid] = new PlayerClass (connect.id,sid,data.pseudo)
			this._log (connect,data.pseudo + ' a été ajouté', true)
			return ( {'name' : data.pseudo});
		}
		// Tester si le player exist 
		
	}

	
	
	GetPlayer (sid) {
		return  (this.players_list[sid]);
	}
	/*
	** Join Player (sid) in the room (rid)
	**
	*/
	JoinPlayer (sid,rid) {
		this.players_list[sid].SetRoomId(rid);
		this.rooms_list.push(rid)
		console.log (this.rooms_list)
	}


	/*
	**
	**
	*/
	AddRoom (data,connect,sid) {
		// Check room_name
		if (typeof(data.room_name) === 'undefined' ||  data.room_name === "" ){
			this._log (connect,'Le nom de la salle est absent ou invalide!', false)
			//connect.emit('Message', {success:false, msg:'Le speudo est absent ou invalide!'})
			 // console.log ( connect)
			 let dataReturn = {'error': 'Room name is not valid'}
			 return (dataReturn);
		} 
		// Check if room_name exist already
		// else if (this.PlayerExist (sid)) {
		// 	this.players_list[sid].SetPseudo (data.room_name)
		// 	connect.emit('Pseudo', {room_name:data.room_name});
		// 	this._log (connect,'Le SID ( '+sid+' ) existe deja!', false)
		// 	this._log (connect,data.room_name + ' a été modifié', true)
		// } 
		else {
			let room = new RoomClass (data.room_name)
			this.rooms_list[room.GetId()] = room
			this._log (connect,data.room_name + ' a été cree', true)
			let dataReturn = {
				'id': room.GetId(),
				'name': room.GetName() 
			};
			return (dataReturn);
			//connect.emit('Room', {room_id:room.GetId(),room_name:room.GetName() });
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

	_showvar (msg , variable)
	{
	  console.log( msg + '\n');
	  console.log (variable)
	  console.log ("------"+'\n');
	}
	
	
}





module.exports = LobbyClass;