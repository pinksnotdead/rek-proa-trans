<?php

namespace App\Api;

interface ApiInterface
{
    public function getAll(): array;
    public function post(array $items): array;
    public function getItem(int $id): array;
}
