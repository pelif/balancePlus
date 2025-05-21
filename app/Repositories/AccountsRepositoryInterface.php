<?php

namespace App\Repositories;

interface AccountsRepositoryInterface
{
    public function getAllFixed();
    public function getAllVariable();
    public function getTotalFixed(): float;
    public function getTotalVariable(): float;
    public function store($data);
    public function update(string $id, array $data): bool;
    public function getTotalRevenuesFixed(): float;
    public function getTotalRevenuesVariable(): float;
    public function getTotalExpansesFixed(): float;
    public function getTotalExpansesVariable(): float;
    public function getTotalByCategoryWithName(): array;
}
