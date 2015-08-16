function WebLanClient() {
    this.id = undefined;
    this.others = [];
    this.socket = undefined;

    var client = this;
    this.callbacks = {
        'WEBLAN:OTHERS': [function(body) {
            client.others = body.others;
            client.id = body.you;
        }],
        'WEBLAN:CONNECT': [ function(body, sender) {
            client.others.push(sender);
        }],
        'WEBLAN:DISCONNECT': [function(body, sender) {
            var index = client.others.indexOf(sender);
            if (index > -1) {
                client.others.splice(index, 1);
            }
        }]
    };
}

WebLanClient.prototype.connect = function(host, port) {
    this.socket = new WebSocket('ws://' + host + ':' + port);
    var client = this;

    this.socket.onmessage = function(messageEvent) {

        var splitIndex = messageEvent.data.indexOf('#');
        var header     = JSON.parse(messageEvent.data.substring(0, splitIndex));

        if (client.callbacks[header.type]) {
            var body = JSON.parse(messageEvent.data.substring(splitIndex + 1));
            for (var index in client.callbacks[header.type]) {
                client.callbacks[header.type][index](body, header.sender);
            }
        }
    };

    return this;
};

WebLanClient.prototype.send = function (jsonData, type, receiver) {
    this.socket.send(
        JSON.stringify(
            {
                'receiver'  : receiver,
                'type'      : type
            }
        ) + '#' + JSON.stringify(jsonData)
    );
};

WebLanClient.prototype.close = function () {
    this.socket.close();
};

WebLanClient.prototype.onEvent = function(type, callback) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push(callback);
    return this;
};
