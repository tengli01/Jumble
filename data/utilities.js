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

// Returns true if 'cookieName' is defined, false otherwise
function doesCookieExist(cookieName)
{
	var cval = getCookie(cookieName);
	if(cval == "")
	{
		return false;
	}
	else
	{
		return true;
	}
}

//This function randomly scrambles the characters of a word
function scrambleWord(word)
{
	var a = word.split(""),n = a.length;
    for(var i = n - 1; i > 0; i--) 
	{
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}