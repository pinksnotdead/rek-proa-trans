<?php

namespace App\Controller;

use App\Api\AirplaneApi;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/airplanes')]
class AirplaneController extends AbstractController
{
    #[Route('', name: "get_airplanes", methods: ['GET'])]
    public function listAction(AirplaneApi $airplaneApi): Response
    {
        return $this->json(["success" => true, "data" => $airplaneApi->getAll()]);
    }
}
