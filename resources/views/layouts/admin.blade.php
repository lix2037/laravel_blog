<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="{{asset('/style/css/ch-ui.admin.css')}}">
    <link rel="stylesheet" href="{{asset('/style/font/css/font-awesome.min.css')}}">
    <script type="text/javascript" src="{{ asset('/javascript/jquery.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/javascript/ch-ui.admin.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/javascript/layer/layer.js')}}"></script>
    <title>后台管理</title>
</head>
<body>
@yield('content')
</body>
</html>
<style>
    .result_content ul li span{
        padding: 6px 12px;
        text-decoration: none;
    }
</style>