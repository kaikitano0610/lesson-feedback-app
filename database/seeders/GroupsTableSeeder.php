<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('groups')->insert([
            [
                'group_name' => 'Group A',
                'project_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'group_name' => 'Group B',
                'project_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
