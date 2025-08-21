<?php

namespace App\Http\Controllers;

use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\AccountsRepositoryInterface;
use App\Traits\ContextIdentify;
use App\Traits\FilterDates;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsController extends Controller
{
    use ContextIdentify, FilterDates;

    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository,
        protected AccountsRepositoryInterface $accountsRepository
    ) {}

    public function index(?string $initialDate = null, ?string $finalDate = null)
    {
        $dates = $this->filterDates($initialDate, $finalDate);

        return Inertia::render('Accounts', [
            'categories' => $this->categoryRepository->getAll(),
            'accountsFixed' => $this->accountsRepository->getAllFixed(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'accountsVariable' => $this->accountsRepository->getAllVariable(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'type' => $this->verifyType(),
            'totalFixed' => (float) $this->accountsRepository->getTotalFixed(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'totalVariable' => (float) $this->accountsRepository->getTotalVariable(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'filterDates' => $dates
        ]);
    }

    public function store(Request $request)
    {
        $this->accountsRepository->store($request->all());
        return to_route($this->getContext().'.index');
    }

    public function update(string $id, Request $request)
    {
        $this->accountsRepository->update($id, $request->all());
        return to_route($this->getContext().'.index');
    }

    public function destroy(string $id)
    {
        $this->accountsRepository->destroy($id);
    }


}

