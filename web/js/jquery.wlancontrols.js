$.fn.wlancontrols = function(){
    $(this).append('<div id="wlancontrols__container">'+
        '<div class="info">'+
        '<form class="form-inline">'+
            '<div class="form-group">'+
                '<label for="server">Server</label> '+
                '<input type="text" value="localhost" name="server" id="server" /> '+
                '<label for="port">Port</label> '+
                '<input type="text" name="port" value="8080" id="port" /> '+
                '<button type="button" class="btn btn-success"   id="connect"    >Connect</button> '+
                '<button type="button" class="btn btn-danger"    id="disconnect" >Disconnect</button>'+
            '</div>'+
        '</form>'+
        '</div>'+
        '<div class="controlbar"><i class="glyphicon glyphicon-th-list" id="wlancontrols-opener"></i></div>'+
    '</div>');
    return this;
};
