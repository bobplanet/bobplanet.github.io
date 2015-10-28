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
