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
        $user_name = (session('admin')->user_name);
    	return view('admin.index',['user_name'=>$user_name]);
    }
    public function info()
    {
        $info = array(
            '操作系统'=>PHP_OS,
            '运行环境'=>$_SERVER["SERVER_SOFTWARE"],
            'PHP运行方式'=>php_sapi_name(),
            '上传附件限制'=>ini_get('upload_max_filesize'),
            '执行时间限制'=>ini_get('max_execution_time').'秒',
            '服务器时间'=>date("Y年n月j日 H:i:s"),
            '北京时间'=>gmdate("Y年n月j日 H:i:s",time()+3600*8),
            '服务器域名/IP'=>$_SERVER['SERVER_NAME'].' [ '.gethostbyname($_SERVER['SERVER_NAME']).' ]',
            '剩余空间'=>round((@disk_free_space(".")/(1024*1024)),2).'M',
//            'register_globals'=>get_cfg_var("register_globals")=="1" ? "ON" : "OFF",
//            'magic_quotes_gpc'=>(1===get_magic_quotes_gpc())?'YES':'NO',
//            'magic_quotes_runtime'=>(1===get_magic_quotes_runtime())?'YES':'NO',
        );
    	return view('admin.info',['info'=>$info]);
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
