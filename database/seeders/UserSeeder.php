<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $max_length = 100;
        $users_csv = fopen(base_path("database/users.csv"), "r");
        fgetcsv($users_csv);
        if ($users_csv !== false) {
            while (($data = fgetcsv($users_csv, $max_length, ",")) !== false) {
                DB::table('users')->insert([
                    'name' => $data[0],
                    'email' => $data[1],
                    'password' => Hash::make('password'),
                    'role' => 'regular',
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ]);
            }
            fclose($users_csv);
        }
    }
}
