
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


	menuOfDate = function (date) {
	    var req = { date: date };
	    gapi.client.bobplanetApi.menuOfDate(req).execute(function(resp) {
	        console.log(resp);

          if(window.location.pathname == "/Index.html"){
            
            console.log("a test")

            var template = Handlebars.compile($('#menu-template').html());
            var html = template(resp);
            $('#content-placeholder').html(html);


          } else {
            console.log("b test")
            createDom(resp);
          }

	    });
	}

	function createDom (json) {
    $("#content-placeholder > h5").text(json.date);

		$.each(json.menu, function(i, v) {

      console.log(v)

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

      // Github Latest Commit
  if ($('.github-commit').length) { // Checks if widget div exists (Index only)
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
  }


  }); // end of document ready
})(jQuery); // end of jQuery name space