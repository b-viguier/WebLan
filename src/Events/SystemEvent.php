<?php

namespace Bviguier\WebLan\Events;

class SystemEvent extends AbstractEvent
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
}
