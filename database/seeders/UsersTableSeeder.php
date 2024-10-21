<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Adminユーザーの作成
        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'password' => Hash::make('password'), // パスワードをハッシュ化
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Generalユーザーの作成（10人分）
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => "General{$i}",
                'email' => "user{$i}@test.com",
                'password' => Hash::make('password'),
                'role' => 'general',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
