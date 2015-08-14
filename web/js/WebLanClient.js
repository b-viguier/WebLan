function WebLanClient() {
    this.id = undefined;
    this.callbacks = {};
    this.socket = undefined;
}

WebLanClient.prototype.connect = function(host, port) {
    this.socket = new WebSocket('ws://' + host + ':' + port);
    var that = this;

    this.socket.onmessage = function(messageEvent) {

        var splitIndex = messageEvent.data.indexOf('#');
        var header     = JSON.parse(messageEvent.data.substring(0, splitIndex));

        if (that.callbacks[header.type]) {
            var body = JSON.parse(messageEvent.data.substring(splitIndex + 1));
            for (var index in that.callbacks[header.type]) {
                that.callbacks[header.type][index](body, header.sender);
            }
        }
    }
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
};
