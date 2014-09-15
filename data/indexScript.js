var level = 1;
var num_guesses = 0;
var score = 0;
var answer;

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
		setScore();
		requestNewWord();
	}
	else // User clicked "Reset"
	{
		level = 1;
		num_guesses = 0;
		requestNewWord();
		setScore();
		updateGameCookies();
	}	
}

// This function saves off data needed to make game sessions persistant
function updateGameCookies(numDaysToSave)
{
	setCookie(numDaysToSave,"Score",score);
	setCookie(numDaysToSave,"Level",level);
	setCookie(numDaysToSave,"Num_Guesses",num_guesses);
	setCookie(numDaysToSave,"Scrambled_Word",document.getElementById("answer_div").innerHTML);
	setCookie(numDaysToSave,"Cheater",document.getElementById("cheater").innerHTML);
	setCookie(numDaysToSave,"Real_Word",document.getElementById("real_word").innerHTML);
}

// This function sets the "level_div" to the player's current score
function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Score = "+score+"<br>Number of Guesses = "+num_guesses;
}

// This function gets the current correct answer (a hashed MD5) from the data returned by the server
function reloadAnswer()
{
	var answer_div = document.getElementById("answer_div");
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
	var md5Text = CryptoJS.MD5(text);
	var e = document.getElementById("result_div");
	if(md5Text==answer)
	{
		e.innerHTML = "Correct";
		score = score + (level * 10);
		level = level + 1;
		num_guesses = num_guesses + 1;
		setScore();
		requestNewWord();
		updateGameCookies();
	}
	else
	{
		e.innerHTML = "Incorrect";
		num_guesses = num_guesses + 1;
		setScore();
		updateGameCookies();
	}
}

// This function is called when 'Instructions' is clicked
function instructionsClicked()
{
	alert("Instructions go here");
}