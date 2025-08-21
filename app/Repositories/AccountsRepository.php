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

    public function getAllFixed(?string $initialDate = null, ?string $finalDate = null): Collection
    {
        return $this->getAll(true, $initialDate, $finalDate);
    }

    public function getAllVariable(?string $initialDate = null, ?string $finalDate = null): Collection
    {
        return $this->getAll(false, $initialDate, $finalDate);
    }

    private function getAll(bool $fixed, ?string $initialDate = null, ?string $finalDate = null): Collection
    {
        $query = $this->model::query();

        if ($this->verifyType() !== null) {
            $query->where('type', $this->verifyType());
        }

        $query->where('is_fixed', $fixed);

        if ($initialDate && $finalDate && $this->isValidDate($initialDate) && $this->isValidDate($finalDate)) {
            $startDate = \Carbon\Carbon::parse($initialDate)->startOfDay();
            $endDate = \Carbon\Carbon::parse($finalDate)->endOfDay();

            $query->whereBetween('created_at', [$startDate, $endDate]);
        } elseif ($initialDate && $this->isValidDate($initialDate)) {
            $query->where('created_at', '>=', \Carbon\Carbon::parse($initialDate)->startOfDay());
        } elseif ($finalDate && $this->isValidDate($finalDate)) {
            $query->where('created_at', '<=', \Carbon\Carbon::parse($finalDate)->endOfDay());
        } else {
            $query->whereBetween('created_at', [
                \Carbon\Carbon::now()->startOfMonth()->startOfDay(),
                \Carbon\Carbon::now()->endOfDay()
            ]);
        }

        return $query->with('category')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    private function isValidDate(?string $date): bool
    {
        if (!$date) return false;

        try {
            \Carbon\Carbon::parse($date);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function destroy(string $id): bool
    {
        return $this->model::findOrFail($id)->delete();
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

    private function getTotal(bool $fixed, ?string $initialDate = null, ?string $finalDate = null): float
    {
        $query = $this->model::query();

        if ($this->verifyType() !== null) {
            $query->where('type', $this->verifyType());
        }

        $query->where('is_fixed', $fixed);

        if ($initialDate && $finalDate && $this->isValidDate($initialDate) && $this->isValidDate($finalDate)) {
            $startDate = \Carbon\Carbon::parse($initialDate)->startOfDay();
            $endDate = \Carbon\Carbon::parse($finalDate)->endOfDay();

            $query->whereBetween('created_at', [$startDate, $endDate]);
        } elseif ($initialDate && $this->isValidDate($initialDate)) {
            $query->where('created_at', '>=', \Carbon\Carbon::parse($initialDate)->startOfDay());
        } elseif ($finalDate && $this->isValidDate($finalDate)) {
            $query->where('created_at', '<=', \Carbon\Carbon::parse($finalDate)->endOfDay());
        } else {
            $query->whereBetween('created_at', [
                \Carbon\Carbon::now()->startOfMonth()->startOfDay(),
                \Carbon\Carbon::now()->endOfDay()
            ]);
        }

        return $query->sum('value');
    }

    public function getTotalFixed(?string $initialDate = null, ?string $finalDate = null): float
    {
        return $this->getTotal(true, $initialDate, $finalDate);
    }

    public function getTotalVariable(?string $initialDate = null, ?string $finalDate = null): float
    {
        return $this->getTotal(false, $initialDate, $finalDate);
    }

    public function store($data)
    {
        $data['user_id'] = User::first()->id;
        return $this->model::create($data);
    }

    public function update(string $id, array $data): bool
    {
        $account = $this->model::findOrFail($id);
        return $account->update($data);
    }


    public function getTotalByCategoryWithName(?string $initialDate = null, ?string $finalDate = null): array
    {
        $categories = Category::all();
        $result =  $this->splitTotalsByCategory($categories, $initialDate, $finalDate);
        return $this->addCategoriesToResult($result);
    }

    private function splitTotalsByCategory(Collection $categories, ?string $initialDate = null, ?string $finalDate = null): array
    {
        $result = [];

        foreach ($categories as $category) {
            $totalRevenuesFixed = $this->totalByCategory($category->id, 1, true, $initialDate, $finalDate);
            $totalRevenuesVariable = $this->totalByCategory($category->id, 1, false, $initialDate, $finalDate);
            $totalExpansesFixed = $this->totalByCategory($category->id, 2, true, $initialDate, $finalDate);
            $totalExpansesVariable = $this->totalByCategory($category->id, 2, false, $initialDate, $finalDate);

            $result[] = [
                'category' => $category->title,
                'revenuesFixed' => $totalRevenuesFixed,
                'revenuesVariable' => $totalRevenuesVariable,
                'expansesFixed' => $totalExpansesFixed,
                'expansesVariable' => $totalExpansesVariable
            ];
        }

        return $result;
    }

    private function addCategoriesToResult(array $result): array
    {
        $transformed = [];
        $transformed['categories'] = array_column($result, 'category');
        $transformed['revenuesFixed'] = array_column($result, 'revenuesFixed');
        $transformed['revenuesVariable'] = array_column($result, 'revenuesVariable');
        $transformed['expansesFixed'] = array_column($result, 'expansesFixed');
        $transformed['expansesVariable'] = array_column($result, 'expansesVariable');

        return $transformed;
    }

    private function totalByCategory(string $categoryId, int $type, bool $fixed, ?string $initialDate = null, ?string $finalDate = null): float
    {
        $query = $this->model::query();

        $query->where('category_id', $categoryId)
            ->where('type', $type)
            ->where('is_fixed', $fixed);

        if ($initialDate && $finalDate && $this->isValidDate($initialDate) && $this->isValidDate($finalDate)) {
            $startDate = \Carbon\Carbon::parse($initialDate)->startOfDay();
            $endDate = \Carbon\Carbon::parse($finalDate)->endOfDay();

            $query->whereBetween('created_at', [$startDate, $endDate]);
        } elseif ($initialDate && $this->isValidDate($initialDate)) {
            $query->where('created_at', '>=', \Carbon\Carbon::parse($initialDate)->startOfDay());
        } elseif ($finalDate && $this->isValidDate($finalDate)) {
            $query->where('created_at', '<=', \Carbon\Carbon::parse($finalDate)->endOfDay());
        }

        return $query->sum('value');
    }

}
