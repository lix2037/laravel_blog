// 获取长度 (区分中英文)
function getLength(str) { 
    var cArr = str.match(/[^\x00-\xff]/ig); 
    return str.length + (cArr == null ? 0 : cArr.length); 
}  

// 个人基本信息表单验证
function checkInfoForm(){
	var real_name_ = $('#real_name').val();
	var nick_name_ = $('#nick_name').val();
	
	var email_ = $('#email').val();
	var mobile_ = $('#mobile').val();
	var qq_ = $('#qq').val();

	var checkmobile = /(^1+(\d){10}$)|(^0+(\d){11}$)/;
	var checkemail  = /^([a-zA-Z0-9_-])+(\.)?([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	
	if(email_ != '' && !checkemail.test(email_)){
		$('#li_email').addClass('error');
		$('#tip_email').html('<div class="tip"><i class="ico_error"></i>请填写正确邮箱</div>');
		return false;
	}
	if(mobile_ != '' && !checkmobile.test(mobile_)){
		$('#li_mobile').addClass('error');
		$('#tip_mobile').html('<div class="tip"><i class="ico_error"></i>请填写正确手机号码</div>');
		return false;
	}
	if(qq_ != ''){
		if(getLength(qq_)>12 || getLength(qq_)<4){
			$('#li_qq').addClass('error');
			$('#tip_qq').html('<div class="tip"><i class="ico_error"></i>请填写正确QQ号码</div>');
			return false;
		}
	}
	if(getLength(real_name_)>30){
		$('#li_real_name').addClass('error');
		$('#tip_real_name').html('<div class="tip"><i class="ico_error"></i>真实姓名不超过30个字符</div>');
		return false
	}
	if(getLength(nick_name_)>30){
		$('#li_nick_name').addClass('error');
		$('#tip_nick_name').html('<div class="tip"><i class="ico_error"></i>昵称不超过30个字符</div>');
		return false;
	}
	return true;
}

// 修改密码表单验证
function checkPwForm() {
	$('#tip_password').html('');
	$('#tip_password1').html('');
	$('#tip_password2').html('');
	$('#li_password').removeClass('error');
	$('#li_password1').removeClass('error');
	$('#li_password2').removeClass('error');

	var checkpassword = /^\w{5,15}$/;

	var password_ = $('#password').val();
	var password1_ = $('#password1').val();
	var password2_ = $('#password2').val();

	if (password_ == '') {
		$('#li_password').addClass('error');
		$('#tip_password').html('<div class="tip"><i class="ico_error"></i>请填写密码</div>');
		return false;
	}
	if (password1_ == '') {
		$('#li_password1').addClass('error');
		$('#tip_password1').html('<div class="tip"><i class="ico_error"></i>请填写新密码</div>');
		return false;
	}
	if (password2_ == '') {
		$('#li_password2').addClass('error');
		$('#tip_password2').html('<div class="tip"><i class="ico_error"></i>请填写确认新密码</div>');
		return false;
	}
	var error_info = '密码长度在6-16之间，只能包含字母、数字和下划线';
	if (!checkpassword.test(password_)) {
		$('#li_password').addClass('error');
		$('#tip_password').html('<div class="tip"><i class="ico_error"></i>' + error_info + '</div>');
		return false;
	}
	if (!checkpassword.test(password1_)) {
		$('#li_password1').addClass('error');
		$('#tip_password1').html('<div class="tip"><i class="ico_error"></i>' + error_info + '</div>');
		return false;
	}
	if (!checkpassword.test(password2_)) {
		$('#li_password2').addClass('error');
		$('#tip_password2').html('<div class="tip"><i class="ico_error"></i>' + error_info + '</div>');
		return false;
	}
	if (password1_ != password2_) {
		$('#li_password2').addClass('error');
		$('#tip_password2').html('<div class="tip"><i class="ico_error"></i>新密码和确认新密码不一致，请确认</div>');
		return false;
	}
	if (password_ == password1_) {
		$('#li_password1').addClass('error');
		$('#tip_password1').html('<div class="tip"><i class="ico_error"></i>新密码和旧密码相同，请确认</div>');
		return false;
	}
	return true;
}

// 绑定邮箱表单验证
function checkBindEmailForm() {
	var email_ = $('#bind_email').val();
	if (email_ == '') {
		$('#li_bind_email').addClass('error');
		$('#tip_bind_email').html('<div class="tip"><i class="ico_error"></i>请填写邮箱地址</div>');
		return false;
	}
	var checkemail = /^([a-zA-Z0-9_-])+(\.)?([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (!checkemail.test(email_)) {
		$('#li_bind_email').addClass('error');
		$('#tip_bind_email').html('<div class="tip"><i class="ico_error"></i>请填写正确邮箱</div>');
		return false;
	}
	return true;
}

//验证手机号
function checkMobile(mobile_) {
	var checkmobile = /(^1+(\d){10}$)|(^0+(\d){11}$)/;

	$('#li_bind_mobile').removeClass('error');
	$('#li_bind_mobile').removeClass('correct');
	if (mobile_ == '') {
		$('#li_bind_mobile').addClass('error');
		$('#tip_bind_mobile').html('<div class="tip"><i class="ico_error"></i>请填写手机号码</div>');
		return false;
	} else if (!checkmobile.test(mobile_)) {
		$('#li_bind_mobile').addClass('error');
		$('#tip_bind_mobile').html('<div class="tip"><i class="ico_error"></i>请填写正确的手机号码</div>');
		return false;
	}
	return true;
}

//验证验证码
function checkVerify(verify_) {
	$('#li_verify').removeClass('error');
	$('#li_verify').removeClass('correct');
	if (verify_ == '') {
		$('#li_verify').addClass('error');
		$('#tip_verify').html('<div class="tip"><i class="ico_error"></i>请填写验证码</div>');
		return false;
	}
	return true;
}

//通过手机短信获取验证码
function getVerifyByMobile(){
	$('#li_verify').removeClass('error');
	$('#li_verify').removeClass('correct');
	$('#verify').val('');
	$('#tip_verify').html('');
	var mobile_ = $('#bind_mobile').val();
	// 检查手机号码
	if(!checkMobile(mobile_)){
		return false;
	}
	$('#get_verify_button').html('<a href="javascript:void(0)" class="btn btn_disabled">发送中...</a>');
	// 获取验证码
	$.ajax({
		url : '/index/bind_mobile_verify',
		data : ({
			'mobile' : mobile_
		}),
		type : 'post',
		success : function(msg) {
			if (msg.success == '1') {
				$('#get_verify_button').html('<a href="javascript:void(0)" class="btn btn_disabled"><span id="time">60</span>秒钟后可重新获取</a>');
				$('#tip_verify').html('<div class="tip">验证码已发送</div>');
				setTimeout("ch_verify_button();", 1000);
			} else {
				alert(msg.message);
				$('#get_verify_button').html('<a href="javascript:void(0)" onclick="getVerifyByMobile();" class="btn">获取短信验证码</a>');
			}
		},
		error : function() {
			alert('系统出错!');
		}
	})
}

//60秒后，重新获取验证码
function ch_verify_button(){
	var time_ = parseInt($('#time').html());
	if(time_ > 0)
	{
		$('#time').html(time_-1);
		setTimeout("ch_verify_button();",1000);
	}else
	{
		$('#get_verify_button').html('<a href="javascript:void(0)" onclick="getVerifyByMobile();" class="btn">获取短信验证码</a>');
		$('#tip_verify').html('');
		return null;
	}
}

// 绑定手机表单验证
function checkBindMobileForm(){
	if(!checkMobile($('#bind_mobile').val())){
		return false;
	}
	if (!checkVerify($('#verify').val())){
		return false;
	}
	return true;	
}
