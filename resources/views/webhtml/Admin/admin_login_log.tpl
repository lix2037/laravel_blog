<include file="Inc/header" />

<div class="main_title">
	<ul class="type_list clear"> 
           <li class="current"><a>管理员登录日志</a></li>
    </ul>
</div>


<div class="margin10px searchbox">
	<form action="{:U('')}" method="get">
		用户名：<input type="text" name="admin_name_like" style="width:80px;" value="{$param['admin_name_like']}" />
		&nbsp;&nbsp;&nbsp;<input type="submit" name="so" class="button" value="搜索" />
	</form>
</div>
<div class="margin10px">
	<table class="mytable">
		<tr>
			<th width="80">记录ID</th>
			<th>管理员ID</th>
			<th>用户名</th>
			<th>登录IP</th>
            <th>登录时间</th>
			<th>登录地</th>
		</tr>
	    <notempty name="list">
		<volist name="list" id="v">
		<tr>
			<td class="tdf">{$v['login_log_id']}</td>
			<td>{$v['admin_id']}</td>
			<td>{$v['admin_name']}</td>
            <td>{$v['login_ip']}</td>
            <td>{$v['login_ts']}</td>
            <td>{$v['login_region']}</td>
		</tr>
		</volist>
		<else/>
		<tr>
			<td colspan="6">没有数据</td>
		</tr>
	  </notempty>
	</table>
    <div style="height:10px;">&nbsp;</div>
    
    <div class="pagenum">{$pager}</div>
	
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