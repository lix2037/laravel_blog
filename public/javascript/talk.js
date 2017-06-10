$(function(){
	
	$("#talk_content").click(function(){
		var talk_content_ = $('#talk_content').val();
		if(talk_content_ == '发表说说'){
			$('#talk_content').val('');
		}
	});

	$("#talk_content").blur(function(){
		var talk_content_ = $('#talk_content').val();
		if(talk_content_ == ''){
			$('#talk_content').val('发表说说');
		}
	});

})

// 发表说说
function checkForm(){
	var talk_content_ = $('#talk_content').val();
	if(talk_content_ == '' || talk_content_ == '发表说说'){
		alert('请填写说说内容');
		return false;
	}
	$.ajax({
		url : '/talk/add',
		data : $('#talk_form').serialize(),
		type : 'post',
		success : function(msg) {
			if (msg.success == '1') {
				alert(msg.message);
				location.href = '/index';
//				location.reload();
			} else {
				alert(msg.message);
			}
		},
		error : function() {
			alert('系统出错!');
		}
	})
}


//切换我的和组织的说说
function ch_talk(type, from){
	if(type == 1){
		$('#talk_1').css('display', 'block');
		$('#talk_2').css('display', 'none');
		$("#li_my").addClass('current');
		$("#li_org").removeClass('current');
	}else if(type == 2){
		$('#talk_1').css('display', 'none');
		$('#talk_2').css('display', 'block');
		$("#li_org").addClass('current');
		$("#li_my").removeClass('current');
		var first_organize_id_ = $('#first_organize_id').val();
		// 如果有参与的组织，则读取第一个组织的说说
		if(first_organize_id_ != ''){
			get_org_talk(first_organize_id_, from);
		}
	}
}

// 异步获取组织说说
function get_org_talk(organize_id, from){
	$('.org_talk_tab').removeClass('current');
	$('#talk_tab_'+organize_id).addClass('current');
	$.ajax({
		url : '/talk/organize_talk',
		data : ({
			'organize_id' : organize_id,
			'talk_from' : from,
		}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			$('#organize_talk').html(msg);
		},
		error : function() {
			alert('系统出错!');
		}
	})
}


// 填写评论内容
function to_comment(talk_id, comment_id, organize_id){
	var organize_id_ = '';
	if(organize_id != '')
		organize_id_ = organize_id+'_';
	var comment_obj = $('#'+organize_id_+'comment_'+talk_id+'_'+comment_id);
	if(comment_obj.html() == ''){
		$(".div_comment").html('');
		
		comment_obj.html('<div class="respond"><div class="textarea_wrap"><textarea name="talk_comment" id="talk_comment"></textarea></div><div class="act_area clear"><a href="javascript:void(0);"><i class="ico_face"></i></a><div class="btn_area"><a href="javascript:void(0);" class="btn btn_blue" onclick="add_comment(\''+talk_id+'\',\''+comment_id+'\',\''+organize_id+'\');">发表</a></div></div></div>');
		// 加载QQ表情
		$('.ico_face').qqFace({
			id : 'facebox', 
			assign:'talk_comment', 
			path:'/javascript/jquery.qqFace_js/arclist/'	//表情存放的路径
		});
	}else{
		comment_obj.html('');
	}
}

// 针对说说或评论 发表评论
function add_comment(talk_id, comment_id, organize_id){
	var talk_comment_ = $("#talk_comment").val();
	if(talk_comment_ == ''){
		alert('评论内容为空');
		return false;
	}
	talk_comment_ = replace_em(talk_comment_);
	$.ajax({
		url : '/talk/add_comment',
		data : ({'talk_id':talk_id, 'comment_id':comment_id, 'comment':talk_comment_, 'organize_id':organize_id}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			var organize_id_ = '';
			if(organize_id != '')
				organize_id_ = organize_id+'_';
			$("#"+organize_id_+"comment_info_"+talk_id+"_"+comment_id).prepend(msg);
			to_comment(talk_id, comment_id, organize_id);  // 关闭评论输入框
		},
		error : function() {
			alert('系统出错!');
		}
	})
}

// 对表情进行转义
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/javascript/jquery.qqFace_js/arclist/$1.gif" border="0" />');
	return str;
}