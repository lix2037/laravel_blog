<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Input;
use App\Http\Model\User;
use Illuminate\Support\Facades\Validator;
use Mews\Captcha\Facades\Captcha;

class LoginController extends CommonController
{
    //登入
    public function login()
    {
    	if($input = Input::all()) {

            // dd($input);
            $rules = [
                'verify' => 'required|captcha',
                'user_name' => 'required',
                'password' => 'required|between:6,20',
            ];
            $messages = [
                'verify.required'=> '验证码不能为空',
                'verify.captcha' => '验证码错误，请重试',
                'user_name.required'=> '用户名不能为空',
                'password.required'=> '密码不能为空',
                'password.between'=> '密码长度在6-20位之间',
            ];
            $validator = Validator::make($input,$rules,$messages);
            if($validator->passes()){
                $user = User::where(['user_name'=>$input['user_name'],'is_admin' =>'1' ])->first();
                if($user){
                    $user_pass = Crypt::Decrypt($user['password']);
                    if($input['password'] != $user_pass){
                        return back()->with('errors','密码不正确，请重新输入')->withCookie();
                    }
                }else{
                    return back()->with('errors','用户名不存在');
                }
            }else{
                return back()->withErrors($validator);
            }
            session(['admin'=>$user]);
            return redirect('admin/index');
    	}else{
            session(['admin'=>null]);
    		return view('admin.login');
    	}
    	
    }

    /**
     * 创建验证码
     * @return mixed
     */
    public function code()
    {
        return Captcha::create('default');

    }
    /*
    *
    *获取验证码
    * 
     */
    public function getCodeImg()
    {
        return Captcha::img();
    }
    /*
    *注销账户
    * 
     */
    public function logout()
    {
        session(['user'=>'null']);
        return redirect('admin/login');
    }

    public function encrypt()
    {
//        #$str = 'eyJpdiI6IjUwZjJGcFh1T2ZObTRCTE92S2VKVVE9PSIsInZhbHVlIjoiWWxLc2JZWFUwRm40Q3FQeDNDb2Mrdz09IiwibWFjIjoiOWRmNDEzMjg5NzIxYWRiODExMjE4ZjBhNDMwMmI1YTBlYmE0N2MyZjhmYWIyZDYxNDYyZjUyNTdlYTU5YjM3OSJ9';
        $str = '123456';
//        $str = '$10$rvgwoV1PudbpYa939aOs6elg3ylh92p7udNfrdWoO8xfhdNB8KWOG';
//        Crypt::
        return Crypt::encrypt($str);
    }

    //后台注册功能 不开放
    public function register()
    {
        return view('admin.register');
    }

    public function test(Request $request)
    {
//        $cookie = $request->cookie();
        $cookie = cookie('name','value',10);
//        $a = cookie::get('name');
//        dd($a);

        var_dump($cookie);
    }

    public function gettest(Request $request)
    {
        $cookie = $request->cookie('name');
//        $cookie = cookie('name','value',10);
//        $a = cookie::get('name');
//        dd($a);
        var_dump($cookie);
        $cookie = cookie('name','value',10);
        return response('hahaha')->cookie('name','value',10);



    }


    
}
