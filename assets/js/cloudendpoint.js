/**
 * Google AppEngine API 호출을 위한 환경설정을 끝낸 뒤 pageInitCallback을 호출
 */
function ginit(pageInitCallback) {
    var ROOT = "https://kr-bobplanet.appspot.com/_ah/api";
    var CLIENT_ID = '603054087850-5qgda69d0j99oja4q5cjbl0mr2cp5s7d.apps.googleusercontent.com';
    var SCOPES = 'https://www.googleapis.com/auth/userinfo.email';

	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			gapi.auth.authorize({ client_id: CLIENT_ID, scope: SCOPES, immediate: true}, pageInitCallback);
		}	
	}

	apisToLoad = 2;
    gapi.client.load('bobplanetApi', 'v1', callback, ROOT);
    gapi.client.load('oauth2', 'v2', callback);
}

function fnTodate () {
   var now = new Date();
   var year= now.getFullYear();
   var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
   var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

   return year + '-' + mon + '-' + day;

}


<!-- 서버에서 오늘의 메뉴를 불러옴 -->

function init() {
    ginit(function() {
        console.log('init finished');
        menuOfDate( fnTodate() );
    });
}



function menuOfDate(date) {
    var req = { date: date };
    gapi.client.bobplanetApi.menuOfDate(req).execute(function(resp) {
        console.log(resp);
        var template = Handlebars.compile($('#menu-template').html());
        var html = template(resp);
        $('#content-placeholder').html(html);
    });
}