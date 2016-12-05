<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::get('/job', function() {
    return view('job.index');
});

Route::any('admin/login','Admin\LoginController@login');
//注册功能 不开放
Route::any('admin/register','Admin\LoginController@register');
//
Route::get('admin/code','Admin\LoginController@code');

Route::group(['prefix' => 'admin','namespace'=>'Admin','middleware'=> 'admin.login'],  function() {
    //
    Route::get('index','IndexController@index');
    Route::get('name','IndexController@name');
    Route::get('info','IndexController@info');
    Route::get('logout','LoginController@logout');
    Route::any('pass','IndexController@pass');


    //文章分类管理 资源路由
    Route::resource('category','CategoryController');
    Route::post('category/changeOrder','CategoryController@changeOrder');

});
Route::any('/wechat','WechatController@serve');
Route::get('/shareWx','WechatController@shareWx');

//自定义菜单
Route::get('/menu_create','WechatController@menu_create');
Route::get('/menu_select','WechatController@menu_select');

Route::any('admin/encrypt','Admin\LoginController@encrypt');


