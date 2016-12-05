<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="{{asset('/style/css/ch-ui.admin.css')}}">
	<link rel="stylesheet" href="{{asset('/style/font/css/font-awesome.min.css')}}">
	<title>后台</title>
</head>
<body style="background:#F3F3F4;">
	<div class="login_box">
		<h1>Blog</h1>
		<h2>欢迎使用博客管理平台</h2>
		<div class="form">
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
			<form action="" method="post">
			{{csrf_field()}}
				<ul>
					<li>
					<input type="text" name="user_name" class="text"/>
						<span><i class="fa fa-user"></i></span>
					</li>
					<li>
						<input type="password" name="password" class="text"/>
						<span><i class="fa fa-lock"></i></span>
					</li>
					<li>
						<input type="text" class="code" name="code" onkeyup="this.value = this.value.toUpperCase();"/>
						<span><i class="fa fa-check-square-o"></i></span>
						<img src="{{url('admin/code')}}" alt="" onclick="this.src='{{url('admin/code')}}?'+Math.random()">
					</li>
					<li>
						<input type="submit" value="立即登陆"/>
					</li>
				</ul>
			</form>
			<p><a href="#">返回首页</a> &copy; 2016 Powered by <a href="{{url('/')}}" target="_blank">{{url('/')}}</a></p>
		</div>
	</div>
</body>
</html>