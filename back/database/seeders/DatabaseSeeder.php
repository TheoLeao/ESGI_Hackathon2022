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
            'role' => 'admin',
            'birth' => Date::now(),
            'size' => rand(150, 200),
            'weight' => rand(70, 100),
        ]);

        User::create([
            'name' => 'Testeur 1',
            'password' => bcrypt('admin123'),
            'email' => 'tester1@gmail.com',
            'role' => 'tester',
            'birth' => Date::now(),
            'size' => rand(150, 200),
            'weight' => rand(70, 100),
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
                'street' => '56 rue du pont',
                'city' => 'Lyon',
                'zipcode' => '69000',
                'country' => 'France',
                'latitude' => rand(0, 50),
                'longitude' => rand(0, 50),
            ]
        );

        $user->address()->associate($address);
        $user->save();

        /** @var Product $product */
        $product = Product::create([
            'name' => 'Crème main',
            'description' => 'Crème pour les mains fragiles',
            'brand' => 'Loreal',
            'code_product' => 'FR4853',
            'category' => 'cream',
        ]);

        /** @var Campaign $campaign */
        $campaign = new Campaign([
            'name' => 'Campagne de test',
            'state' => 'En cours',
            'description' => 'Campagne test de la crème',
        ]);

        $campaign->product()->associate($product);
        $campaign->save();

        /** @var Session $session */
        $session = new Session([
            'name' => 'Session 1',
            'description' => 'Session de test',
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
