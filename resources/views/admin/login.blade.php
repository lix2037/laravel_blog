<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="{{asset('/style/admin/admin.css')}}">
    <title>后台管理系统</title>
</head>

<body onload="if(top!==self){top.location.href='/auth/login';}">

<div class="abs" style="width:100%;height:100%;top:0px;left:0px;background:#E4E8EB">
    <div class="table">
        <div class="tableCell">
                <div class="wrapBox rel" style="z-index:3;">
                   <div class="title"><img src="/style/admin/logo.gif" alt=""><p>后台管理系统</p></div>
               		<div class="logonBox">
                        <form action="" method="post" name="Login" onsubmit="return checkForm();" >
                        {{csrf_field()}}
                         <div class="wrap">
                            <div class="input"><input type="text" class="inp un" value="{{@$user_name}}" name="user_name" placeholder="请输入账号"/></div>
                            <div class="input"><input type="password" class="inp pwd" name="password" placeholder="请输入密码"/></div>
                            <div class="input rel">
                                <input name="verify" type="text" class="inp input_verify" onkeyup="this.value=this.value.toUpperCase()"  placeholder="请输入验证码"/>
                                <img class="abs" id="verifyImg" src="{{url('admin/code')}}" border="0" align="absmiddle" onclick="this.src='{{url('admin/code')}}?'+Math.random()" style=" cursor:pointer">
                            </div>
                            <input type="hidden" name="formact" value="dologin" />
                         </div>
                         <button class="trans">登&nbsp;&nbsp;录</button>
                        </form>
                   </div>
                    @if(count($errors)>0)
						<div class="mark">
							@if(is_object($errors))
								@foreach($errors->all() as $error)
									<p style="color:red">{{$error}}</p>
								@endforeach
							@else
								<p style="color:red">{{$errors}}</p>
							@endif
						</div>
					@endif
                </div>
        </div>
    </div>
</div>



<script type="text/JavaScript">
    function SetFocus(){
        if (document.Login.user_name.value=="") document.Login.user_name.focus();
        else document.Login.user_name.select();
    }
    function fleshVerify(){
        var timenow = new Date().getTime();
    }
    function checkForm(){
        if(document.Login.user_name.value==""){alert('No Account !');return false;}
        if(document.Login.password.value==""){alert('No Password !');return false;}
        if(document.Login.verify.value==""){alert('No Verify Code !');return false;}
    }
    SetFocus();
</script>
</body>
</html>