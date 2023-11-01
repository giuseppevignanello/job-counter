<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = json_decode(file_get_contents(__DIR__ . "/cateogries.json"), true);

        foreach ($categories as $category) {
            $newCategory = new Category();
            $newCategory->name = $category["name"];
            $newCategory->save();
        }
    }
}
