<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade'); // 動画とのリレーション
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // ユーザーとのリレーション
            $table->integer('time'); // 再生時間
            $table->enum('evaluation', ['good', 'improvement']); // 良い点か改善点か
            $table->enum('feedback_category', ['speech/communication', 'board/materials', 'activity/development']); // フィードバックのカテゴリ
            $table->text('comment_content'); // コメント内容
            $table->float('x_coordinate'); // 動画内でのx座標
            $table->float('y_coordinate'); // 動画内でのy座標
            $table->timestamps(); // created_at と updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
