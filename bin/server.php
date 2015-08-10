<?php

include __DIR__ . '/../vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Bviguier\WebLan\Server;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Server()
        )
    ),
    8080
);

$server->run();