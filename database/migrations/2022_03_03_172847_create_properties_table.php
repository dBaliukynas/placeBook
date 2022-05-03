<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->unsignedBigInteger('author_id')->nullable();
            $table->string('country');
            $table->string('city');
            $table->string('address');
            $table->string('region')->nullable();
            $table->string('postcode')->nullable();
            $table->string('type');
            $table->bigInteger('price');
            $table->float('rating', 10, 2)->nullable();
            $table->bigInteger('review_count')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
