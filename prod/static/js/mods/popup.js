
$(function(){var
page={init:function(){page.bindEvent();},bindEvent:function(){var tag;$(document).delegate('.J_clickEvent','click',function(e){tag=$(e.currentTarget);page[tag.data('event')]&&page[tag.data('event')](tag);window[tag.data('event')]&&window[tag.data('event')](tag);});},gotoEvent:function(tag){var
eType=tag.data('etype'),val=tag.data('query')||$('.history-input').val(),query=val?('?query='+val):'';page.openPage(eType,query);},openPage:function(fileName,query){chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT},function(tabs){var
reg=new RegExp('^chrome.*'+fileName+'.html$','i'),isOpened=false,tabId,i;for(i=0;i<tabs.length;i++){if(reg.test(tabs[i].url)){isOpened=true;tabId=tabs[i].id;break;}}
if(!isOpened){chrome.tabs.create({url:'prod/template/'+fileName+'.html'+query,active:true});}
else{chrome.tabs.update(tabId,{highlighted:true});}});}};page.init();});