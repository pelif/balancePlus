<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->default(Str::uuid());
            $table->text('title')->nullable();
            $table->timestamps();
            $table->primary('id');
        });

        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->default(Str::uuid());
            $table->text('title')->nullable();
            $table->text('description')->nullable();
            $table->string('origin')->nullable();
            $table->decimal('value', 10, 2);
            $table->integer('type');
            $table->datetime('due_date')->nullable();
            $table->boolean('is_fixed')->default(true);
            $table->boolean('is_paid')->default(false);
            $table->uuid('category_id');

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
            $table->primary('id');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
        Schema::dropIfExists('categories');
    }
};
