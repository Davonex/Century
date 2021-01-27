"use strict";

class RoomClass {
	
	constructor (room_name) {
    this._players_list = [];
    this._name = room_name;
    this._id = this._CreateId (); 
	}
    
    

	set name(room_name) {
		this._name = room_name;
	}
	
  get name() {
		return this._name;
  }

  set id(id_room) {
		return this._id = id_room;
  }

    
  get id() {
		return this._id;
  }

  AddPlayer(sid) {
    console.log (typeof(this._players_list));
    this._players_list.push(sid) 
    // this._showvar("AddPlayer : this.player_list ", this.players_list)
  }


    _CreateId () {
        return ( Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4) );
    }


    
	_showvar (msg , variable)
	{
	  console.log("-----RoomClass."+ msg + '\n');
	  console.log (variable)
	}
}

module.exports = RoomClass;