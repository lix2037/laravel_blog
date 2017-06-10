<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>后台管理</title>
    <link href="/style/Font-Awesome-3.2.1/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="/style/admin/admin.css" rel="stylesheet" type="text/css" />
    <style type="text/css">body{ overflow:visible; background:#fff;}</style>
    <script type="text/javascript" src="/javascript/admin/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="/javascript/admin/admin.js"></script>
    <script type="text/javascript" src="/javascript/admin/mybox.js"></script>
</head>
@yield('content')
<body>
</body>
</html>

<script>
    $(".del").click(function(){

        if (!confirm("确认删除吗?")) {
            return false;
        }
        var url    = $(this).attr("url");
        var del_id = $(this).attr("del_id");

        $.ajax({
            type    : 'POST',
            url     : url,
            data    : 'id='+ del_id,
            dataType: 'JSON',
            success: function(data) {
                if (data.success == '0') {
                    alert(data.message);
                } else {
                    window.location.reload();
                }
            }
        });
    });
</script>
