<include file="Inc/header" />

<div class="main_title">   
	<ul class="type_list clear"> 
	<li class="current"><a>管理员列表 </a> </li> 
	<li><a href="{:U('admin/admin_add')}">添加管理员 </a> </li>
	</ul>
</div>


<div class="margin10px searchbox">
	<form action="{:U('admin/admin_list')}" method="get">
		分组：{$groups}&nbsp;&nbsp;&nbsp;&nbsp;
		状态：<select name="st"><option value="">全部</option>
		<option value="1"  <if condition="$param['st'] eq 1"> selected  </if> >正常</option>
		<option value="0" <if condition="$param['st'] eq 0"> selected  </if> >禁用</option>
		</select>&nbsp;&nbsp;&nbsp;
		用户名：<input type="text" name="admin_name_like" style="width:80px;" value="{$param['admin_name_like']}" />
		&nbsp;&nbsp;&nbsp;<input type="submit" name="so" class="button" value="搜索" />
	</form>
</div>
<div class="margin10px">
	<table class="mytable">
		<tr>
			<th>ID</th>
			<th>用户名</th>
			<th>真实姓名</th>
            <th>分组</th>
			<th>状态</th>
			<th>操作</th>
		</tr>
		
	    <notempty name="list">
		<volist name="list" id="v">
		<tr>
			<td class="tdf">{$v['admin_id']}</td>
			<td>{$v['admin_name']}</td>
			<td>{$v['admin_real_name']}</td>
            <td>{$v['group_name']}</td>
			<td><span class="cursorpointer" onclick="adminStatus({$v['admin_id']}, <if condition="$v['st'] eq 1"> 0 <else /> 1 </if> )">
			<if condition="$v['st'] eq 1"> <font color="green">正常</font><else />  <font color="red">禁用</font></if></span></td>
			<td>
<span class="seldown-box rel">
	<a href="javascript:;" class="seldown-btn trans">选项<i class="icon-reorder"></i></a>
	<div class="seldown-menu abs">
            <i class="icon-caret-down"></i>
            <a href="{:U('admin/admin_edit', array('admin_id'=>$v['admin_id']))}" class="btn">修改</a>
            <hr class="line">
            <a href="{:U('admin/admin_del', array('admin_id'=>$v['admin_id']))}" class="btn" onclick="javascript:return confirm('提示：您确定要删除吗？')">删除</a> 
	</div>
</span>
            </td>
		</tr>
		</volist>
		<else/>
		<tr>
			<td colspan="6">没有数据</td>
		</tr>
	  </notempty>
	</table>
    <div style="height:10px;">&nbsp;</div>
	<?php echo $pager;?>
</div>
<script type="text/javascript">
function adminStatus(admin_id, st){
	$.ajax({
		url:'{:U('ajax_admin_st')}',
		data:({'admin_id':admin_id, 'st':st}),
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
<include file="Inc/footer" />