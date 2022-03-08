<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\F;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('addresses')->insert([
            'street' => Str::random(10),
            'city' => Str::random(10),
            'zipcode' => Str::random(10),
            'country' => Str::random(10),
            'latitude' => rand(50),
            'longitude' => rand(50),
        ]);
    }
}
