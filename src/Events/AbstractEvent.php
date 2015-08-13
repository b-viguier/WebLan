<?php

namespace Bviguier\WebLan\Events;

abstract class AbstractEvent implements EventInterface
{

    /**
     * @inheritdoc
     */
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
                json_encode($this->getData())
        ]);
    }
}
