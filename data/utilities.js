// Given a cookie name, cookie value, and number of days to store the cookie,
// create a new cookie in the document with these values
function setCookie(numDays, cookieName, cookieValue)
{
	var d = new Date();
	d.setTime(d.getTime() + (numDays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cookieName+"="+cookieValue+"; "+expires;
}

// Given a cookie's name, retrieve its value from the document's cookies
function getCookie(cookieName)
{
	var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
	{
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}