<?php

namespace App\Api;

use App\Entity\AirPlane;
use Doctrine\Persistence\ManagerRegistry;

class AirplaneApi implements ApiInterface
{
    private $em;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->em = $doctrine->getManager();
    }

    public function getAll(): array
    {
        $data = [];

        $airplanes = $this->em->getRepository(AirPlane::class)->findAll();

        foreach ($airplanes as $key => $airplane) {
            $data[$key] = [
                'id' => $airplane->getId(),
                'name' => $airplane->getName(),
                'payload' => $airplane->getPayload(),
                'email' => $airplane->getEmail()
            ];
        }

        return $data;
    }

    public function getItem(int $id): array
    {
        return $this->em->getRepository(AirPlane::class)->find($id);
    }

    /**
     * @throws \Exception
     */
    public function post(array $items): array
    {
        return [];
    }
}
