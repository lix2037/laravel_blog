<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use App\Http\Model\User;


class IndexController extends CommonController
{
    //
    public function index()
    {
    	return view('admin.index');
    }
    public function info()
    {
    	return view('admin.info');
    }
    public function server()
    {
    	dd($_SERVER);
    	echo "string";
    }
    public function pass()
    {
    	if($input = Input::all()){
            $rules = [
                'password' => 'required|between:6,20|confirmed',
            ];
            $messages = [
                'password.required'=>'新密码不能为空！',
                'password.between'=>'新密码长度在6-20位之间！',
                'password.confirmed'=>'新密码和确认密码不一致！',
            ];
            $validator = Validator::make($input,$rules,$messages);
            if($validator->passes()){
                $user = User::where(['username'=>get_user_name(),'type'=>0])->first();
                $user_pas = Crypt::decrypt($user->password);
               	if($user_pas != $input['password_o']){
               		return back()->with('errors','原密码错误！');
               	}else{
               		$user->password = Crypt::encrypt($input['password']);
               		$user->update();
               		return redirect('admin/info');
              	}
            }else{
                return back()->withErrors($validator);
            }
        }else{
            return view('admin.pass');
        }

    }
//    public function list()
//    {
//    	return view('admin.list');
//    }
    public function name()
    {
    	echo get_user_name();
    }
}
