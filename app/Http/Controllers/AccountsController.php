<?php

namespace App\Http\Controllers;

use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\AccountsRepositoryInterface;
use App\Traits\ContextIdentify;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsController extends Controller
{
    use ContextIdentify;

    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository,
        protected AccountsRepositoryInterface $accountsRepository
    ) {}

    public function index()
    {

        return Inertia::render('Accounts', [
            'categories' => $this->categoryRepository->getAll(),
            'accountsFixed' => $this->accountsRepository->getAllFixed(),
            'accountsVariable' => $this->accountsRepository->getAllVariable(),
            'type' => $this->verifyType(),
            'totalFixed' => (float) $this->accountsRepository->getTotalFixed(),
            'totalVariable' => (float) $this->accountsRepository->getTotalVariable()
        ]);
    }

    public function store(Request $request)
    {
        $this->accountsRepository->store($request->all());
        return to_route($this->getContext());
    }

    public function update(string $id, Request $request)
    {
        $this->accountsRepository->update($id, $request->all());
        return to_route($this->getContext());
    }


}

