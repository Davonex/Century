"use strict";


const PlayerClass = require('./PlayerClass.js')
const RoomClass = require('./RoomClass.js')



class LobbyClass {
	
	constructor (){
		this.players_list = {};
		this.rooms_list = {};
		this.max_players = 10;
	}
	
	
	/*
	** Add player in the Lobby list with him SID
	**
	*/
	AddPlayer (data,connect,sid) {
		// 
		//this._showvar("AddPlayer : Player_list",this.players_list );
		if (typeof(data.pseudo) === 'undefined' ||  data.pseudo === "" ){
			this._log (connect,'Le speudo est absent ou invalide!', false)
			//connect.emit('Message', {success:false, msg:'Le speudo est absent ou invalide!'})
			 // console.log ( connect)
			 return ({'error': 'Room name is not valid'});

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
		
	}

	/*
	**
	**
	*/
	getplayer(sid) {
		return  (this.players_list[sid]);
	}


	/*
	** Join Player (sid) in the room (rid)
	**
	*/
	JoinPlayer (sid,rid) {
		// Set Room_id in Player 
		this.players_list[sid].id = rid;
		// Add Player_id in  room 
		this.rooms_list[rid].AddPlayer(sid)

		// this._showvar ("JoinPlayer : rooms_list",this.rooms_list)
		// this._showvar ("JoinPlayer : players_list",this.players_list)
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
				// Creation de la room
			let room = new RoomClass (data.room_name) 
			this.rooms_list[room.id] = room;
				// this._showvar('AddRoom: Create room',room)
				// joindre le player à la room
			this.JoinPlayer (sid,room.id)
			//this._log (connect,data.room_name + ' a été cree', true)
				//this._showvar('AddRoom : AddRoom',room)
				//this._showvar('AddRoom : player',this.players_list[sid] )
			let dataReturn = {
				'id': room.id,
				'name': room.name 
			};
			return (dataReturn);
		}

	}
	
	/*
	** Get the room
	**
	*/
	getroom (rid) {
		return  (this.rooms_list[rid]);
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
			let id_room = this.players_list[sid].id;
			if ( id_room === "") {
				return false }
			else {
				return id_room;
			}
		}
		else { 
			return false;
		}
	 
	}


	/*
	**
	**
	*/
	listeRoom () {

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
	  console.log("----LobbyClass."+ msg + '\n');
	  console.log (variable)
	}
	
	
}





module.exports = LobbyClass;