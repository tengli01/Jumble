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

// This function is called when 'Instructions' is clicked
function instructionsClicked()
{
	alert("==How To Play==\n"
		 +"1) Press start to begin\n"
		 +"2) You are presented with a scrambled word, try to figure out what word it represents and type it into the submission box\n"
		 +"3) If you are correct, you will get a new word. If not, try again!\n"
		 +"Your game is automatically saved, you can close and reopen to return to where you were.");
}

//This function takes scrambles the title string
function jumbleContinuously()
{
	var e = document.getElementById("game_title").innerHTML;
	document.getElementById("game_title").innerHTML = scrambleWord(e);
}

// This is a helper function that is called as soon as the page is loaded
function windowLoaded()
{
	setInterval(jumbleContinuously,1000);
}

// This function sets the "level_div" to the player's current score
function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Score = "+score+"<br>Number of Guesses = "+num_guesses;
}

//This function draws a word in the specified canvas with boxes around each letter.
//If letterIndex is specified, then it will draw a circle around that letter
function drawWord(word,canvas,letterIndex)
{
	
}