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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // ユーザーとのリレーション。ユーザーが削除されたら同時に削除
            $table->string('youtube_link');
            $table->string('subject'); // 教科
            $table->string('school_type'); // 校種
            $table->string('grade'); // 学年
            $table->string('pdf_path')->nullable(); // PDFファイルのパス
            $table->timestamps(); // created_at と updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
