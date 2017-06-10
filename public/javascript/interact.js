//--------------------------资讯专题头部交互--------------------------------
$(interactSubnavBtn);
function interactSubnavBtn(){
	var li=$('.interact .subnav .btn_area li');
	var popup=li.find('.popup_choose'); 	
	li.hover(
		function(){
			$(this).addClass('current');
		}
		,function(){
			$(this).removeClass('current');
		}
	)
}
//--------------------------动态中点赞效果--------------------------------
$(btnPraise);
function btnPraise(){
	var btn_praise=$('.btn_praise'),
		agree=$('.topic_dynamic .agree');
	agree.css('display','none');
	btn_praise.each(
		function(){
			var self=$(this),
				talk_id_ = this.id;
			self.hover(				
				function(){					
					if(self.hasClass('btn_praise_cur')){
						self.text('取消赞');
						self.addClass('cancel_praise');
					}
					else{
						self.text('赞+1');
					}
				},
				function(){
					var praise_num = parseInt($('#talk_praise_'+talk_id_).val());
					self.text(praise_num);
					if(self.hasClass('btn_praise_cur')){
						self.removeClass('btn_praise_gray');
					}
				}
			)
			self.click(
				function(e){
					var praise_num = parseInt($('#talk_praise_'+talk_id_).val());
					e.preventDefault();
					var praise_type = '';
					if(self.hasClass('btn_praise_cur cancel_praise')){
						self.removeClass('btn_praise_cur cancel_praise');
						$('#talk_praise_'+talk_id_).val(praise_num-1)
//						agree.css('display','none');
						praise_type = '1';
					}else{
						self.addClass('btn_praise_cur');	
						$('#talk_praise_'+talk_id_).val(praise_num+1)
//						agree.css('display','block');
						praise_type = '2';
					}
					$.ajax({
						url : '/index/praise_talk',
						data : ({
							'talk_id' : talk_id_,
							'praise_type' : praise_type,
						}),
						type : 'post',
						success : function(data) {
				            if(data.success == '1'){
//				            	alert('操作成功');
				            }else{
				                alert(data.message);
				            }
						},
						error : function() {
//							alert('系统出错!');
							location.href = "http://passport.sg.com/user/login?return_url="+location.href;
						}
					})
						
				}		
			)	
			
		}				
	);
}
//--------------------------发起页面中添加话题--------------------------------
$(checkedTag);
function checkedTag(){
	var tag_topic=$(".creat_list dd .tag_topic"),//获取最近话题标签列表
		check_wrap=$("<div id='checkedTagWrap' class='checked_tag_wrap'></div>"),//定义放置选取话题的div
		topic_input=$("#inputCreat"),
		btn_add=$("#btnAdd"),
		btn_cancel=$("#btnCancel"),
		text='';	
	check_wrap.insertBefore("#inputCreat");//将放置选取话题的div插入到输入框之前
	check_wrap.hide();//默认将放置选取话题的div隐藏

	tag_topic.click(function(){
		var self=$(this),
			text=self.text();//获取当前元素中的文本	
			topic_id = this.id;
		insertItem(text,topic_id,self);
	});
	btn_add.click(function(){
		var	text=topic_input.val();
		if(text == ''){
			alert('请填写标题');
		}else{
			$.ajax({
				url : '/topic/add',
				data : ({
					'topic_name' : text,
				}),
				type : 'post',
				success : function(data) {
		            if(data.success == '1'){
		            	var topic_id = data.topic_id;
		            	insertItem(text,topic_id);
		            }else{
		                alert(data.message);
		            }
				},
				error : function() {
					alert('系统出错!');
				}
			})
			
		}
	});
	btn_cancel.click(function(){
		$(this).hide().siblings().hide();
		var parent_node=$(this).parent();
			re_edit=$('<a href="" class="btn" id="reEdit"><i class="ico_edit2"></i>&nbsp;编辑</a>');
			parent_node.append(re_edit);
	});
	function insertItem(text,topic_id,obj){
		var item=$('<a href="" class="tag_topic"><label>'+text+'</label><i>×</i></a>');
		item.data('target',obj); // 把obj缓存到item
		if(obj){
			obj.hide();//如果obj存在，则点击之后当前元素隐藏
		}
		check_wrap.append(item);//将定义的选取话题的元素放入此前显示的div中	
		check_wrap.show();//点击之后放置选取话题的div显示	
		
		var topic_ids_ = $('#topic_ids').val();
		$('#topic_ids').val(topic_ids_+','+topic_id);
	};
	$(document).on("click",".creat_list dd .tag_topic",function(){
		var self=$(this),
			target = self.data('target');
		$(this).hide();
		if(target){	
			var topic_ids_ = $('#topic_ids').val();
			if(topic_ids_ != ''){
				var index_ = topic_ids_.lastIndexOf(',');
				topic_ids_ = topic_ids_.substring(0,index_);
				$('#topic_ids').val(topic_ids_);
			}
			target.show();
		}		
	});
	$(document).on("click",".creat_list dd a",function(e){
		e.preventDefault();
	})
	$(document).on("click","#reEdit",function(e){
		$(this).siblings().show();
		$(this).remove();
	})
}
////--------------------------鼠标移到头像上显示用户信息浮层--------------------------------
$(userInfo);
function userInfo(){
	var avatar_u=$('.user_avatar'),
		x=-120,
		y=-135;
	var base_info=$('#baseInfo');
	base_info.hide();
	avatar_u.each(function(){
		$(document).on('mouseover','.user_avatar',function(){
			var member_id_ = this.id;
			if(member_id_ != ''){
				$.ajax({
					url : '/index/follow_member_info',
					data : ({
						'member_id' : member_id_,
					}),
					type : 'post',
					dataType : 'html',
					success : function(msg) {
						$('#baseInfo').html(msg);
					},
				})	
				
				var offset=$(this).offset(),
					imgWidth=$(this).find('img').width();
				if(imgWidth==30){
					x=-130;
				}
				if(imgWidth==80){
					x=-105;
				}
				base_info.stop().fadeIn().show();
				base_info.css({'left':(offset.left+x)+'px','top':(offset.top+y)+'px'});	
			}
		})
		$(document).on('mouseout','.user_avatar',function(){
			base_info.hide();
		})
		$(document).on('click','.user_avatar',function(e){
			e.preventDefault();
		})
	})
	base_info.hover(
		function(){
			$(this).show();
		},
		function(){
			$(this).hide();
		}
	)
}
//--------------------------鼠标移到话题上显示关注话题浮层--------------------------------
$(attentionInfo);
function attentionInfo(){
	var avatar_topic=$('.avatar_topic'),		
		x=0,
		y=0;
	var att_wrap=$('#attWrap');
	att_wrap.hide();
	avatar_topic.each(function(){
		$(this).hover(
			function(){
				var topic_id_ = this.id;
				$.ajax({
					url : '/topic/follow_topic_info',
					data : ({
						'topic_id' : topic_id_,
					}),
					type : 'post',
					dataType : 'html',
					success : function(msg) {
						$('#attWrap').html(msg);
					},
				})				
				var offset=$(this).offset();
				att_wrap.stop().fadeIn().show();
				att_wrap.css({'left':(offset.left+x)+'px','top':(offset.top+y)+'px'});
			},
			function(){
				att_wrap.hide();
			}
		)
		$(this).click(
			function(e){
				e.preventDefault();
			}
		)
		att_wrap.hover(
			function(){
				$(this).show();
			},
			function(){
				$(this).hide();
			}
		)
	})

}
function follow(member_id){
	$.ajax({
		url : '/index/follow_member',
		data : ({
			'member_id' : member_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('关注成功');
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

function dis_follow(member_id){
	$.ajax({
		url : '/index/delete_follow_member',
		data : ({
			'member_id' : member_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('取消关注');
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

function follow_topic(topic_id){
	$.ajax({
		url : '/topic/follow_topic',
		data : ({
			'topic_id' : topic_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('关注成功');
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

function dis_follow_topic(topic_id){
	$.ajax({
		url : '/topic/delete_follow_topic',
		data : ({
			'topic_id' : topic_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('取消关注');
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

function follow_talk(talk_id){
	$.ajax({
		url : '/index/follow_talk',
		data : ({
			'talk_id' : talk_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('关注成功');
            	location.reload();
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

function dis_follow_talk(talk_id){
	$.ajax({
		url : '/index/delete_follow_talk',
		data : ({
			'talk_id' : talk_id,
		}),
		type : 'post',
		success : function(data) {
            if(data.success == '1'){
            	alert('取消关注');
            	location.reload();
            }else{
                alert(data.message);
            }
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

///// 评论

//获取评论
function getComment(talk_id){
	var comment_obj = $('#comment_'+talk_id);
	if(comment_obj.html() == ''){
		$.ajax({
			url : '/index/comments',
			data : ({
				'talk_id' : talk_id,
			}),
			type : 'post',
			dataType : 'html',
			success : function(msg) {
				$('#comment_'+talk_id).html(msg);
			},
			error : function() {
//				alert('系统出错!');
				location.href = "http://passport.sg.com/user/login?return_url="+location.href;
			}
		})
	}else{
		comment_obj.html('');
	}
}

// 发表评论
function addComment(talk_id){
	var content_ = $('#content_'+talk_id).val();
	if(content_ == ''){
		alert('请填写评论内容');
		return false;
	}
	$.ajax({
		url : '/index/add_comment',
		data : ({
			'talk_id' : talk_id,
			'content' : content_,
		}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			$('#comment_'+talk_id).html(msg);
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

// 详情页，发表评论
function addComment2(talk_id){
	var content_ = $('#content').val();
	var invitation_id_ = $('#invitation_id').val();
	if(content_ == ''){
		alert('请填写评论内容');
		return false;
	}
	$.ajax({
		url : '/index/add_comment',
		data : ({
			'talk_id' : talk_id,
			'content' : content_,
			'view_comments' : '1',
			'invitation_id' : invitation_id_,
		}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			$('#view_comments').html(msg);
		},
		error : function() {
//			alert('系统出错!');
			location.href = "http://passport.sg.com/user/login?return_url="+location.href;
		}
	})
}

// 回复评论
function replyComment(talk_id,member_name){
	$('#content_'+talk_id).val('回复'+member_name+':');
}

function commentBlur(talk_id){
	var comment_ = $('#content_'+talk_id).val();
	if(comment_ == ''){
		$('#content_'+talk_id).val('评论一下');
	}
}


function commentClick(talk_id){
	var comment_ = $('#content_'+talk_id).val();
	if(comment_ == '评论一下'){
		$('#content_'+talk_id).val('');
	}
}