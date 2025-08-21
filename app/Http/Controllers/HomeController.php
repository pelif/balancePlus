<?php

namespace App\Http\Controllers;

use App\Repositories\AccountsRepositoryInterface;
use App\Repositories\CategoryRepositoryInterface;
use App\Traits\ContextIdentify;
use App\Traits\FilterDates;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    use ContextIdentify, FilterDates;

    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository,
        protected AccountsRepositoryInterface $accountsRepository
    ) {}


    public function index(?string $initialDate = null, ?string $finalDate = null)
    {
        $dates = $this->filterDates($initialDate, $finalDate);

        return Inertia::render('Home', [
            'totalRevenuesFixed' => (float) $this->accountsRepository->getTotalRevenuesFixed(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'totalRevenuesVariable' => (float) $this->accountsRepository->getTotalRevenuesVariable(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'totalExpansesFixed' => (float) $this->accountsRepository->getTotalExpansesFixed(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'totalExpansesVariable' => (float) $this->accountsRepository->getTotalExpansesVariable(),
            'categories' => $this->accountsRepository->getTotalByCategoryWithName($dates['initialDate'], $dates['finalDate'])['categories'],
            'revenuesFixed' => $this->accountsRepository->getTotalByCategoryWithName($dates['initialDate'], $dates['finalDate'])['revenuesFixed'],
            'revenuesVariable' => $this->accountsRepository->getTotalByCategoryWithName($dates['initialDate'], $dates['finalDate'])['revenuesVariable'],
            'expansesFixed' => $this->accountsRepository->getTotalByCategoryWithName($dates['initialDate'], $dates['finalDate'])['expansesFixed'],
            'expansesVariable' => $this->accountsRepository->getTotalByCategoryWithName($dates['initialDate'], $dates['finalDate'])['expansesVariable'],
            'totalRevenuesFixed' => (float) $this->accountsRepository->getTotalRevenuesFixed(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'totalRevenuesVariable' => (float) $this->accountsRepository->getTotalRevenuesVariable(
                $dates['initialDate'],
                $dates['finalDate']
            ),
            'filterDates' => $dates
        ]);
    }
}
