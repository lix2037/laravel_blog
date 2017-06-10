@extends('layouts.admin')
@section('content')

    <div class="main_title">
        <ul class="type_list clear">
            <li class="current"><a href="">系统配置</a></li>
            <li><a href="">添加配置</a></li>
        </ul>
    </div>

    <div class="margin10px">
        <form name="myForm" id="myForm" action="" method="post" enctype="multipart/form-data" />
        <div id="page_main">
            <ul class="tabs" id="tabs">
                <li>站点信息</li>
                <li>邮件信息</li>
                <li>会员信息</li>
            </ul>

            <ul class="tab_conbox" id="tab_conbox">
                <li class="tab_con">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="mytable">
                        <tbody>
                            <tr>
                                <td width="180px" class="tdf">
                                    {{--<defined name="$option.notice">
                                        <a href="#" onclick="showNotice('')" title="点击此处查看提示信息"><img src="/images/admin/notice.gif" width="16" height="16" border="0" alt="点击此处查看提示信息" /></a>
                                    </defined>--}}
                                    网站页面标题1
                                    <a href="/config/edit/id/1" title="编辑设置"><i class="icon-edit"></i></a>
                                    <a href="/config/delete/id/2" title="删除设置"><i class="icon-trash"></i></a>
                                </td>
                                <td >
                                    {{--{$option.option}--}}
                                    i-sanger 在线生物信息计算云
                                    {{--<defined name="$option.notice">--}}
                                        {{--<br /><span class="notice" id="notice_{$$option.config_id }">{$option.notice}</span>--}}
                                    {{--</defined>--}}
                                </td>
                            </tr>
                        <tr>
                            <td>
                                页面描述
                                <a href="/config/edit/id/1" title="编辑设置"><i class="icon-edit"></i></a>
                                <a href="/config/delete/id/2" title="删除设置"><i class="icon-trash"></i></a>
                            </td>
                            <td>
                                i-sanger 国内首家开放式生物信息云计算
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </li>
                <li class="tab_con">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="mytable">
                        <tbody>
                        <volist name="cate.optionFrom.EMAIL" id="option"  key="key">
                            <tr>
                                <td width="180px" class="tdf">
                                    <defined name="$option.notice">
                                        <a href="#" onclick="showNotice('notice_{$option.config_id}')" title="点击此处查看提示信息"><img src="/images/admin/notice.gif" width="16" height="16" border="0" alt="点击此处查看提示信息" /></a>
                                    </defined>
                                    {$option.title}
                                    <a href="/config/edit/id/{$option.config_id}" title="编辑设置"><i class="icon-edit"></i></a>
                                    <a href="/config/delete/id/{$option.config_id}" title="删除设置"><i class="icon-trash"></i></a>
                                </td>
                                <td >
                                    {$option.option}
                                    <defined name="$option.notice">
                                        <br /><span class="notice" id="notice_{$option.config_id}">{$option.notice}</span>
                                    </defined>
                                </td>
                            </tr>
                        </volist>
                        </tbody>
                    </table>
                </li>

                <li class="tab_con">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="mytable">
                        <tbody>
                        <volist name="cate.optionFrom.MEMBER" id="option"  key="key">
                            <tr>
                                <td width="180px" class="tdf">
                                    <defined name="$option.notice">
                                        <a href="#" onclick="showNotice('notice_{$option.config_id}')" title="点击此处查看提示信息"><img src="/images/admin/notice.gif" width="16" height="16" border="0" alt="点击此处查看提示信息" /></a>
                                    </defined>
                                    {$option.title}
                                    <a href="/config/edit/id/{$option.config_id}" title="编辑设置"><i class="icon-edit"></i></a>
                                    <a href="/config/delete/id/{$option.config_id}" title="删除设置"><i class="icon-trash"></i></a>
                                </td>
                                <td >
                                    {$option.option}
                                    <defined name="$option.notice">
                                        <br /><span class="notice" id="notice_{$option.config_id}">{$option.notice}</span>
                                    </defined>
                                </td>
                            </tr>
                        </volist>
                        </tbody>
                    </table>
                </li>

            </ul>

            <table cellpadding="0" cellspacing="0" border="0" width="100%" >
                <tr><td width="220"></td>
                    <td>
                        <input type="submit" name="formsubmit" value="提交" class="button" />
                    </td >
                </tr>
            </table>

        </div>
        </form>
        <script  language="javascript" type="text/javascript">
            function showNotice(id)
            {
                var obj = document.getElementById(id) //获得指定ID值的对象 ;
                if (obj) {
                    if (obj.style.display != "block") {
                        obj.style.display = "block";
                    } else {
                        obj.style.display = "none";
                    }
                }
            }
        </script>
        <script type="text/javascript">
            $(document).ready(function() {
                jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
                    $(tab_conbox).find("li").hide();
                    $(tabtit).find("li:first").addClass("thistab").show();
                    $(tab_conbox).find("li:first").show();

                    $(tabtit).find("li").bind(shijian,function(){
                        $(this).addClass("thistab").siblings("li").removeClass("thistab");
                        var activeindex = $(tabtit).find("li").index(this);
                        $(tab_conbox).children().eq(activeindex).show().siblings().hide();
                        return false;
                    });

                };
                /*调用方法如下：*/
                $.jqtab("#tabs","#tab_conbox","click");

            });
        </script>
    </div>
@endsection



