"use strict";

class PlayerClass {
	
	constructor (cid,sid,pseudo){
		this._cid = cid;
		this._sid = sid;
		this._pseudo = pseudo;
		this._rid = "";
	}
	
	changepseudo(pseudo) {
		this._pseudo = pseudo;
	}
	
	get pseudo() {
		return (this._pseudo);
	}

	set roomid (rid){
		this._rid = rid;
	}

	get roomid(){
		return (this._rid);
	}


	_showvar (msg , variable)
	{
	  console.log("-----PlayerClass."+ msg + '\n');
	  console.log (variable)
	}

}

module.exports = PlayerClass;