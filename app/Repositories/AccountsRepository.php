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
        return $this->model::where('type', $this->verifyType())
                ->where('is_fixed', true)
                ->with('category')
                ->orderBy('created_at', 'desc')
                ->get();
    }

    public function getAllVariable(): Collection
    {
        return $this->model::where('type', $this->verifyType())
                ->where('is_fixed', false)
                ->with('category')
                ->orderBy('created_at', 'desc')
                ->get();
    }

    public function getTotalFixed(): float
    {
        return $this->model::where('type', $this->verifyType())
                ->where('is_fixed', true)
                ->sum('value');
    }

    public function getTotalVariable(): float
    {
        return $this->model::where('type', $this->verifyType())
                ->where('is_fixed', false)
                ->sum('value');
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


}
