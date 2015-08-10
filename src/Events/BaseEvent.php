<?php

namespace Bviguier\WebLan\Events;

class BaseEvent implements EventInterface
{

    /**
     * @var string
     */
    private $sender = 0;

    /**
     * @var string
     */
    private $receiver = EventInterface::ALL_RECEIVERS;

    /**
     * @var string
     */
    private $type;

    /**
     * @var array
     */
    private $data = [];

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
        return $this->receiver;
    }

    /**
     * @param string $receiver
     * @return BaseEvent
     */
    public function setReceiver($receiver)
    {
        $this->receiver = $receiver;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return BaseEvent
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param array $data
     * @return BaseEvent
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getJson()
    {
        return json_encode(
            [
                'header' => [
                    'sender'   => $this->getSender(),
                    'receiver' => $this->getReceiver(),
                    'type'     => $this->getType(),
                ],
                'body'   => $this->getData(),
            ]
        );
    }

    /**
     * @param string $json
     *
     * @return $this
     * @throws \Exception
     */
    public function fromJson($json)
    {
        $json = json_decode($json, true);
        if (!isset($json['header'])) {
            throw new \Exception('Missing header section in Json message');
        }
        $header = $json['header'];
        foreach (['receiver', 'type'] as $prop) {
            if (!isset($header[$prop])) {
                throw new \Exception("Missing header property [$prop]");
            }
            $method = "set$prop";
            $this->$method($header[$prop]);
        }

        if (isset($json['body']) && is_array($json['body'])) {
            $this->setData($json['body']);
        }

        return $this;
    }
}
