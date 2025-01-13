<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserGroupTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('user_groups')->insert([
            [
                'user_id' => 1, // Admin
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2, // General
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
