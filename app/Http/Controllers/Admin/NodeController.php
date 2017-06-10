<?php

namespace App\Http\Controllers\Admin;

/*
 * 节点管理
 *
 * */

use App\Http\Model\Node;
use Illuminate\Support\Facades\Input;

class NodeController extends CommonController
{
    //
    public function index()
    {
        $node_pid = Input::get('node_pid');
        if($node_pid<1)
            $node_pid = 0;

        if($node_pid == 0){
            $search= array('node_pid'=>$node_pid);
        }else{
            $search= array('node_pid_path'=>','.$node_pid.',');
        }

        $node = new Node();
        $list = $node ->getNodeList($search);
//        dd($list);
        $datas = list_to_tree($list,'node_id', 'node_pid', '_sub', $node_pid);
//        dd($tree);
        return view('node.index', compact('datas') );
    }
}
