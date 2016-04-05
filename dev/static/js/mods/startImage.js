/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-03-30 16:50:08
 * @version $Id$
 * zhDaily startImage
 */

$(function () {
  var
    apiVersion = 4,
    page = {
      init: function () {
        page.initAjax();
      },
      initAjax: function () {
        $.ajax({
          type: 'GET',
          url: 'http://news-at.zhihu.com/api/'+ apiVersion +'/start-image/1080*1776',
          data: {},
          dataType: 'json',
          timeout: 15000,
          success: function ( res ) {
            var
              text = res.text,
              img = res.img;

            $('.pic .loading').remove();
            $('.pic img').attr('src', img).addClass('show');
            $('.pic h3').text(text);
          },
          error: function () {
            console.log('接口异常');
          }
        });
      }
    };

  page.init();
});
