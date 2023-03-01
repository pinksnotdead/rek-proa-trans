<?php

namespace App\Api;

use App\Entity\AirPlane;
use App\Entity\Transport;
use App\Entity\TransportItem;
use Doctrine\Persistence\ManagerRegistry;

class TransportApi implements ApiInterface
{
    private $em;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->em = $doctrine->getManager();
    }
    public function getAll(): array
    {
        return $this->searchItems();
    }

    public function getItem(int $id): array
    {
        return $this->searchItems($id);
    }

    private function searchItems(?int $id = null): array
    {
        $data = [];

        $transports = (!$id) ? $this->em->getRepository(Transport::class)->findAll() : [$this->em->getRepository(Transport::class)->find($id)];

        foreach ($transports as $key => $transport) {

            $cargo = [];

            foreach ($transport->getItems() as $item) {
                $cargo[] = [
                    'name' => $item->getName(),
                    'weight' => $item->getWeight(),
                    'type' => $item->getType()
                ];
            }

            $data[$key] = array(
                "from" => $transport->getFromPlace(),
                "to" => $transport->getToPlace(),
                "date" => $transport->getDate(),
                'airplane' => [
                    "id" => $transport->getAirplane()->getId(),
                    "name" => $transport->getAirplane()->getName()
                ],
                'cargo' => $cargo
            );
        }

        return $data;
    }

    /**
     * @throws \Exception
     */
    public function post(array $items): array
    {
        $transport = new Transport();

        $transport->setFromPlace($items['from']);
        $transport->setToPlace($items['to']);
        $transport->setDate(new \DateTime($items['date']));

        $airplane = $this->em->getRepository(AirPlane::class)->find($items['airplane']);
        $transport->setAirplane($airplane);

        foreach ($items['cargo'] as $cargo) {
            $item = new TransportItem();
            $item->setName($cargo['name']);
            $item->setWeight($cargo['weight']);
            $item->setType($cargo['type']);

            $this->em->persist($item);

            $transport->addItem($item);
        }

        $this->em->persist($transport);

        $this->em->flush();

        return $this->searchItems($transport->getId());
    }
}
