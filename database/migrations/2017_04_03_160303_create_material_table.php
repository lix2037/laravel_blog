<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //材料表
        Schema::create('material', function (Blueprint $table) {
            $table->increments('material_id');
            $table->string('name')->comment('材料名');
            $table->integer('num')->comment('数量');
            $table->integer('price')->comment('单价');
            $table->integer('total')->default(0)->comment('总价');
            $table->integer('use_num')->default(0)->comment('使用量');
            $table->date('buytime')->comment('购买时间');
            $table->date('usetime')->comment('使用时间');
            $table->timestamps();//添加 created_at 和 updated_at列.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('material');
    }
}
