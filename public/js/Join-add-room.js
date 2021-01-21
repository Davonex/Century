"use strict";

$("#btn-add-room").click(function() {
    console.log("Click : " + $(this).attr("id"));
    $("#join-room").hide();
    $("#add-room").show();
    $("#room_submit").text("Créer")
      _RemoveIconSelect ();
      $("#room-select").val("0");
  });
  
  
  $("#btn-close-add-room").click(function() {
    console.log("Click : " + $(this).attr("id"));
      
    $("#join-room").show();
    $("#add-room").hide();
    $("#room_submit").text("Joindre")
    $("#room-select").val("");
    // unselect btn-add-add
    $("#btn-add-room").removeClass("select-room")
      
  });
  
  
  /*
  ** Click Select room
  **/
  $(".btn-room").click(function() {
    console.log("Click : " + $(this).attr("id"));
    // de-select old ID 
    let old_id = $("#room-select").val();
    $("#room_" + old_id).removeClass("select-room")
    // Select New ID
    let id = ($(this).attr("id_room"));
    $("#room-select").val(id);
    $(this).addClass("select-room")
      //console.log ( $(this).parent().attr("id") );
      _RemoveIconSelect ();
      _AppendIconSelect ($(this));
  
  });
  
  
  
  
  // chage speudo 
  $("#input-pseudo").change (function() {
      // console.log ($("#input-pseudo").val());
      // console.log (_IsValid($("#input-pseudo").val()));
      _SwitchValid ("icon-pseudo", $("#input-pseudo").val() );	
  });
  
  // chage room-name 
  $("#input-add-room-name").change (function() {
      // console.log ($("#input-pseudo").val());
      // console.log (_IsValid($("#input-pseudo").val()));
      _SwitchValid ("icon-add-room-name", $("#input-add-room-name").val() );	
  });
  
  
  
  
  
  /*
  // Click submit
  */
  
  $("#room_submit").click(function() {
  
      // Check Speudo
    if (!_IsValid($("#input-pseudo").val())) {
      console.log("PSEUDO IS NOT VALID");
          alert ("PSEUDO IS NOT VALID")
      return false;
    }
  
    //console.log("Clic : " + $(this).attr("id"));
    let id_room = $("#room-select").val();
    
      //console.log("id_room.val" + id_room);
    // check JOIN vs Create
    if (id_room.length === 0) {
      console.log("NOT ROOM CHOICE SELECT");
          alert ("NOT ROOM CHOICE SELECT");
      return false
    }
      
   // console.log ( "id_room : " + typeof (id_room) );
      
    if (id_room === "0") {
      // ADD ROOM SELECT 
              if ( ! _IsValid($("#input-add-room-name").val()) ) {
                      console.log("ADD ROOM NAME  IS NOT VALID");
                      alert ("ADD ROOM NAME  IS NOT VALID");
                      
                      return false;
                  } else {
                  // JOIN ROOM SELECT 
                  console.log("emit ADD_ROOM : " + $("#input-add-room-name").val() );
                  alert ("emit ADD_ROOM : " + $("#input-add-room-name").val() );
                  connect.emit('ConnectAddRoom', { pseudo: $("#input-pseudo").val(), room_name: $("#input-add-room-name").val() });
                  } 
          
          } else {
              //  join room select 
              console.log("emit JOIN_ROOM  \n PSEUDO : " + $("#input-pseudo").val() + " ; ROOM_ID : " +  id_room );
              alert ("emit JOIN_ROOM  \n PSEUDO : " + $("#input-pseudo").val() + " ; ROOM_ID : " +  id_room );
              connect.emit('ConnectJoinRoom', { pseudo: $("#input-pseudo").val(), room_id: id_room });
          }
  });
  
  
  /// Rmove and Add iconSelect
  
  function _RemoveIconSelect () {
      $(".icon-select").remove();	
  }
  
  
  function _AppendIconSelect (Container) {	 	
      Container.append('<i id="" class="fa fa-check-circle icon-select w3-text-green fa-3x" ></i>');
      $(".icon-select").offset({ top: Container.offset().top, left: Container.offset().left });
      
  }
  
  
  
  
  // Switch icon Valid and unvalid
  
  function _SwitchValid (IdIcon, Str) {
      if (_IsValid(Str))	{
          $("#"+IdIcon).attr("class","fa icon fa-check-circle w3-text-green fa-2x")
      } else {
          $("#"+IdIcon).attr("class","fa icon fa-times-circle w3-text-red fa-2x")
      }
  }
  
  
  
  //  Check String is valid 
  
  function _IsValid(str) {
    var iChars = "~`!#$%^&*+=-[]\\';,/{}|\":<>?()";
  
    if (_IsEmpty(str)) {
      // console.log("Text has empty \nThese are not allowed\n");
      return false;
    }
  
    for (var i = 0; i < str.length; i++) {
      if (iChars.indexOf(str.charAt(i)) != -1) {
        // console.log("Text has special characters ~`!#$%^&*+=-[]\\';,/{}|\":<>? \nThese are not allowed\n");
        return false;
      }
    }
    return true;
  }
  
  
  
  function _IsEmpty(str) {
    return str.length === 0;
  }
  