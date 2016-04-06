/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-03-30 16:50:08
 * @version $Id$
 * zhDaily popup
 */

$(function () {
  var
    page = {
      init: function () {
        page.bindEvent();
      },
      bindEvent: function () {
        var tag;

        $(document).delegate('.J_clickEvent', 'click', function ( e ) {
          tag = $(e.currentTarget);
          page[tag.data('event')] && page[tag.data('event')](tag);
          window[tag.data('event')] && window[tag.data('event')](tag);
        });
        $(document).delegate('.J_keydownEvent', 'keydown', function ( e ) {
          tag = $(e.currentTarget);
          if ( e.keyCode === 13 ) {
            page[tag.data('secevent')] && page[tag.data('secevent')](tag);
          }
        });
      },
      gotoEvent: function ( tag ) {
        var
          eType = tag.data('etype'),
          val = tag.data('query') || $('.history-input').val(),
          query = val ? ('?query='+ val) : '';

        page.openPage(eType, query);
      },
      openPage: function ( fileName, query ) {
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function ( tabs ) {
          var
            reg = new RegExp('^chrome.*' + fileName + '.html.*$', 'i'),
            isOpened = false,
            tabId, i;

          // 每个tab注册状态(是否打开/id)
          for ( i = 0; i < tabs.length; i++ ) {
            if ( reg.test(tabs[i].url) ) {
              isOpened = true;
              tabId = tabs[i].id;
              break;
            }
          }
          if ( !isOpened ) {
            chrome.tabs.create({
              url: 'prod/template/'+ fileName +'.html'+ query,
              active: true
            });
          }
          else {
            chrome.tabs.update(tabId, {highlighted: true});
          }
        });
      }
    };

  page.init();
});
