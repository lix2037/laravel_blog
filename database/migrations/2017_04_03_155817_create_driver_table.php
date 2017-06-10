<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDriverTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //司机表
        Schema::create('driver', function (Blueprint $table) {
            $table->increments('driver_id');
            $table->string('name')->comment('司机姓名');
            $table->integer('age')->comment('年龄');
            $table->integer('experience')->comment('驾驶经验');
            $table->integer('sex')->default('1')->comment('性别,1男0女');
            $table->integer('phone')->comment('手机号');
            $table->string('address')->comment('联系地址');
            $table->integer('icard')->comment('身份证');
            $table->integer('license_number')->comment('驾照');
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
        Schema::dropIfExists('driver');
    }
}
