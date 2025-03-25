<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // DBファサードをインポート

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'project_name' => 'Test Project 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Test Project 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
