<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => Str::random(10),
            'brand' => Str::random(10),
            'code_product' => Str::random(10),
            'state' => Str::random(20),
            'start' => Carbon::now(),
            'end' => Carbon::now(),
        ]);
    }
}
