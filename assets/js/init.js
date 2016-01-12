
(function($){
  $(function(){

	$('.parallax').parallax();
  $('.scrollspy').scrollSpy();
  $('.slider').slider();

  // 사용할 앱의 KAKAO JavaScript 키를 설정해 주세요.
  Kakao.init('b498b2351acad8353f45dc3064cd191d');


	$('.button-collapse').sideNav({
	  menuWidth : 240,
	  activationWidth : 70
	});

	$('.collapsible').collapsible({
	accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});


  menu = function ( id, successFn ) {
    var req = { 'id': id };
    console.log(req, $.type(req) );
      gapi.client.bobplanetApi.menu(req).execute(function(resp) {

        return successFn(resp);

      });
  };


	menuOfDate = function ( date, successFn ) {
	    var req = { date: date };
	    gapi.client.bobplanetApi.menuOfDate(req).execute(function(resp) {
        console.log(resp);

        return successFn(resp);

	    });
	};

  response_json = function (resp) {

    if( url('filename') == "index_type_b" ){

      console.log('b test')
      $('.hide').removeClass();

      $("#content-placeholder > h5").text(resp.date);
      

      $.each(resp.menu, function(i, v) {

        var description = " ";

            $.each(v.submenu, function(i, v){
              description += v.item.name + ", ";
            });
    

          // 카드를 구성한다
          card =+ "" +
              "<li class=\"collection-item avatar\">" +
                "<img src=\"" + v.item.thumbnail + "\" class=\"circle\">" +
                "<span class=\"title\">" + v.item.name + "</span>" +
                "<span class=\"badge\">"+ v.calories  +" Kcal</span>" +
                "<p class=\"brown-text\">" + description + "</p>" +
                // "<a href=\"#!\" class=\"secondary-content deep-orange-text\"></a>" +
              "</li>";
      $("#content-placeholder > ul").append(card);


      });

    } else {
      console.log('a test')
      var template = Handlebars.compile($('#menu-template').html());
      var html = template(resp);
      $('#content-placeholder').html(html);

    // } else {
    //   console.log('Thank you!')
    }; // if else 종료
  }; // response_json 종료

// 어제 메뉴 내일 메뉴 확인하기
$("body").on("click", ".date", function( e ){
  menuOfDate($(this).attr("data-id"), response_prev_next );
});


  function response_prev_next (resp) {

    $(".previousDate").attr('data-id', resp.previousDate);
    $(".today").text(resp.date);
    $(".nextDate").attr('data-id', resp.nextDate);

    $.each(resp.menu, function(i, v) {

      var description = " ";      
      $.each(v.submenu, function(i, v){
        description += v.item.name + ", ";      
      });

      $(".grid-item").eq(i).attr('id', v.id)
      .find('img').attr('src', v.item.thumbnail).parents('.small')
      .find('.menu_name').text(v.item.name).parents('.small')
      .find('p').text(description);

    });

  };


      // Github Latest Commit
  // if ($('.github-commit').length) { // Checks if widget div exists (Index only)
    $.ajax({
      url: "https://api.github.com/repos/bobplanet/Bobplanet/commits/master",
      dataType: "json",
      success: function (data) {
        var sha = data.sha,
            date = "(" + jQuery.timeago(data.commit.author.date) + ")",
            message = data.commit.message;
        if ($(window).width() < 900) {
          sha = sha.substring(0,7);
        }
        $('.github-commit').find('.date').html(date);
        $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);
        $('.github-commit').find('.message').html(message);
      }
    });
  // };


// type=webview 로 접속했을 때는 header와 footer를 모두 띄우지 않음    
   
if (url('?type') == 'webview') {   
  console.log('webview');    
  $('nav').remove();   
  $('footer').remove();    
}    

// GA코드 추가하기 

$('.appDownload').click(function(){
  var banner_click = $(this).parents('div[id]').attr('id');
  var download_market = $(this).text();

  ga('send', 'event', 'BannerBtnClick', download_market, banner_click);

  fbq('track', 'AddToCart', {
    content_name: 'App download', 
    content_category: 'Android > ' + download_market,
    content_ids: banner_click,
    content_type: 'product'
    // value: 1.00,
    // currency: 'USD' 
  });  

});

sharekakao = function(resp) {
  console.log(resp);

  var description = "";      
  $.each(resp.submenu, function(i, v){
    description += v.item.name + ", ";      
  });

  // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
  Kakao.Link.createTalkLinkButton({
    container: '.kakao-link-btn',
    label: '[' + resp.date + ']' + '오늘의 ' + resp.when + '메뉴를 알려드립니다. "' + resp.item.name + '", ' + description,
    image: {
      src: resp.item.image,
      width: '300',
      height: '200'
    },
    webButton: {
      text: '밥플래닛',
      url: 'https://bobplanet.kr/#' + resp.id // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
    },
    fail: Materialize.toast('카카오톡 링크는 모바일 기기에서만 전송 가능합니다.', 4000, 'rounded')
  });

};

$('.githubJoin').click(function(){
  var banner_click = $(this).parents('div[id]').attr('id');
  ga('send', 'event', 'BannerBtnClick', 'githubJoin', banner_click);
});



  }); // end of document ready
})(jQuery); // end of jQuery name space