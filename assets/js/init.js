
(function($){
  $(function(){

	$('.parallax').parallax();

	$('.button-collapse').sideNav({
	  menuWidth : 240,
	  activationWidth : 70
	});

	$('.collapsible').collapsible({
	accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});


	menuOfDate = function ( date, successFn ) {
	    var req = { date: date };
	    gapi.client.bobplanetApi.menuOfDate(req).execute(function(resp) {
        console.log(resp);

        return successFn(resp);

	    });
	};

  response_json = function (resp) {

    if(window.location.pathname !== "/index_type_b.html"){
      console.log('a test')
      var template = Handlebars.compile($('#menu-template').html());
      var html = template(resp);
      $('#content-placeholder').html(html);


    } else {

      console.log('b test')
      $("#content-placeholder > h5").text(json.date);

      $.each(json.menu, function(i, v) {

        var description = " ";

            $.each(v.submenu, function(i, v){
              description += v.item.name + ", ";
            });
    

          // 카드를 구성한다
          card =+ "" +
              "<li class=\"collection-item avatar\">" +
                "<img src=\"" + v.item.thumbnail + "\" class=\"circle\">" +
                "<span class=\"title\">" + v.item.name + "</span>" +
                "<span class=\"badge\">("+ v.item.numThumbDowns +")</span>" +
                "<p class=\"brown-text\">" + description + "<br />" +
                 " (" + v.calories + ") Kcal</p>" +
                "<a href=\"#!\" class=\"secondary-content deep-orange-text\"></a>" +
              "</li>";
      $("#content-placeholder > ul").append(card);

      });

    };

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


// GA코드 추가하기 

$('.appDownload').click(function(){
  var banner_click = $(this).parents('div[id]').attr('id');
  ga('send', 'event', 'BannerBtnClick', 'appDownload', banner_click);
});

$('.githubJoin').click(function(){
  var banner_click = $(this).parents('div[id]').attr('id');
  ga('send', 'event', 'BannerBtnClick', 'githubJoin', banner_click);
});




  }); // end of document ready
})(jQuery); // end of jQuery name space