<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideosTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('videos')->insert([
            [
                'title' => 'Sample Video 1',
                'user_id' => 2,
                'youtube_link' => 'https://youtube.com/sample-video-1',
                'posted_date' => now(),
                'subject' => 'Math',
                'school_type' => 'Elementary',
                'grade' => '４年',
                'pdf_path' => 'path/to/pdf1.pdf',
                'created_at' => now(),
                'updated_at' => now(),
                'group_id' => 1,
            ],
            [
                'title' => 'Sample Video 2',
                'user_id' => 2,
                'youtube_link' => 'https://youtube.com/sample-video-2',
                'posted_date' => now(),
                'subject' => 'Science',
                'school_type' => 'High School',
                'grade' => '3年',
                'pdf_path' => 'path/to/pdf2.pdf',
                'created_at' => now(),
                'updated_at' => now(),
                'group_id' => 1,
            ],
        ]);
    }
}
