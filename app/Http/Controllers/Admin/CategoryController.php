<?php

namespace App\Http\Controllers\Admin;

use App\Http\Model\Category;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class CategoryController extends CommonController
{
    //文章控制器
//| admin.cate.index     | App\Http\Controllers\admin\CategoryController@index@index     | web,admin.login |
// |        | POST                           | admin/cate                   | admin.cate.store     | App\Http\Controllers\admin\CategoryController@index@store     | web,admin.login |
// |        | GET|HEAD                       | admin/cate/create            | admin.cate.create    | App\Http\Controllers\admin\CategoryController@index@create    | web,admin.login |
// |        | DELETE                         | admin/cate/{cate}            | admin.cate.destroy   | App\Http\Controllers\admin\CategoryController@index@destroy   | web,admin.login |
// |        | GET|HEAD                       | admin/cate/{cate}            | admin.cate.show      | App\Http\Controllers\admin\CategoryController@index@show      | web,admin.login |
// |        | PUT|PATCH                      | admin/cate/{cate}            | admin.cate.update    | App\Http\Controllers\admin\CategoryController@index@update    | web,admin.login |
// |        | GET|HEAD                       | admin/cate/{cate}/edit       | admin.cate.edit 
    /**
     * 列表 get
     *
     */
    public function index()
    {
//        $datas = DB::table('category')->get();
//        $datas = Category::paginate(10);

        $datas = (new Category)->tree();

        return view('category.index',compact('datas'));
    }
    /**
     * post 提交分类
     */
    public function store()
    {
        $input = Input::except('_token');
        $rules = [
            'cate_name' => 'required',
        ];
        $messages = [
            'cate_name.required'=> '分类名称不能为空',
        ];
        $vilidotr = Validator::make($input,$rules,$messages);
        if($vilidotr->passes()){
            $re = Category::insert($input);
            if($re){
                return redirect('admin/category');
            }else{
                return back()->with('errors','数据填充失败，请重试');
            }
        }else{
            return back()->withErrors($vilidotr);
        }
//        dd($input);
    }
    /**
     * 添加 get
     */
    public function create()
    {
        $data = Category::where('cate_pid','=',0)->get();

        return view('category.add',compact('data'));
    }
    /**
     * 删除 delete
     */
    public function destroy($cate_id)
    {
        $re = Category::where('cate_id',$cate_id)->delete();
        Category::where('cate_pid',$cate_id)->update(['cate_pid'=>0]);
        if($re){
            $data = [
                'status' => 0,
                'msg' => '分类删除成功！',
            ];
        }else{
            $data = [
                'status' => 1,
                'msg' => '分类删除失败，请稍后重试！',
            ];
        }
        return $data;
    }
    /**
    * 列表 详情
    */
    public function show()
    {
    
    }
    /**
     * 更新 put
     */
    public function update($cate_id)
    {
        $input = Input::except('_token','_method');
        $re = Category::where('cate_id',$cate_id)->update($input);

        if($re){
            return redirect('admin/category');
        }else{
            return back()->with('errors','数据修改失败，请检查后重试');
        }
//        dd($input);
    }
    /**
     * 修改
     */
    public function edit($cate_id)
    {
        $cate = Category::find($cate_id);
        $data = Category::where('cate_pid',0)->get();

        return view('category.edit',compact('cate','data'));
    }
    /*
     * 更改排序
     * */
    public function changeOrder()
    {
        $input = Input::all();
        $cate = Category::find($input['cate_id']);
        $cate->cate_order = $input['cate_order'];
        $re = $cate->update();
        if($re){
            $data = [
                'status' => 0,
                'msg' => '排序更新成功'
            ];
        }else{
            $data = [
                'status' => 1,
                'msg' => '排序更新失败，请检查重试'
            ];
        }
        return $data;
    }
}
