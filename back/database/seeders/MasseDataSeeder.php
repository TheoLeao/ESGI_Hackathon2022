<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Campaign;
use App\Models\Product;
use App\Models\Question;
use App\Models\Response;
use App\Models\Session;
use App\Models\User;
use App\Models\UserSession;
use App\Models\UserResponse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MasseDataSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 200; $i++) {
            $user = User::create([
                'name' => Str::random(),
                'password' => bcrypt(Str::random()),
                'email' => Str::random() . '@gmail.com',
                'role' => 'tester',
            ]);


            DB::table('user_responses')->insert(
                [
                    'response_id' => rand(4, 6),
                    'question_id' => 4,
                    'user_id' => $user->id,
                ]
            );

            DB::table('user_responses')->insert(
                [
                    'response_id' => rand(7, 9),
                    'question_id' => 5,
                    'user_id' => $user->id,
                ]
            );

            DB::table('user_responses')->insert(
                [
                    'response_id' => rand(10, 13),
                    'question_id' => 6,
                    'user_id' => $user->id,
                ]
            );
        }
    }
}
