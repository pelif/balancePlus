<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait FilterDates
{
    public function filterDates(?string $initialDate = null, ?string $finalDate = null)
    {
        $initialDate = $initialDate ?? null;
        $finalDate = $finalDate ?? null;

        if (is_null($initialDate) && is_null($finalDate)) {
            $initialDate = now()->startOfMonth()->format('Y-m-d');
            $finalDate = now()->format('Y-m-d');
        }

        return [
            'initialDate' => $initialDate,
            'finalDate' => $finalDate
        ];
    }
}
