<?php

namespace App\Http\Controllers;

use App\Repositories\AccountsRepositoryInterface;
use App\Repositories\CategoryRepositoryInterface;
use App\Traits\ContextIdentify;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    use ContextIdentify;

    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository,
        protected AccountsRepositoryInterface $accountsRepository
    ) {}


    public function index()
    {

        return Inertia::render('Home', [
            'totalRevenuesFixed' => (float) $this->accountsRepository->getTotalRevenuesFixed(),
            'totalRevenuesVariable' => (float) $this->accountsRepository->getTotalRevenuesVariable(),
            'totalExpansesFixed' => (float) $this->accountsRepository->getTotalExpansesFixed(),
            'totalExpansesVariable' => (float) $this->accountsRepository->getTotalExpansesVariable(),
            'categories' => $this->accountsRepository->getTotalByCategoryWithName()['categories'],
            'revenuesFixed' => $this->accountsRepository->getTotalByCategoryWithName()['revenuesFixed'],
            'revenuesVariable' => $this->accountsRepository->getTotalByCategoryWithName()['revenuesVariable'],
            'expansesFixed' => $this->accountsRepository->getTotalByCategoryWithName()['expansesFixed'],
            'expansesVariable' => $this->accountsRepository->getTotalByCategoryWithName()['expansesVariable'],
        ]);
    }
}
