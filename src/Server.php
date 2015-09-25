<?php

namespace Bveing\WebLan;

use Bveing\WebLan\Events\BaseEvent;
use Bveing\WebLan\Events\EventInterface;
use Bveing\WebLan\Events\SystemEvent;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Server implements MessageComponentInterface
{
    /**
     * @var \SplObjectStorage
     */
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $others = [];
        foreach($this->clients as $client) {
            $others[] = $client->resourceId;
        }
        $this->clients->attach($conn);

        $event = (new SystemEvent)
            ->setReceiver($conn->resourceId)
            ->setType('WEBLAN:OTHERS')
            ->setData([
                'you'    => $conn->resourceId,
                'others' => $others,
            ])
        ;
        $this->send($event, true);

        $event = (new SystemEvent)
            ->setSender($conn->resourceId)
            ->setType('WEBLAN:CONNECT')
        ;
        $this->send($event, true);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $event = (new BaseEvent)
            ->fromJson($msg)
            ->setSender($from->resourceId)
        ;
        $this->send($event);
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        $event = (new SystemEvent)
            ->setSender($conn->resourceId)
            ->setType('WEBLAN:DISCONNECT')
        ;

        $this->send($event, true);
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    public function send(EventInterface $event, $log = false)
    {
        $senderId   = $event->getSender();
        $receiverId = $event->getReceiver();
        $jsonMsg    = $event->getJson();

        $receivers  =
            $receiverId == EventInterface::ALL_RECEIVERS
                ? $this->clients
                : new \CallbackFilterIterator(
                    $this->clients,
                    function ($client) use ($receiverId) {
                        return $client->resourceId == $receiverId;
                    }
                );

        if($log) {
            printf("%s \t=> %s\t %s\t %s\n", $event->getSender(), $event->getReceiver(), $event->getType(), $event->getJson());
        };

        foreach ($receivers as $client) {
            if ($client->resourceId == $senderId) {
                continue;
            }
            $client->send($jsonMsg);
        }

        return $this;
    }
}
