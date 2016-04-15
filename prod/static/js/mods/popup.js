
$(function(){var
Storage=storage(),page={init:function(){page.bindEvent();page.insertSettings();},bindEvent:function(){var tag;$(document).delegate('.J_clickEvent','click',function(e){tag=$(e.currentTarget);page[tag.data('event')]&&page[tag.data('event')](tag);window[tag.data('event')]&&window[tag.data('event')](tag);});$(document).delegate('.J_keydownEvent','keydown',function(e){tag=$(e.currentTarget);if(e.keyCode===13){page[tag.data('secevent')]&&page[tag.data('secevent')](tag);}});},gotoEvent:function(tag){var
eType=tag.data('etype'),section=tag.data('section'),theme=tag.data('theme'),val=$('.history-input').val()||'',query;if(val){query='query='+val;}
else if(section){query='section='+section;}
else if(theme){query='theme='+theme;}
else{query='';}
page.openPage(eType,query);},openPage:function(fileName,query){chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(tabs){var
reg=new RegExp('^chrome.*'+fileName+'.html(\\?{0,1})'+query+'$','i'),isOpened=false,tabId,i;console.log(reg)
for(i=0;i<tabs.length;i++){if(reg.test(tabs[i].url)){isOpened=true;tabId=tabs[i].id;break;}}
if(!isOpened){if(query){query='?'+query;}
chrome.tabs.create({url:'prod/template/'+fileName+'.html'+query,active:true});}
else{chrome.tabs.update(tabId,{highlighted:true});}});},insertSettings:function(){var
section=Storage.get('section'),sections=Storage.get('sections'),theme=Storage.get('theme'),themes=Storage.get('themes'),tpl='';section.forEach(function(id){tpl+='<li class="J_clickEvent" data-event="gotoEvent" data-etype="section"';tpl+='data-section="'+id+'">';tpl+='<i class="iconfont">&#xe600;</i>';tpl+='<span>'+sections[id]+'</span>';tpl+='</li>';});theme.forEach(function(id){tpl+='<li class="J_clickEvent" data-event="gotoEvent" data-etype="theme"';tpl+='data-theme="'+id+'">';tpl+='<i class="iconfont">&#xe605;</i>';tpl+='<span>'+themes[id]+'</span>';tpl+='</li>';});$(tpl).insertBefore($('.pop-pic'));}};page.init();});