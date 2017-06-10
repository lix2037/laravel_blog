<include file="Inc/header" />
<div class="main_title">  
<ul class="type_list clear">  
	<li class="current"><a>分组列表 </a> </li> 
	<li><a href="{:U('admin/group_add')}">添加分组 </a> </li>
</ul>
</div>

<div class="margin10px">
	<table class="mytable">
		<tr>
			<th>ID</th>
			<th>分组名称</th>
			<th>状态</th>
			<th>操作</th>
		</tr>
	    <notempty name="list">
		<volist name="list" id="v">
		<tr>
			<td class="tdf">{$v['group_id']}</td>
			<td <if condition="$v['group_pid'] eq 0 ">class="bgc_eaf7fe"</if> > <?php echo str_repeat('&nbsp;', 9*(intval($v['group_depth']))).$v['group_name'];?>  </td>
			<td><span class="cursorpointer" onclick="groupStatus({$v['group_id']}, <if condition="$v['st'] eq 1"> 0 <else /> 1 </if> )">
			<if condition="$v['st'] eq 1"> <font color="green">正常</font><else />  <font color="red">禁用</font></if></span></td>
			<td>
<span class="seldown-box rel">
	<a href="javascript:;" class="seldown-btn trans">选项<i class="icon-reorder"></i></a>
	<div class="seldown-menu abs">
            <i class="icon-caret-down"></i>
            <a href="{:U('admin/group_edit', array('group_id'=>$v['group_id']))}" class="btn">修改</a>
            <hr class="line">
            <a href="{:U('admin/group_del', array('group_id'=>$v['group_id']))}" class="btn" onclick="javascript:return confirm('提示：您确定要删除吗？')">删除</a>
	</div>
</span>
            </td>
		</tr>
		</volist>
		<else/>
		<tr>
			<td colspan="4">没有数据</td>
		</tr>
	  </notempty>
	</table>
</div>
<script type="text/javascript">
function groupStatus(group_id, st){
	$.ajax({
		url:'{:U('ajax_group_st')}',
		data:({'group_id':group_id, 'st':st}),
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