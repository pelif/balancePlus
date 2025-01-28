<?php

namespace App\Repositories;

interface AccountsRepositoryInterface
{
    public function getAllFixed();
    public function getAllVariable();
    public function getTotalFixed(): float;
    public function getTotalVariable(): float;
    // public function getById($id);
    public function store($data);
    public function update(string $id, array $data): bool;
    // public function delete($id);
}
