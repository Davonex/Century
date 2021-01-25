"use strict";

class PlayerClass {
	
	constructor (cid,sid,pseudo){
		this.cid = cid;
		this.sid = sid;
		this.pseudo = pseudo;
		this.rid = "";
	}
	
	SetPseudo (pseudo) {
		this.pseudo = pseudo;
	}
	
	GetPseudo () {
		return this.pseudo;
	}

	SetRoomId (rid){
		this.rid = rid;
	}
}

module.exports = PlayerClass;