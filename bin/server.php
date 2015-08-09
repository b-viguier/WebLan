<?php

include __DIR__ . '/../vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Bviguier\WebLan\BroadCast;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new BroadCast()
        )
    ),
    8080
);

$server->run();