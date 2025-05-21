<?php

namespace App\Repositories;

use App\Models\Accounts;
use App\Models\Category;
use App\Models\User;
use App\Traits\ContextIdentify;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AccountsRepository implements AccountsRepositoryInterface
{

    use ContextIdentify;

    protected $model = Accounts::class;

    public function getAllFixed(): Collection
    {
        return $this->getAll(true);
    }

    public function getAllVariable(): Collection
    {
        return $this->getAll(false);
    }

    private function getAll(bool $fixed): Collection
    {
        $query = $this->model::query();

        if ($this->verifyType() !== null) {
            $query->where('type', $this->verifyType());
        }

        return $query->where('is_fixed', $fixed)
            ->whereBetween('created_at', [
                \Carbon\Carbon::now()->startOfMonth()->startOfDay(),
                \Carbon\Carbon::now()->endOfDay()
            ])
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    private function getTotalAccounts(int $type, bool $fixed): float
    {
        return $this->model::where('type', $type)
            ->where('is_fixed', $fixed)
            ->whereBetWeen('created_at', [
                \Carbon\Carbon::now()->startOfMonth()->startOfDay(),
                \Carbon\Carbon::now()->endOfDay()
            ])
            ->sum('value');
    }

    public function getTotalRevenuesFixed(): float
    {
        return $this->getTotalAccounts(1, true);
    }

    public function getTotalRevenuesVariable(): float
    {
        return $this->getTotalAccounts(1, false);
    }

    public function getTotalExpansesFixed(): float
    {
        return $this->getTotalAccounts(2, true);
    }

    public function getTotalExpansesVariable(): float
    {
        return $this->getTotalAccounts(2, false);
    }

    private function getTotal(bool $fixed): float
    {
        $query = $this->model::query();

        if ($this->verifyType() !== null) {
            $query->where('type', $this->verifyType());
        }

        return $query->where('is_fixed', $fixed)->sum('value');
    }

    public function getTotalFixed(): float
    {
        return $this->getTotal(true);
    }

    public function getTotalVariable(): float
    {
        return $this->getTotal(false);
    }

    public function store($data)
    {
        $data['user_id'] = User::first()->id;
        $data['due_date'] = Carbon::parse($data['due_date'])->format('Y-m-d');
        return $this->model::create($data);
    }

    public function update(string $id, array $data): bool
    {
        $account = $this->model::findOrFail($id);
        return $account->update($data);
    }


    public function getTotalByCategoryWithName(): array
    {
        $categories = Category::all();

        $result = [];

        foreach ($categories as $category) {
            $totalRevenuesFixed = $this->totalByCategory($category->id, 1, true);
            $totalRevenuesVariable = $this->totalByCategory($category->id, 1, false);
            $totalExpansesFixed = $this->totalByCategory($category->id, 2, true);
            $totalExpansesVariable = $this->totalByCategory($category->id, 2, false);

            $result[] = [
                'category' => $category->title,
                'revenuesFixed' => $totalRevenuesFixed,
                'revenuesVariable' => $totalRevenuesVariable,
                'expansesFixed' => $totalExpansesFixed,
                'expansesVariable' => $totalExpansesVariable
            ];
        }

        // Extraindo apenas as categorias como um array
        $categoriesArray = array_map(fn ($item) => $item['category']  , $result);
        $totalRevenuesFixed = array_map(fn ($item) => $item['revenuesFixed']  , $result);
        $totalRevenuesVariable = array_map(fn ($item) => $item['revenuesVariable']  , $result);
        $totalExpansesFixed = array_map(fn ($item) => $item['expansesFixed']  , $result);
        $totalExpansesVariable = array_map(fn ($item) => $item['expansesVariable']  , $result);

        // Adicionando o array de categorias ao resultado
        $result['categories'] = $categoriesArray;
        $result['revenuesFixed'] = $totalRevenuesFixed;
        $result['revenuesVariable'] = $totalRevenuesVariable;
        $result['expansesFixed'] = $totalExpansesFixed;
        $result['expansesVariable'] = $totalExpansesVariable;

        return $result;
    }

    private function totalByCategory(string $categoryId, int $type, bool $fixed): float
    {
        return $this->model::where('category_id', $categoryId)
                    ->where('type', $type)
                    ->where('is_fixed', $fixed)
                    ->sum('value');
    }
}
