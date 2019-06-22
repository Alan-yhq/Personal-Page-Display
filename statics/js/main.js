$('.menu a').click(function(){
    target = $(this).attr('goto');
    switchTo(target);
    $('.menu li a').each(function(){
        $(this).removeClass('active');
    });
    $(this).addClass('active');
});

function switchTo(target){
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getAchives(){
    t = ``;
    $.ajax({
        type:"GET",
        url:"https://your blog url/wp-json/wp/v2/posts?per_page=8&page=1",
        dataType:"json",
        success:function(json){
            for(var i = 0;i < json.length;i++){
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        }
    })
}

function gethitokoto(){
    $.ajax({
        type:"POST",
        url:"https://api.fczbl.vip/hitokoto/?encode=json",
        dataType:"json",
        success:function(result){
            write(result.hitokoto);
        },
        error:function(){
            $('#hitokoto').html("Error: Failed to get hitokoto.");
        }
    });
}

function write(text){
    if (text.length < 25) {
        $('#hitokoto').html(text);
    } else {
        gethitokoto();
    }
}
Date.prototype.Format = function(fmt){ //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function(){
    getAchives();
    gethitokoto();
    setTimeout(function(){$(".loading").hide();},1500);
});
