$(autoSize);
$(window).resize(autoSize);
function autoSize(){
    var windowHeight=$(window).height(),
    	mainLeftWidth= $('.main_left').width();
    $('.main_left').height(windowHeight-50+'px');
    if(mainLeftWidth>200){
    	$('.main_right').css('padding-left','16%')    	
    }
    else{
    	$('.main_right').css('padding-left',210+'px')
    }
    $('.stretch_layer').height(windowHeight-50+'px');
    $('.stretch_layer .scroll_content').height($('.stretch_layer').height()-110+'px');
}
$(selectBar);
function selectBar(){
	var inputBox=$('.select_bar .select_input input'),
        inputArrow=$('.select_bar .select_input .r'),
        inputName=$('.find_item input');
	inputBox.focus(function(){
        var thisPopup=$(this).parent().siblings('.popup');
		thisPopup.show();
	})
	inputBox.blur(function(){
        var thisPopup=$(this).parent().siblings('.popup');
		thisPopup.hide();
	})
    inputArrow.click(
        function(){
            var thisPopup=$(this).parent().siblings('.popup');
            if(thisPopup.is(':visible')==false){
               thisPopup.show();
            }
            else{
                thisPopup.hide();
            }
            return false;
        }
    )
    $(document).bind('click', function(e){
        var target  = $(e.target);
        if(target.closest(".select_bar").length == 0){
            $('.select_bar .popup').hide();
        }
    });
    inputName.focus(function(){
        var thisPopup=$(this).siblings('.popup');
        thisPopup.show();
    });
    $(document).bind('click', function(e){
        var target  = $(e.target);
        if(target.closest(".find_item").length == 0){
            $('.find_item .popup').hide();
        }
    });
}
$(publicHoverHandle);
function publicHoverHandle(){
    publicHover('.group_tag .tag_control');
    function publicHover(tag,className){
        $(tag).hover(
            function(){
                $(this).addClass('hover');
            },
            function(){
                $(this).removeClass('hover');
            }
        )
    }
}
$(scrollbar);
function scrollbar(){
    //$('.scroll_content').mCustomScrollbar({scrollInertia:20});
   // $(".scroll_content").mCustomScrollbar("scrollTo","#to_here");
}
