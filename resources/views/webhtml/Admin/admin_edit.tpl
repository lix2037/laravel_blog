<include file="Inc/header" />
<div class="margin10px">
    <form name="addpage" method="post" action="{:U()}">
        <input type="hidden" name="admin_id" value="{$detail['admin_id']}" />
        <table class="mytable">
            <tr>
                <th colspan="2">{$detail['admin_id']?'编辑':'新增'}用户</th>
            </tr>
            <tr>
                <td width="100" class="tdf">用户名称：</td>
				<td> 
				{$detail['admin_id']? $detail['admin_name'] : '<input type="text" id="admin_name" name="admin_name" size="40" />' }
				<span></span></td>
            </tr>

            <tr>
                <td width="100" class="tdf">真实名称：</td>
				<td> 
				<input type="text" id="admin_real_name" name="admin_real_name"  size="40" value="{$detail['admin_real_name']}" />
				<span></span></td>
            </tr>
            

            <tr>
                <td class="tdf">用户密码：</td>
                <td><input type="password" id="admin_password" name="admin_password" size="40" /><span>&nbsp;不修改不用填写</span></td>
            </tr>
            <tr>
                <td class="tdf">所属分组：</td>
                <td>
                    {$groups}&nbsp;
                    <span style="cursor:pointer;" onclick="javascript:document.getElementById('admin_group_id').disabled=false;" title="重新选择分组">[+]</span>
                </td>
            </tr>
            <tr>
                <td class="tdf" valign="top">用户权限：</td>
                <td>
                    <div class="node_list">{$nodes}</div>
                </td>
            </tr>
            <tr>
                <td class="tdf">&nbsp;</td>
                <td>
                    <input type="checkbox" id="cka" onclick="checkAll(this, 'auth[]')" />全选&nbsp;&nbsp;&nbsp;
                    <input type="submit" name="formsubmit" value="提交" class="button" />
                </td>
            </tr>
        </table>
    </form>
</div>
<script type="text/javascript">
    $('.cb').live('click', function(){
        var flag = false;
        if($(this).attr('checked')){ flag = true; }
        $(this).parent().find('input[type="checkbox"]').attr('checked', flag);
    });
    //得到分组的权限
    function getGroupAcl(group_id)
    {
        $.ajax({
            url:'{:U('ajax_get_nodes_checkbox')}',
            data:({'group_id':group_id}),
            dataType:'html',
            success:function(msg){
                if(msg == 'no'){
                    $('.node_list').html('');
                }
                $('.node_list').html(msg);
            }
        })
    }
</script>
<include file="Inc/footer" />