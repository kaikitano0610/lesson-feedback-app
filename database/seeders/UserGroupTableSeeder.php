<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserGroupTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('user_group')->insert([
            [
                'user_id' => 2, 
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3, 
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
