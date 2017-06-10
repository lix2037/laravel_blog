<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>管理系统</title>
    <base target="main_iframe">
    <link href="/style/Font-Awesome-3.2.1/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="/style/admin/admin.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="/javascript/admin/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="/javascript/admin/admin.js"></script>
    <script type="text/javascript" src="/javascript/admin/mybox.js"></script>
</head>

<body style="background: #46B4CF;">

<div class="menuWrap fl">
    <div class="logoTitle">
        <h1><a href="{{url('/')}}" target="_blank">I-Sanger</a></h1>
        <span>管理系统</span>
    </div>
   
    <div class="left_menu">
        <div class="left_top_menu">
            <div class="item">
                <p><i class="icon-reorder"></i>首页</p>
                <ul>
                    <li><a href="{{url('admin/info')}}"><span class="zs_arrow">&raquo;</span>服务器信息</a></li>
                </ul>
            </div>
        </div>
        <div class="left_top_menu">
            <div class="item">
                <p><i class="icon-reorder"></i>发票管理</p>
                <ul>
                    <li><a href=""><span class="zs_arrow">&raquo;</span>发票列表</a></li>

                </ul>
            </div>
        </div>
        <div class="left_top_menu">
            <div class="item">
                <p><i class="icon-cog"></i>系统设置</p>
                <ul>
                    <li><a href="{{url('admin/config/index')}}"><span class="zs_arrow">&raquo;</span>系统配置</a></li>
                    <li><a href=""><span class="zs_arrow">&raquo;</span>邮件模板</a></li>
                </ul>
            </div>
            <div class="item">
                <p><i class="icon-cog"></i>节点管理</p>
                <ul>
                    <li><a href="{{url('admin/node/index')}}"><span class="zs_arrow">&raquo;</span>节点列表</a></li>
                    <li><a href=""><span class="zs_arrow">&raquo;</span>节点添加</a></li>
                </ul>
            </div>
        </div>
    </div>
    
    
    <div class="itoolsBox rel">
         <a class="link" href="{{url('/')}}" target="_blank"><i class="icon-star"></i>前台</a>
         <a href="javascript:;" class="itoolsCog"><i class="icon-cog"></i></a>
        <div class="pop abs">
            <span>欢迎您，<i class="icon-user"></i><strong>{{$user_name}}</strong> <a title="退出" href="{{url('admin/logout')}}" target="_top"><i class="icon-off"></i></a></span>
            <div class="wrap">
                <a title="发送短信" href="javascript:;" onClick="$.fn.sbox({n:'a',title:'发送短信',width:480,height:330,ctype:'url',url:''})"><i class=" icon-comments"></i>发送短信</a>
                <a title="发送邮件" href="javascript:;" onClick="$.fn.sbox({n:'a',title:'发送邮件',width:650,height:480,ctype:'url',url:''})"><i class="icon-envelope-alt"></i>发送邮件</a>
                <a title="修改密码" href="javascript:;" onClick="$.fn.sbox({n:'a',title:'修改资料',width:400,height:350,ctype:'url',url:''})"><i class="icon-asterisk"></i>修改密码</a>
                <a title="清除缓存" onClick="clear_cache('')" ><i class="icon-magic"></i>清除缓存</a>
            </div>
        </div>

    </div>
<script>
$(function(){
    $(".itoolsBox").find(".itoolsCog").click(function(){
        $(".pop").toggleClass("show");
    });
      $(".pop").mouseleave(function(){
          $(this).delay(350).removeClass("show");
      });
});
</script>
    
    
</div>

<div class="fixnav">
    <a href="javascript:;" title="后退" onClick="Gurl('backward')"><i class="icon-circle-arrow-left"></i>&nbsp;后退</a>
    <a href="javascript:;" title="刷新" onClick="Gurl('refresh')"><i class="icon-undo"></i>&nbsp;刷新</a>
    <a href="javascript:;" title="前进" onClick="Gurl('forward')">前进&nbsp;<i class="icon-circle-arrow-right"></i></a>
</div>
   
   
<div class="mainMenu">
     <ul>
            
            <li><a href="javascript:;"><i class="icon-leaf"></i>首页</a></li>
            <li><a href="javascript:;"><i class="icon-leaf"></i>财务管理</a></li>
            <li><a href="javascript:;"><i class="icon-cog"></i>系统设置</a></li>
     </ul>
</div>
    
    
    
<div class="frameWrap">
       <div class="wrap"><iframe src="{{url('admin/info')}}" id="main_iframe" name="main_iframe" width="100%" height="100%" frameborder="0" scrolling="yes" style="overflow:visible;"></iframe></div>
</div>


<script type="text/javascript">
	//清除缓存
	function clear_cache(){
		$.ajax({
			url:"<?php echo U('index/clear_cache');?>",
			data:{'do':1},
            type:'POST',
			success:function(msg){
				if(msg=='ok'){
					alert('清除成功');
				}else{
					alert('系统异常');
				}
			},
			error:function(){
				alert('网络繁忙，请稍后重试');
			}
		});
		return false;
	}
</script>
</body>
</html>



