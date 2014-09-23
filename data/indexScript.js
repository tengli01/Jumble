var level = 1;
var num_guesses = 0;
var score = 0;
var answer;
var numDaysToSave = 7;

//This function is called when the user clicks "Start"/"Reset"
//On start: displays the game div and requests a new word
//On reset: clears points, level, num_guesses, and requests a new word
function controlClicked()
{
	var e = document.getElementById("game_div");
	var btn = document.getElementById("controlButton");
	var level_div = document.getElementById("level_div");
	
	if(btn.value == 'Start') // User clicked "Start"
	{
		e.style.display = 'block';
		btn.value = 'Reset';
		if(doesCookieExist("Score"))
		{
			getGameCookies();
			setScore();
			reloadAnswer();
		}
		else
		{
			requestNewWord();
			setScore();
		}
	}
	else // User clicked "Reset"
	{
		level = 1;
		num_guesses = 0;
		score = 0;
		setScore();
		requestNewWord();
	}	
}

// This function loads game values from a saved session
function getGameCookies()
{
	score = parseInt(getCookie("Score"));
	level = parseInt(getCookie("Level"));
	num_guesses = parseInt(getCookie("Num_Guesses"));
	document.getElementById("scrambled_word").innerHTML = getCookie("Scrambled_Word");
	document.getElementById("real_word").innerHTML = getCookie("Real_Word");
}

// This function saves off data needed to make game sessions persistant
function updateGameCookies(_numDaysToSave)
{
	setCookie(_numDaysToSave,"Score",score);
	setCookie(_numDaysToSave,"Level",level);
	setCookie(_numDaysToSave,"Num_Guesses",num_guesses);
	setCookie(_numDaysToSave,"Scrambled_Word",document.getElementById("scrambled_word").innerHTML);
	setCookie(_numDaysToSave,"Real_Word",document.getElementById("real_word").innerHTML);
}

// This function sets the "level_div" to the player's current score
function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Score = "+score+"<br>Number of Guesses = "+num_guesses;
}

// This function gets the current correct answer (a hashed MD5) from the data returned by the server
function reloadAnswer()
{
	var answer_div = document.getElementById("real_word");
	answer = answer_div.innerHTML;
}

// This function performs an AJAX request at the server to get a new word
function requestNewWord()
{
	var new_word_div = document.getElementById("word_div");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4)
		{
			new_word_div.innerHTML = request.responseText;
			reloadAnswer();
			updateGameCookies(numDaysToSave);
		}
	}
	request.open("GET","data/getWord.php",true);
	request.send();
}

// This function handles determining if a player's guess (passed in through the 'text' param) is correct
// It hashes the param and compares it to 'answer' (should be the value of 'answer_div')
// On correct: increment score, level, num_guesses, set the level_div to new value, request a new word, update cookies
// On incorrect: increment num_guesses, update level_div, update cookies
function handleGuess(text)
{
	var e = document.getElementById("result_div");
	if(text==answer)
	{
		e.innerHTML = "Correct";
		score = score + (level * 10);
		level = level + 1;
		num_guesses = num_guesses + 1;
		setScore();
		requestNewWord();
	}
	else
	{
		e.innerHTML = "Incorrect";
		num_guesses = num_guesses + 1;
		setScore();
		updateGameCookies(numDaysToSave);
	}
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