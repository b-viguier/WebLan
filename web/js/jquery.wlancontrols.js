$.fn.wlancontrols = function(client){

    var container = $(this);

    container.html(
        '<div class="info">'+
        '<form class="form-inline">'+
            '<div class="form-group">'+
                '<label for="server">Server</label> '+
                '<input type="text" value="localhost" name="server" id="wlancontrols-server" /> '+
                '<label for="port">Port</label> '+
                '<input type="text" name="port" value="8080" id="wlancontrols-port" /> '+
                '<button type="button" class="btn btn-success"   id="wlancontrols-connect"    >Connect</button> '+
                '<button type="button" class="btn btn-danger"    id="wlancontrols-disconnect" disabled="disabled">Disconnect</button>'+
            '</div>'+
        '</form>'+
        '</div>'+
        '<div class="controlbar"><i class="glyphicon glyphicon-th-list" id="wlancontrols-opener"></i></div>'
    );
    container.toggleClass('wlancontrols__container', true);
    container.toggleClass('open', true);

    var connectButton      = $('#wlancontrols-connect', container),
        disconnectButton   = $('#wlancontrols-disconnect', container),
        serverTxt          = $('#wlancontrols-server', container),
        portTxt            = $('#wlancontrols-port', container);

    //Opener callback
    $('#wlancontrols-opener', container).click(function(){
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
        console.log('close');

        serverTxt.prop('disabled', true);
        portTxt.prop('disabled', true);
        disconnectButton.prop('disabled', true);
        connectButton.prop('disabled', false);
    });

    return this;
};
