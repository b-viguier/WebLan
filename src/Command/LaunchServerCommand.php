<?php

namespace Bveing\WebLan\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Bveing\WebLan\Server;


class LaunchServerCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('weblan:launch')
            ->setDescription('Lancer un serveur weblan')
            ->addOption(
                'port',
                'p',
                InputOption::VALUE_OPTIONAL,
                'Sur quel port doit-on écouter ?'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $port = $input->getOption('port')?:8080;

        IoServer::factory(
            new HttpServer(
                new WsServer(
                    new Server()
                )
            ),
            $port
        )->run();
    }
}
