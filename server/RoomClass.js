class RoomClass {
	
	constructor (room_name) {
        this.players_list = {};
		this.name = room_name;
        this._CreateId ();
        this.name= name 
	}
    
    

	SetName(name) {
		this.name = name;
	}
	
	GetName () {
		return this.name;
    }
    
    GetId () {
		return this.id;
    }


    _CreateId () {
        this.id = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
    }
}

module.exports = RoomClass;