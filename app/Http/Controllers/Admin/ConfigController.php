<?php

namespace App\Http\Controllers\Admin;

/*
 * 系统配置
 *
 * */

class ConfigController extends CommonController
{
    //
    public function index()
    {
        return view('admin.config.index');
    }
}
