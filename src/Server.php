<?php

namespace Bviguier\WebLan;

use Bviguier\WebLan\Events\BaseEvent;
use Bviguier\WebLan\Events\EventInterface;
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

        $event = (new BaseEvent)
            ->setReceiver($conn->resourceId)
            ->setType('OTHERS')
            ->setData([
                'you'    => $conn->resourceId,
                'others' => $others,
            ])
        ;
        $this->send($event);

        $event = (new BaseEvent)
            ->setSender($conn->resourceId)
            ->setType('CONNECT')
        ;
        $this->send($event);
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

        $event = (new BaseEvent)
            ->setSender($conn->resourceId)
            ->setType('DISCONNECT')
        ;

        $this->send($event);
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    public function send(EventInterface $event)
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

        foreach ($receivers as $client) {
            if ($client->resourceId == $senderId) {
                continue;
            }
            printf("%s \t=> %s\t %s\n", $event->getSender(), $event->getReceiver(), $event->getType());
            $client->send($jsonMsg);
        }

        return $this;
    }
}
