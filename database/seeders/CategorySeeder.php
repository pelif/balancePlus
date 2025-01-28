<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;



class CategorySeeder extends Seeder
{


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $categories = [
            [
                'id' => Str::uuid(),
                'title' => 'Alimentação'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Transporte'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Lazer'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Combustível'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Educação'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Moradia'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Impostos'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Fornecedores'
            ],
            [
                'id' => Str::uuid(),
                'title' => 'Entretenimento'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }

}

