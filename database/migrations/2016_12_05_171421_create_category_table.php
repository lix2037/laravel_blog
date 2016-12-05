<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category', function (Blueprint $table) {
            $table->increments('cate_id');
            $table->string('cate_name');
            $table->string('cate_title');
            $table->string('cate_keywords')->default('')->comment('关键词');
            $table->string('cate_description')->default('')->comment('描述');
            $table->integer('cate_view')->default('0')->comment('查看次数');
            $table->tinyInteger('cate_order')->default('0');
            $table->integer('cate_pid')->default('0');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category');
    }
}
