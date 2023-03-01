<?php

namespace App\DataFixtures;

use App\Entity\AirPlane;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $airPlanes = [
            [
                "name" => "Airbus A380",
                "payload" => 35000,
                "email" => "airbus@example.com"
            ],
            [
                "name" => "Boeing 747",
                "payload" => 38000,
                "email" => "boeing@example.com"
            ]
        ];

        foreach ($airPlanes as $airPlane) {
            $plane = new AirPlane();

            $plane->setName($airPlane['name']);
            $plane->setPayload($airPlane['payload']);
            $plane->setEmail($airPlane['email']);

            $manager->persist($plane);
        }

        $manager->flush();
    }
}
