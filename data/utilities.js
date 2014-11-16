fireworkLocations = new Array(10);

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

// This function creates a new Firework object, with a posX, posY, max Radius (the final size of the firework) and acceleration (how much the firework grows each frame)
function Firework(canvas)
{
	var acceleration = 2 * Math.random();
	var x = canvas.width * Math.random();
	var y = canvas.height * Math.random();
	var radius = 10 * Math.random();
	
	this.posX = x;
	this.posY = y;
	this.maxRadius = radius;
	this.accel = acceleration;
}

//This function scrambles the title string
function jumbleContinuously()
{
	var e = document.getElementById("game_title").innerHTML;
	document.getElementById("game_title").innerHTML = scrambleWord(e);
}

// This is a helper function that is called as soon as the page is loaded
function windowLoaded()
{
	var canvas = document.getElementById("celebration_canvas");
	for(var i = 0; i < fireworkLocations.length; i++)
	{
		fireworkLocations[i] = new Firework(canvas);
	}

	setInterval(jumbleContinuously,1000);
	setInterval(drawFireworks,250);
}

// This function sets the "level_div" to the player's current score
function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Score = "+score+"<br>Number of Guesses = "+num_guesses;
}

// This function draws the fireworks that are displayed when the player wins
function drawFireworks()
{
	var canvas = document.getElementById("celebration_canvas");
	var context = canvas.getContext("2d");
	clearCanvas(canvas);
	
	
}

// This function clears (redraws as blank) a canvas
function clearCanvas(canvas)
{
	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
}

//This function draws a word in the specified canvas with boxes around each letter.
//If letterIndex is specified, then it will draw a circle around that letter
function drawWord(word,canvas,letterIndex)
{
	//Set up canvas
	clearCanvas(canvas);
	var characterOffset = canvas.width / word.length;
	var context = canvas.getContext("2d");
	context.font = "bold 75px Courier New";
	
	//Handle actual drawing
	for(var idx = 0; idx < word.length; idx++)
	{
		letter = word.charAt(idx);
		if(idx == letterIndex) // Draw a circle around the special index
		{
			var x = idx * characterOffset+20;
			context.beginPath();
			context.arc(x,canvas.height/2-20,25,0,2*Math.PI);
			context.lineWidth = 3;
			context.strokeStyle = '#003300';
			context.stroke();
		}
		context.fillText(letter,idx * characterOffset,canvas.height/2);
	}
}