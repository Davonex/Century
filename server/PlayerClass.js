
class PlayerClass {
	
	constructor (cid,sid,pseudo){
		this.cid = cid;
		this.sid = sid;
		this.pseudo = pseudo;
		this.roomid = "";
	}
	
	SetPseudo (pseudo) {
		this.pseudo = pseudo;
	}
	
	GetPseudo () {
		return this.pseudo;
	}
}

module.exports = PlayerClass;