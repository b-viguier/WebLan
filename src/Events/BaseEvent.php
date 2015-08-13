<?php

namespace Bviguier\WebLan\Events;

class BaseEvent extends AbstractEvent
{

    /**
     * @var string
     */
    private $sender = 0;

    private $header;
    /**
     * @var string
     */
    private $type;

    /**
     * @var array
     */
    private $data;

    /**
     * @inheritdoc
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * @param string $sender
     * @return BaseEvent
     */
    public function setSender($sender)
    {
        $this->sender = $sender;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getReceiver()
    {
        return $this->header['receiver'];
    }

    /**
     * @inheritdoc
     */
    public function getType()
    {
        return $this->header['type'];
    }

    /**
     * @param string $json
     *
     * @return $this
     * @throws \Exception
     */
    public function fromJson($json)
    {
        list($header, $body) = explode('#', $json, 2);
        $header = json_decode($header, true);
        if (!isset($header)) {
            throw new \Exception('Missing header section in Json message');
        }
        foreach (['receiver', 'type'] as $prop) {
            if (!isset($header[$prop])) {
                throw new \Exception("Missing header property [$prop]");
            }
        }
        $this->header = $header;

        $this->data = $body;

        return $this;
    }

    public function getJson()
    {
        return implode(
            '#',
            [
                json_encode([
                    'sender'   => $this->getSender(),
                    'receiver' => $this->getReceiver(),
                    'type'     => $this->getType(),
                ]),
                $this->data
            ]);
    }
}
