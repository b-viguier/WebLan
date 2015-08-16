$.fn.WLGConnection = function(client){

    var container = $(this);

    container.html(
        '<div class="info">'+
        '<form class="form-inline">'+
            '<div class="form-group">'+
                '<label for="server">Server</label> '+
                '<input type="text" value="localhost" name="server" id="WLGConnection-server" /> '+
                '<label for="port">Port</label> '+
                '<input type="text" name="port" value="8080" id="WLGConnection-port" /> '+
                '<button type="button" class="btn btn-success"   id="WLGConnection-connect"    >Connect</button> '+
                '<button type="button" class="btn btn-danger"    id="WLGConnection-disconnect" disabled="disabled">Disconnect</button>'+
            '</div>'+
        '</form>'+
        '</div>'+
        '<div class="controlbar"><i class="glyphicon glyphicon-th-list" id="WLGConnection-opener"></i></div>'
    );
    container.toggleClass('WGLConnection-container', true);
    container.toggleClass('open', true);

    var connectButton      = $('#WLGConnection-connect', container),
        disconnectButton   = $('#WLGConnection-disconnect', container),
        serverTxt          = $('#WLGConnection-server', container),
        portTxt            = $('#WLGConnection-port', container);

    //Opener callback
    $('#WLGConnection-opener', container).click(function(){
        container.toggleClass('open');
    });

    //On connect
    connectButton.click(function(){
        client.connect(serverTxt.val(), portTxt.val());

        container.toggleClass('open', false);

        serverTxt.prop('disabled', false);
        portTxt.prop('disabled', false);
        disconnectButton.prop('disabled', false);
        connectButton.prop('disabled', true);
    });

    //On disconnect
    disconnectButton.click(function() {
        client.close();

        serverTxt.prop('disabled', true);
        portTxt.prop('disabled', true);
        disconnectButton.prop('disabled', true);
        connectButton.prop('disabled', false);
    });

    return this;
};
