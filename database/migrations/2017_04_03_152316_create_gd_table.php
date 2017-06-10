<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGdTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //工地列表
        Schema::create('gd', function (Blueprint $table) {
            $table->increments('gd_id');
            $table->string('gd_name')->comment('工地名称');
            $table->string('gd_people')->comment('工地联系人');
            $table->integer('gd_phone')->comment('工地联系人电话');
            $table->string('gd_total')->default('')->comment('工地座机');
            $table->string('gd_address')->default('')->comment('地址');
            $table->integer('gd_DeliveryNum')->default(0)->comment('送货次数');
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
        Schema::dropIfExists('gd');
    }
}
