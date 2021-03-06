/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-04-14 11:44:23
 * @version $Id$
 * zhDaily options
 */

$(function () {
  var
    Storage = storage(),
    apiVersion = 4,
    page = {
      init: function () {
        page.bindEvent();
        page.initSection();
        page.initTheme();
      },
      bindEvent: function () {
        var tag;

        $(document).delegate('.J_clickEvent', 'click', function ( e ) {
          tag = $(e.currentTarget);
          page[tag.data('event')] && page[tag.data('event')](tag);
        });
      },
      initSection: function () {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/sections',
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              data = res.data;

            $('.loading').remove();
            page.renderSection(data);
          },
          error: function () {
            $('.loading').remove();
            $('body').html('<div class="error">接口异常</div>');
          }
        });
      },
      renderSection: function ( rs ) {
        var
          sections = Storage.get('sections') || {},
          flag = Object.keys(sections).length,
          tpl = '',
          id, name, desc, img;

        rs.forEach(function ( item ) {
          id = item.id;
          name = item.name;
          desc = item.description;
          img = item.thumbnail;
          tpl += '<li class="item-li" data-id="'+ id +'">';
          tpl +=   '<h3>'+ name +'</h3>';
          tpl +=   '<span class="btn btn-on J_clickEvent" data-event="section" data-etype="on"';
          tpl +=     'data-id="'+ id +'">开启</span>';
          tpl +=   '<span class="btn btn-off on J_clickEvent" data-event="section" data-etype="off"';
          tpl +=     'data-id="'+ id +'">关闭</span>';
          tpl += '</li>';
          if ( !flag ) {
            sections[id] = name;
          }
        });
        if ( !flag ) {
          Storage.set('sections', sections);
        }

        $('.sections').html(tpl);
        page.renderStyle('section');
      },
      initTheme: function () {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/themes',
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              others = res.others;

            $('.loading').remove();
            page.renderTheme(others);
          },
          error: function () {
            $('.loading').remove();
            $('body').html('<div class="error">接口异常</div>');
          }
        });
      },
      renderTheme: function ( rs ) {
        var
          themes = Storage.get('themes') || {},
          flag = Object.keys(themes).length,
          tpl = '',
          id, name, desc, img;

        rs.forEach(function ( item ) {
          id = item.id;
          name = item.name;
          desc = item.description;
          img = item.thumbnail;
          tpl += '<li class="item-li">';
          tpl +=   '<h3>'+ name +'</h3>';
          tpl +=   '<span class="btn btn-on J_clickEvent" data-event="theme" data-etype="on"';
          tpl +=     'data-id="'+ id +'">开启</span>';
          tpl +=   '<span class="btn btn-off on J_clickEvent" data-event="theme" data-etype="off"';
          tpl +=     'data-id="'+ id +'">关闭</span>';
          tpl += '</li>';
          if ( !flag ) {
            themes[id] = name;
          }
        });
        if ( !flag ) {
          Storage.set('themes', themes);
        }

        $('.themes').html(tpl);
        page.renderStyle('theme');
      },
      renderStyle: function ( type ) {
        var
          items = $('[data-event="'+ type +'"]'),
          settings = Storage.get(type);

        if ( settings.length ) {
          settings.forEach(function ( id ) {
            $('.btn-off[data-event="'+ type +'"][data-id="'+ id +'"]').removeClass('on');
            $('.btn-on[data-event="'+ type +'"][data-id="'+ id +'"]').addClass('on');
          });
        }
      },
      section: function ( tag ) {
        var
          type = tag.data('event'),
          etype = tag.data('etype'),
          id = tag.data('id');

        tag.siblings('.btn').removeClass('on');
        tag.addClass('on');
        page.setItem(type, etype, id);
      },
      theme: function ( tag ) {
        var
          type = tag.data('event'),
          etype = tag.data('etype'),
          id = tag.data('id');

        tag.siblings('.btn').removeClass('on');
        tag.addClass('on');
        page.setItem(type, etype, id);
      },
      setItem: function ( type, etype, id ) {
        var
          arr = Storage.get(type) || [],
          hasFlag;

        hasFlag = arr.some(function ( item ) {
          return item === +id;
        });
        if ( hasFlag && etype === 'on' ) return;
        if ( hasFlag && etype === 'off' ) {
          arr = arr.filter(function ( item ) {
            return item !== +id;
          });
        }
        else if ( !hasFlag && etype === 'on' ) {
          arr.push(+id);
        }

        if ( type === 'section' ) {
          Storage.set('section', arr);
        }
        else {
          Storage.set('theme', arr);
        }
      }
    };

  page.init();

});