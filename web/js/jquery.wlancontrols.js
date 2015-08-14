$.fn.wlancontrols = function(options){

    var opts      = $.extend( {}, $.fn.wlancontrols.defaults, options );
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

    this.connectButton      = $('#wlancontrols-connect', container);
    this.disconnectButton   = $('#wlancontrols-disconnect', container);

    var serverTxt   = $('#wlancontrols-server', container),
        portTxt     = $('#wlancontrols-port', container);
    this.serverVal  = function() {return serverTxt.val();};
    this.portVal    = function() {return portTxt.val();};

    //Opener callback
    $('#wlancontrols-opener', container).click(function(){
        container.toggleClass('open');
    });

    //On connect
    this.connectButton.click(function(){
        opts.onConnect();
        container.toggleClass('open', false);

        serverTxt.prop('disabled', true);
        portTxt.prop('disabled', true);
        $('.btn', container).prop('disabled', false);
        $(this).prop('disabled', true);
    });

    //On disconnect
    this.disconnectButton.click(function() {
        opts.onDisconnect();

        serverTxt.prop('disabled', false);
        portTxt.prop('disabled', false);
        $('button', container).prop('disabled', false);
        $(this).prop('disabled', true);
    });

    return this;
};

$.fn.wlancontrols.defaults = {
    onConnect : function() {},
    onDisconnect : function() {}
};
