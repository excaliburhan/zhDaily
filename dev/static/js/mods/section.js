/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-04-05 22:32:17
 * @version $Id$
 * zhDaily section
 */

$(function () {
  var
    apiVersion = 4,
    page = {
      init: function () {
        var
          query = location.search.split('=')[1];

        page.bindEvent();
        page.initList(query);
      },
      bindEvent: function () {
        var tag;

        $(document).delegate('.J_clickEvent', 'click', function ( e ) {
          tag = $(e.currentTarget);
          page[tag.data('event')] && page[tag.data('event')](tag);
          window[tag.data('event')] && window[tag.data('event')](tag);
        });
      },
      gotoEvent: function ( tag ) {
        var
          id = tag.data('id');

        location.href = 'detail.html?id='+ id;
      },
      initList: function ( query ) {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/section/'+ query,
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              name = res.name,
              stories = res.stories;

            $('.loading').remove();
            page.renderList(name, stories);
          },
          error: function () {
            $('.loading').remove();
            $('body').html('<div class="error">接口异常</div>');
          }
        });
      },
      renderList: function ( name, stories ) {
        var
          fs = page.formatStories(stories);

        $('.name').html(name);
        $('.stories').html(fs);
      },
      formatStories: function ( rs ) {
        var
          tpl = '', i;

        for ( i = 0; i < rs.length; i++ ) {
          tpl += '<li class="bottom-li J_clickEvent" data-event="gotoEvent" data-id="'+ rs[i].id +'">';
          tpl +=   '<p>';
          tpl +=     '<span>'+ rs[i].title +'</span><br>';
          tpl +=     '<span>'+ rs[i].display_date +'</span>';
          tpl +=   '</p>';
          tpl +=   '<img src="'+ rs[i].images[0] +'">';
          tpl += '</li>';
        }

        return tpl;
      }
    };

  page.init();
});
