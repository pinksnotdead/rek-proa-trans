<?php

namespace App\Controller;

use App\Api\TransportApi;
use App\Validation\TransportOrderPayload;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/transports')]
class TransportController extends AbstractController
{
    #[Route('', name: "get_transports", methods: ['GET'])]
    public function listAction(TransportApi $transportApi): Response
    {
        return $this->json(["success" => true, "data" => $transportApi->getAll()]);
    }

    #[Route('', name: "post_transports", methods: ['POST'])]
    public function postAction(Request $request, TransportApi $transportApi, TransportOrderPayload $validator): Response
    {
        $payload = json_decode($request->getContent(), true);

        $errors = $validator->validate($payload);
        if(!empty($errors)) {
            return $this->json(["success" => false, "data" => $errors], 422);
        }

        return $this->json(["success" => true, "data" => $transportApi->post($payload)], 201);
    }
}
