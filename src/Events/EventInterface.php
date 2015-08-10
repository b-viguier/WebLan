<?php

namespace Bviguier\WebLan\Events;

interface EventInterface
{
    const ALL_RECEIVERS = '@all';

    /**
     * @return string
     */
    public function getType();

    /**
     * @return string
     */
    public function getSender();

    /**
     * @return string
     */
    public function getReceiver();

    /**
     * @return string
     */
    public function getJson();
}
