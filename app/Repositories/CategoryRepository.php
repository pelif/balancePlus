<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{

    protected $model = Category::class;

    public function getAll()
    {
        return $this->model::all();
    }
}
