/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-04-05 22:32:17
 * @version $Id$
 * zhDaily history
 */

$(function () {
  var
    apiVersion = 4,
    page = {
      init: function () {
        var
          theDay = location.search.split('=')[1];

        theDay = page.getRightDate(theDay);
        page.bindEvent();
        page.initList(theDay);
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
      // 计算正确日期
      getRightDate: function ( date ) {
        var
          y, m, d, tomorrow, tomArr, ret;

        y = +date.substr(0, 4);
        m = +date.substr(4, 2);
        d = +date.substr(6, 2);
        tomorrow = new Date(+new Date(y +'-'+ m +'-'+ d) + 24*3600*1000);
        tomorrow = tomorrow.toLocaleDateString();
        tomArr = tomorrow.split('/');
        if ( tomArr[1] < 10 ) {
          tomArr[1] = '0'+ tomArr[1];
        }
        if ( tomArr[2] < 10 ) {
          tomArr[2] = '0'+ tomArr[2];
        }
        ret = tomArr.join('');
        return ret;
      },
      initList: function ( theDay ) {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/news/before/'+ theDay,
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              date = res.date,
              stories = res.stories;

            $('.loading').remove();
            page.renderList(date, stories);
          },
          error: function () {
            $('.loading').remove();
            $('body').html('<div class="error">接口异常</div>');
          }
        });
      },
      renderList: function ( date, stories ) {
        var
          fDate = page.formatDate(date),
          fs = page.formatStories(stories);

        $('.date').html(fDate);
        $('.stories').html(fs);
      },
      formatDate: function ( date ) {
        var
          y, m, d, ret;

        y = date.substr(0, 4);
        m = date.substr(4, 2);
        d = date.substr(6, 2);

        ret = y +'年'+ m +'月'+ d +'日';
        return ret;
      },
      formatStories: function ( rs ) {
        var
          tpl = '', i;

        for ( i = 0; i < rs.length; i++ ) {
          tpl += '<li class="bottom-li J_clickEvent" data-event="gotoEvent" data-id="'+ rs[i].id +'">';
          tpl +=   '<p>'+ rs[i].title +'</p>';
          tpl +=   '<img src="'+ rs[i].images[0] +'">';
          tpl += '</li>';
        }

        return tpl;
      }
    };

  page.init();
});
