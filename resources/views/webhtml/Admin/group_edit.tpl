<include file="Inc/header" />
<div class="margin10px">
	<form name="addpage" method="post" action="{:U()}" onsubmit="return checkNode();">
    	<input type="hidden" name="group_id" value="{$detail['group_id']}" />
		<table class="mytable">
			<tr>
				<th colspan="2">{$detail['group_id']?'编辑':'新增'}分组</th>
			</tr>
            <tr>
                <td width="100" class="tdf">所属分组：</td>
                <td>{$groups}</td>
            </tr>
			<tr>
				<td width="100" class="tdf">分组名称：</td>
				<td><input type="text" id="group_name" name="group_name" size="40" value="{$detail['group_name']}" /><span></span></td>
			</tr>
			<tr>
				<td class="tdf" valign="top">分组权限：</td>
				<td>
                    <div class="node_list">
						<notempty name="nodes">
						<volist name="nodes" id="v">
                        <div class="item"><input class="cb" type="checkbox" name="auth[]" id="n_{$v['node_id']}" value="{$v['node_id']}" <?php if($v['has']){echo 'checked="checked"';}?>>
						<label for="n_{$v['node_id']}" class="color_0 fb f14">{$v['node_name']}</label>
						    <volist name="v['_sub']" id="vv">
                                <div class="mleft30px"><input class="cb" type="checkbox" name="auth[]" id="n_{$vv['node_id']}" value="{$vv['node_id']}" <?php if($vv['has']){echo 'checked="checked"';}?> />
								<label for="n_{$vv['node_id']}" class="fb">{$vv['node_name']}</label>
                                    <div class="mleft60px bd1sccc">
									   <volist name="vv['_sub']" id="vvv">
                                        <input type="checkbox" name="auth[]" id="n_{$vvv['node_id']}" value="{$vvv['node_id']}" <?php if($vvv['has']){echo 'checked="checked"';}?> />
										<label for="n_{$vvv['node_id']}">{$vvv['node_name']}</label>&nbsp;&nbsp;&nbsp;
                                        </volist>
                                    </div>
                                </div>
                           </volist>
                        </div>
					</volist>
					<else/>
					没有数据
					</notempty>
                    </div>
                </td>
			</tr>
			<tr>
				<td class="tdf">&nbsp;</td>
				<td><input type="checkbox" id="cka" onclick="checkAll(this, 'auth[]')" />全选&nbsp;&nbsp;&nbsp;<input type="submit" name="formsubmit" value="提交" class="button" /></td>
			</tr>
		</table>
	</form>
</div>
<script type="text/javascript">
    $('.cb').click(function(){
        var flag = false;
        if($(this).attr('checked')){ flag = true; }
        $(this).parent().find('input[type="checkbox"]').attr('checked', flag);
    });
	//检查表单
	function checkNode(){
		if($.trim($('#group_name').val())==''){
			$('#group_name').css('background-color','#ffc');
			$('#group_name').next('span').html('<font color=red> 分组名称不能为空</font>');
			$('#group_name').focus();
			return false;
		}
	}
</script>
<include file="Inc/footer" />