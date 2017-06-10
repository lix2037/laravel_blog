@extends('layouts.admin')
@section('content')
    <div class="main_title">
        <ul class="type_list clear">
            <li class="current"><a>节点列表</a> </li>
            <li><a href="{{url('admin/node/add')}}">添加节点</a> </li>
        </ul>
    </div>

    <div class="margin10px">
        <table class="mytable">
            <tr>
                <th>ID</th>
                <th>排序</th>
                <th>节点名称</th>
                <th>节点地址</th>
                <th>显示级别</th>
                <th>状态</th>
                <th>操作</th>
            </tr>

           {{-- <notempty name="list">
                <volist name="list" id="v">

                    <tr --}}{{--<if condition="$v['node_pid'] eq 0"> --}}{{-- class="bglightyellow" --}}{{--</if> --}}{{-->
                    <td class="tdf">{$v['node_id']}</td>
                    <td>{$v['px']}</td>
                    <td><strong>{$v['node_name']}</strong></td>
                    <td><strong>{$v['m_c_a']}</strong></td>
                    <td <if condition="($v['node_level'] eq 1) OR ($v['node_level'] eq 2) "> class="bglightgreen"  </if> >
                    <if condition="($v['node_level'] eq 1)"> 顶部菜单<elseif condition="$v['node_level'] eq 2"/>左边一级菜单<elseif condition="$v['node_level'] eq 3"/>左边二级子单<else/> 隐藏式菜单</if></td>
                    <td align="center"><span class="cursorpointer" onclick="nodeStatus({$v['node_id']},<if condition="$v['st'] eq 1"> 0 <else /> 1 </if> )">
                        <if condition="$v['st'] eq 1"> <font color="green">正常</font><else />  <font color="red">禁用</font></if></span>
                    </td>
                    <td>
<span class="seldown-box rel">
	<a href="javascript:;" class="seldown-btn trans">选项<i class="icon-reorder"></i></a>
	<div class="seldown-menu abs">
            <i class="icon-caret-down"></i>
                <a href="{:U('node/add', array('node_pid'=>$v['node_id']))}" class="btn">添加子菜单</a>
                <if condition="$v['node_pid'] eq 0">  <a href="{:U('node/index', array('node_pid'=>$v['node_id']))}" class="btn" >管理子菜单</a> </if>
                <a href="{:U('node/edit', array('node_id'=>$v['node_id']))}" class="btn">修改</a>
                <hr class="line" />
                <a href="{:U('node/del', array('node_id'=>$v['node_id']))}" onclick="javascript:return confirm('提示：您确定要删除吗？')" class="btn" >删除</a>
	</div>
</span>
                    </td>
                    </tr>
                    <!--Begin::左边二级菜单、隐藏菜单-->

                    <volist name="v['_sub']" id="vv">
                        <tr>
                            <td class="tdf">{$vv['node_id']}</td>
                            <td style="padding-left:30px;">{$vv['px']}</td>
                            <td style="padding-left:30px;">{$vv['node_name']}</td>
                            <td style="padding-left:30px;">{$vv['m_c_a']}</td>
                            <td <if condition="($vv['node_level'] eq 1) OR ($vv['node_level'] eq 2) "> class="bglightgreen"  </if> >
                            <if condition="($vv['node_level'] eq 1)"> 顶部菜单 <elseif condition="$vv['node_level'] eq 2"/>左边一级菜单<elseif condition="$vv['node_level'] eq 3"/>左边二级子单<else /> 隐藏式菜单</if></td>
                            <td align="center"><span class="cursorpointer" onclick="nodeStatus({$vv['node_id']},<if condition="$vv['st'] eq 1"> 0 <else /> 1 </if> )">
                                <if condition="$vv['st'] eq 1"> <font color="green">正常</font><else />  <font color="red">禁用</font></if></span>
                            </td>
                            <td>
<span class="seldown-box rel">
	<a href="javascript:;" class="seldown-btn trans">选项<i class="icon-reorder"></i></a>
	<div class="seldown-menu abs">
            <i class="icon-caret-down"></i>
            <a href="{:U('node/edit', array('node_id'=>$vv['node_id'], 'third'=>'y'))}" class="btn">修改</a>
            <hr class="line">
            <a href="{:U('node/del', array('node_id'=>$vv['node_id']))}" onclick="javascript:return confirm('提示：您确定要删除吗？')" class="btn">删除</a>
	</div>
</span>
                            </td>
                        </tr>
                    </volist>
                    <!--End::左边二级菜单、隐藏菜单-->
                </volist>
                <else/>
                <tr>
                    <td colspan="8">没有数据</td>
                </tr>
            </notempty>--}}
            @foreach($datas as $data)
                <tr  class="bglightyellow" >
                    <td class="tdf">{{$data['node_id']}}</td>
                    <td>{{$data['px']}}</td>
                    <td><strong>{{$data['node_name']}}</strong></td>
                    <td><strong>{{$data['m_c_a']}}</strong></td>
                    <td
                        @if($data['node_level'] == 1 || $data['node_level'] == 2)
                        class="bglightgreen"
                        @endif
                    >
                        @if($data['node_level'] == 1)
                            顶部菜单
                        @elseif($data['node_level'] == 2)
                            左边一级菜单
                        @elseif($data['node_level'] == 3)
                            左边二级子单
                        @else
                            隐藏式菜单
                        @endif

                    </td>
                    <td align="center"><span class="cursorpointer" onclick="nodeStatus({{$data['node_id']}},
                        @if($data['st'] == 1)
                                0
                        @else
                                1
                        @endif
                        )">
                            @if($data['st'] == 1)
                                <font color="green">正常</font>
                            @else
                                <font color="red">禁用</font>
                            @endif
                        </span>
                    </td>
                    <td>
<span class="seldown-box rel">
	<a href="javascript:;" class="seldown-btn trans">选项<i class="icon-reorder"></i></a>
	<div class="seldown-menu abs">
            <i class="icon-caret-down"></i>
                <a href="{{--{:U('node/add', array('node_pid'=>$v['node_id']))}--}}
                        {{url('admin/node/add')}}
                        " class="btn">添加子菜单</a>
                <if condition="$v['node_pid'] eq 0">  <a href="{:U('node/index', array('node_pid'=>$v['node_id']))}" class="btn" >管理子菜单</a> </if>
                <a href="{:U('node/edit', array('node_id'=>$v['node_id']))}" class="btn">修改</a>
                <hr class="line" />
                <a href="{:U('node/del', array('node_id'=>$v['node_id']))}" onclick="javascript:return confirm('提示：您确定要删除吗？')" class="btn" >删除</a>
	</div>
</span>
                    </td>
                </tr>
                @endforeach
        </table>
    </div>
    <script type="text/javascript">
        function nodeStatus(node_id, st){
            $.ajax({
                    url:'{:U('node/ajax_node_st')}',
                data:({'node_id':node_id, 'st':st}),
                type:'post',
                success:function(msg){
                if(msg == 'ok'){
                    alert('操作成功');
                    location.reload();
                }else{
                    alert(msg);
                }
            },
            error:function(){
                alert('网络繁忙，请稍后重试');
            }
        })
        }
    </script>
@endsection