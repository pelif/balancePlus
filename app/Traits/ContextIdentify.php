<?php

namespace App\Traits;

trait ContextIdentify
{
    private function verifyType(): int | null
    {
        $currentPath = request()->path();
        if (strpos($currentPath, 'receitas') !== false) return 1;
        if (strpos($currentPath, 'despesas') !== false) return 2;
        return null;
    }

    private function getContext(): string
    {
        $currentPath = request()->path();
        if (strpos($currentPath, 'receitas') !== false) return 'receitas';
        if (strpos($currentPath, 'despesas') !== false) return 'despesas';
        return '';
    }
}
