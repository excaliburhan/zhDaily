
$(function(){var
apiVersion=4,page={init:function(){var
query=location.search.split('=')[1];page.bindEvent();page.initList(query);},bindEvent:function(){var tag;$(document).delegate('.J_clickEvent','click',function(e){tag=$(e.currentTarget);page[tag.data('event')]&&page[tag.data('event')](tag);window[tag.data('event')]&&window[tag.data('event')](tag);});},gotoEvent:function(tag){var
id=tag.data('id');location.href='detail.html?id='+id;},initList:function(query){$.ajax({type:'GET',url:'http://news-at.zhihu.com/api/'+apiVersion+'/theme/'+query,data:{},dataType:'json',timeout:15000,success:function(res){var
name=res.name,stories=res.stories;$('.loading').remove();page.renderList(name,stories);},error:function(){$('.loading').remove();$('body').html('<div class="error">接口异常</div>');}});},renderList:function(name,stories){var
frs=page.formatStories(stories);$('title').html(name);$('.name').html(name);$('.stories').html(frs);},formatStories:function(rs){var
tpl='',tmpImg,i;for(i=0;i<rs.length;i++){tmpImg=rs[i].images?rs[i].images[0]:'';tpl+='<li class="bottom-li J_clickEvent" data-event="gotoEvent" data-id="'+rs[i].id+'">';tpl+='<p>';tpl+='<span>'+rs[i].title+'</span><br>';tpl+='</p>';tpl+='<img src="'+tmpImg+'">';tpl+='</li>';}
return tpl;}};page.init();});