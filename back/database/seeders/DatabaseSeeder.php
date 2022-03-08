<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Campaign;
use App\Models\Product;
use App\Models\Session;
use App\Models\User;
use App\Models\UserSession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        User::create([
            'name' => 'admin123',
            'password' => bcrypt('admin123'),
            'email' => 'admin123@gmail.com',
            'role' => 'admin'
        ]);

        /** @var User $user */
        $user = User::create([
            'name' => 'tester123',
            'password' => bcrypt('tester123'),
            'email' => 'tester123@gmail.com',
            'role' => 'tester',
            'birth' => Date::now(),
            'size' => rand(150, 200),
            'weight' => rand(70, 100),
        ]);

        $address = Address::create(
            [
                'street' => Str::random(10),
                'city' => Str::random(10),
                'zipcode' => Str::random(10),
                'country' => Str::random(10),
                'latitude' => rand(0, 50),
                'longitude' => rand(0, 50),
            ]
        );

        $user->address()->associate($address);
        $user->save();

        /** @var Product $product */
        $product = Product::create([
            'name' => Str::random(10),
            'description' => Str::random(10),
            'brand' => Str::random(10),
            'code_product' => Str::random(10),
            'category' => Str::random(10),
        ]);

        /** @var Campaign $campaign */
        $campaign = new Campaign([
            'name' => Str::random(10),
            'state' => Str::random(10),
            'description' => Str::random(10),
        ]);

        $campaign->product()->associate($product);
        $campaign->save();

        /** @var Session $session */
        $session = new Session([
            'name' => Str::random(10),
            'start' => Date::now(),
            'end' => Date::now()
        ]);
        $session->campaign()->associate($campaign);
        $session->save();

        $userSession = new UserSession();
        $userSession->user()->associate($user);
        $userSession->session()->associate($session);
        $userSession->save();
    }
}
