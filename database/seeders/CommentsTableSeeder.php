<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('comments')->insert([
            [
                'video_id' => 1,
                'user_id' => 2, // General user
                'time' => 120,
                'evaluation' => 'good',
                'feedback_category' => 'speech/communication',
                'comment_content' => 'Great explanation!',
                'x_coordinate' => 100,
                'y_coordinate' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'video_id' => 2,
                'user_id' => 2, 
                'time' => 90,
                'evaluation' => 'improvement',
                'feedback_category' => 'activity/development',
                'comment_content' => 'Could have been more interactive.',
                'x_coordinate' => 150,
                'y_coordinate' => 250,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
