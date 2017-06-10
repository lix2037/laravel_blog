<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeliverNoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('deliver_note', function (Blueprint $table) {
            $table->increments('deliver_id');
            $table->integer('invoice')->comment('订单号');
            $table->string('content')->comment('送货内容');
            $table->date('deliveryTime')->comment('送货时间');
            $table->integer('weight')->default(0)->comment('容量（重量）数量');
            $table->integer('price')->default(0)->comment('单价');
            $table->integer('total')->default(0)->comment('总价');
            $table->integer('gd_id')->comment('工地ID');
            $table->integer('driver_id')->comment('司机ID');

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
        Schema::dropIfExists('deliver_note');
    }
}
