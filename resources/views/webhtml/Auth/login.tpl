<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="/style/admin/admin.css">
    <title>I-Sanger生信分析管理系统</title>
<!--   <style type="text/css">
        *{ margin:0; padding:0;}
        ul{list-style: none;}
        .clear:after{content:".";display:block;clear:both;height:0px;visibility:hidden;}
        .clear{zoom:1;}
        body{ font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; color:#444; background-color:#F1F6FC; text-align: center;}
        .con{width: 1000px;margin: 0 auto;text-align: left;}
        .top_header{padding:10px 0;border-bottom:1px solid #ccc;background:#225533;}
        .top_header h1{ position: relative; float:left;width:500px;height:58px;background:url(/images/logo.png) no-repeat;}
        .top_header h1 strong{position:absolute;left:220px;bottom:12px;display:block;width:350px;font-size: 18px;font-family:Microsoft YaHei;color: #D9EDFF;font-weight: normal;}
        .top_header .contact{float: right;margin:20px 0 0;font-size: 14px; color: #fff;}
        .top_header .nav{float:right;margin:20px 0 0;font-family:Microsoft YaHei;}
        .top_header .nav li{float:left;margin-right:10px;}
        .top_header .nav li a{float:left;height:30px;line-height:30px;padding:0 10px;color:#666;font-size:14px;text-decoration:none;border-radius:5px;}
        .top_header .nav li.current a,.top_header .nav li a:hover{background:linear-gradient(#00A150,#007B3D);background-color:#007B3D;color:#fff;}
        .box_shadow{ text-align: left; width: 450px; margin:120px auto 0;border:1px solid #eee;border-radius:5px;background:#fff;box-shadow:0 0 5px #BED1E4;}
        .box_shadow .title{border-bottom:1px solid #eee;margin:0 20px;padding:25px 0;}
        .box_shadow .title h2{display:inline;color:#0277BD;font-family:Microsoft YaHei;font-size:32px;font-weight:normal;}
        .box_shadow .contain{padding:30px;}
        #inputs table td{padding: 5px 0}
        .inp{ width:118px; height:26px; line-height:26px; border-left:1px solid #8cb7e1; border-top:1px solid #8cb7e1; border-right:1px solid #e3f0fc; border-bottom:1px solid #e3f0fc;}
        .input_verify{ width:60px; background:#fff url("/images/admin/login-icon.gif") no-repeat 0 -99px; padding-left:2em;}
        .un{ background:#fff url("/images/admin/login-icon.gif") no-repeat; padding-left:2em;}
        .pwd{ background:#fff url("/images/admin/login-icon.gif") no-repeat 0 -50px; padding-left:2em;}
    </style>-->
</head>

<body onload="if(top!==self){top.location.href='/auth/login';}">

<div class="abs" style="width:100%;height:100%;top:0px;left:0px;background:#E4E8EB">
        <div class="table">
        <div class="tableCell">
                <div class="wrapBox rel" style="z-index:3;">
                       <div class="title"><img src="/style/admin/logo.gif" alt=""><p>桑格生信平台后台管理系统</p></div>
                       <div class="logonBox">
                                <form action="{:U('/auth/login')}" method="post" name="Login" onsubmit="return checkForm();" >
                                         <div class="wrap">
                                                <div class="input"><input type="text" class="inp un" name="username" placeholder="请输入账号"/></div>
                                                <div class="input"><input type="password" class="inp pwd" name="password" placeholder="请输入密码"/></div>
                                                <div class="input rel">
                                                     <input name="verify" type="text" class="inp input_verify" onkeyup="this.value=this.value.toUpperCase()"  placeholder="请输入验证码"/>
                                                     <img class="abs" id="verifyImg" src="{:U('auth/verify')}" border="0" align="absmiddle" onclick="javascript:fleshVerify()" style=" cursor:pointer">
                                                </div>
                                                <input type="hidden" name="formact" value="dologin" />
                                         </div>
                                         <button class="trans">登&nbsp;&nbsp;录</button>
                                         
                  <!--                      <notempty name="$error_msg">
                                            <tr>
                                                <td></td>
                                                <td>{$error_msg}</td>
                                            </tr>
                                        </notempty>-->
                                </form>
                       </div>
                </div>
        </div>
    </div>
</div>



<script type="text/JavaScript">
    function SetFocus(){
        if (document.Login.username.value=="") document.Login.username.focus();
        else document.Login.username.select();
    }
    function fleshVerify(){
        var timenow = new Date().getTime();
        document.getElementById('verifyImg').src='<?php echo U("auth/verify/timenow");?>/'+timenow;
    }
    function checkForm(){
        if(document.Login.username.value==""){alert('No Account !');return false;}
        if(document.Login.password.value==""){alert('No Password !');return false;}
        if(document.Login.verify.value==""){alert('No Verify Code !');return false;}
    }
    SetFocus();
</script>
</body>
</html>