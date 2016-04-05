
$(function(){var
apiVersion=4,page={init:function(){var
id=location.search.split('=')[1];page.initList(id);},initList:function(id){$.ajax({type:'GET',url:'http://news-at.zhihu.com/api/'+apiVersion+'/news/'+id,data:{},dataType:'json',timeout:15000,success:function(res){var
title=res.title,type=res.type,shareUrl=res.share_url,body=res.body,js=res.js,css=res.css,image=res.image,imageSource=res.image_source;$('.loading').remove();$('title').html(title);if(type){location.href=shareUrl;}
else{page.importStatic(body,css,js);page.replaceImg(title,image,imageSource);}},error:function(){$('.loading').remove();$('body').html('<div class="error">接口异常</div>');}});},importStatic:function(body,cssArr,jsArr){var
hdTpl='',bdTpl='',i=0,j=0;for(i=0;i<cssArr.length;i++){hdTpl+='<link href="'+cssArr[i]+'" rel="stylesheet">';}
for(j=0;j<jsArr.length;j++){bdTpl+='<script src="'+jsArr[j]+'"></script>';}
$('link').before(hdTpl);$('body').append(bdTpl);$('body').prepend(body);},replaceImg:function(title,image,imageSource){var
tpl='';tpl+='<div class="img-wrap">';tpl+='<h1 class="headline-title">'+title+'</h1>';tpl+='<span class="img-source">图片：'+imageSource+'</span>';tpl+='<img src="'+image+'" alt="">';tpl+='<div class="img-mask"></div>';tpl+='</div>';$('.headline').html(tpl);}};page.init();});