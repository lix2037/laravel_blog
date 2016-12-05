<?php

namespace App\Http\Controllers\Auth;

use App\Http\Model\User;
use Illuminate\Support\Facades\Crypt;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        /*return Validator::make($data, [
            'user_name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);*/
        $rules = [
            'user_name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ];
        $reset = "<a href="."'/password/reset'".">找回密码</a>";
        $message = [
            'user_name.required' => '用户名不能为空',
            'user_name.max' => '用户名长度不能超过255字节',
            'email.required' => '邮箱地址不能为空',
            'email.email' => '邮箱格式不正确',
            'email.max' => '邮箱长度不能超过255字节',
            'email.unique' => "邮箱账号已存在,您可以".$reset,
            'password.required' => '账号密码不能为空',
            'password.min' => '账号密码长度不能少于6位数字或字母',
            'password.confirmed' => '账号密码不一致',
        ];
        return Validator::make($data, $rules, $message);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' =>  Crypt::encrypt($data['password']),
//            'password' => bcrypt($data['password']),
            'is_admin' => $data['is_admin'],
        ]);
    }
}
