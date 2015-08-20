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

$.fn.WLGLobby = function(client, options){
    this.serverId = undefined;
    var lobby = this;
    options = $.extend({}, $.fn.WLGLobby.defaults, options);

    this.isServer = function() {
        return lobby.serverId === client.id;
    };

    var container = $(this);
    container.html(
        '<table id="lobby" class="table table-striped">' +
            '<tr id="titles"><th>Id</th><th>Name</th><th>Ready?</th></tr>' +
        '</table>'
    );

    client
        .on('WEBLAN:OTHERS', function(body) {
            if(body.others.length == 0) {
                lobby.serverId = client.id;
                container.append('<button id="WLGLobby-start" type="button" class="btn btn-success">Start!</button>');
                $('#WLGLobby-start', container).click(function() {
                    client.send({}, 'LOBBY:START', '@all');
                    options.onServerStart();
                });
            }
            refreshLobby();
        })
        .on('WEBLAN:CONNECT', function(body, senderId) {
            if(lobby.isServer()) {
                client.send({}, 'LOBBY:SERVER_ID', senderId);
            }
            refreshLobby();
        })
        .on('WEBLAN:DISCONNECT', refreshLobby)
        .on('LOBBY:SERVER_ID', function(body, sender) {
            lobby.serverId = sender;
            refreshLobby();
        })
    ;

    var lobbyTable = $('#lobby', container);
    function refreshLobby() {
        $('tr',lobbyTable).remove(':not(#titles)');
        insertLobbyUser(client.id, 'success');
        client.others.forEach(insertLobbyUser);
    }
    function insertLobbyUser(id, extraClass) {
        if(id == lobby.serverId) {
            extraClass = 'danger';
        }
        lobbyTable.append(
            '<tr class="' + extraClass + '"><td>' + id + '</td></tr>'
        );
    }


    return this;
};

$.fn.WLGLobby.defaults = {
    onServerStart : function() {}
};