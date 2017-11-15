$(document).ready(function() {
    checkCookies();
});
var chromeElements = document.getElementsByClassName("chrome-content");
var safariElements = document.getElementsByClassName("safari-content");

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() { 
	//navigator.serviceworkercontainer.register('sw.js').then(function(registration){
                navigator.serviceWorker.register('sw.js').then(function(registration) {
                        // Registration was successful 
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                        // registration failed :( 
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
    }

    function checkCookies() {
        var cook1 = Cookies.get("PBM_spm");
		var cook2 = Cookies.get("IS");
		if (cook1 == 'undefined' || cook1 == null || cook2 == 'undefined' || cook2 == null) {
            setCookies();
            //showBookmark();
        }
        else {
            if (cook2 == 'Y') 
			{
                hideBookmark();
            } else {
                showBookmark();
            }
        }
	}


        function setCookies() {
            var cook_name = "PBM_spm";
            var value = 'PBM;1';
            var days = '1';
            var isset = null;
            var d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            value = value + ';' + expires;
            if (Cookies.set(cook_name, value, {
                    expires: 7
                })) {
                isset = Cookies.get('PBM_spm');
            }
            if (isset != null || isset != 'undefined') Cookies.set('IS', 'Y');
            else {
                Cookies.set('IS', 'N');
            }
        }

        function hideBookmark() {
            if (chromeElements.length > 0) {
                chromeElements[0].style.display = "none";
                safariElements[0].style.display = "none";
            }
        }

        function showBookmark() {
            if (chromeElements.length > 0) {
                chromeElements[0].style.display = "block";
                safariElements[0].style.display = "block";
            }
        }

        function bookmarkLoader() {
            var chromeOnAndroid = 'Android,Chrome,Safari';
            var chromeOnIos = 'Mac,CriOS,Safari';
            var safari = 'Mac,Safari';
            var regex = new RegExp(/(android)|(chrome)|(crios)|(mac)|(safari)/gi);
            var result = navigator.userAgent.match(regex);
		alert(result);
            if (result == chromeOnAndroid){
				alert('Chrome on android');
			}
            else if (result == chromeOnIos) {
				alert('Chrome on iOS');
			}
            else if (result == safari){
				alert('Safari on iOS');
			}
            else {
				alert('none');
			}
        }
