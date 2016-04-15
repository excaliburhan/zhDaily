/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-04-05 22:32:17
 * @version $Id$
 * zhDaily today
 */

$(function () {
  var
    apiVersion = 4,
    page = {
      init: function () {
        page.bindEvent();
        page.initList();
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
      initList: function () {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/news/latest',
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              date = res.date,
              stories = res.stories,
              topStories = res.top_stories;

            $('.loading').remove();
            page.renderList(date, topStories, stories);
          },
          error: function () {
            $('.loading').remove();
            $('body').html('<div class="error">接口异常</div>');
          }
        });
      },
      renderList: function ( date, topStories, stories ) {
        var
          fDate = page.formatDate(date),
          fts = page.formatTop(topStories),
          fs = page.formatStories(stories);

        $('.date').html(fDate);
        $('.top-stories').html(fts);
        $('.stories').html(fs);
        page.initSlider();
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
      formatTop: function ( rs ) {
        var
          tpl = '', i;

        tpl += '<div class="slider-outer"><ul id="slider-wrap" class="slider-wrap">';
        for ( i = 0; i < rs.length; i++ ) {
          tpl += '<li class="top-li J_clickEvent" data-event="gotoEvent" data-id="'+ rs[i].id +'">';
          tpl +=   '<img class="lib-lazy" dataimg="'+ rs[i].image +'">';
          tpl +=   '<p>'+ rs[i].title +'</p>';
          tpl += '</li>';
        }
        tpl += '</ul></div>';

        return tpl;
      },
      formatStories: function ( rs ) {
        var
          tpl = '', tmpImg, i;

        for ( i = 0; i < rs.length; i++ ) {
          tmpImg = rs[i].images ? rs[i].images[0] : '';
          tpl += '<li class="bottom-li J_clickEvent" data-event="gotoEvent" data-id="'+ rs[i].id +'">';
          tpl +=   '<p>'+ rs[i].title +'</p>';
          tpl +=   '<img src="'+ tmpImg +'">';
          tpl += '</li>';
        }

        return tpl;
      },
      // 初始化轮播
      initSlider: function () {
        var
          slider = window.lib.Slider;

        new slider('.slider', {
          loop: true,
          play: true,
          trigger: '.slider-status',
          hasTrigger: true,
          activeTriggerCls: 'active',
          lazy: '.lib-lazy'
        });
      }
    };

  page.init();
});
