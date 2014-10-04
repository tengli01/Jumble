var level = 1;
var num_guesses = 0;
var score = 0;
var answerIndex;
var answers = new Array();
var letters = new Array();
var currentAnswer;
var currentLetter;
var specialWord;
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
			level = 1;
			num_guesses = 0;
			score = 0;
			requestNewWordList();
			setScore();
		}
	}
	else // User clicked "Reset"
	{
		level = 1;
		num_guesses = 0;
		score = 0;
		setScore();
		requestNewWordList();
	}	
}

// This function loads game values from a saved session
function getGameCookies()
{
	//score = parseInt(getCookie("Score"));
	//level = parseInt(getCookie("Level"));
	//num_guesses = parseInt(getCookie("Num_Guesses"));
	//answerIndex = parseInt(getCookie("AnswerIndex"));
	//document.getElementById("scrambled_word").innerHTML = getCookie("Scrambled_Word");
	//document.getElementById("real_word").innerHTML = getCookie("Real_Word");
}

// This function saves off data needed to make game sessions persistant
function updateGameCookies(_numDaysToSave)
{
	//setCookie(_numDaysToSave,"Score",score);
	//setCookie(_numDaysToSave,"Level",level);
	//setCookie(_numDaysToSave,"Num_Guesses",num_guesses);
	//setCookie(_numDaysToSave,"AnswerIndex",answerIndex);
	//setCookie(_numDaysToSave,"Scrambled_Word",document.getElementById("scrambled_word").innerHTML);
	//setCookie(_numDaysToSave,"Real_Word",document.getElementById("real_word").innerHTML);
}

// This function sets the "level_div" to the player's current score
function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Score = "+score+"<br>Number of Guesses = "+num_guesses;
}

// This function gets the comma-separated list of words, with the special word first and every other word prefixed by what letter is in the special word
function reloadAnswer()
{
	var answer_div = document.getElementById("data_div");
	answerList = answer_div.innerHTML.split(",");
	specialWord = answerList[0];
	answerIndex = 0;
	answers = new Array();
	letters = new Array();
	
	for( var i = 1; i < answerList.length; i += 2)
	{
		letters.push(answerList[i]);
		answers.push(answerList[i+1]);
	}
}

// This function performs an AJAX request at the server to get a new word
function requestNewWordList()
{
	var new_word_div = document.getElementById("data_div");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4)
		{
			new_word_div.innerHTML = request.responseText;
			reloadAnswer();
			requestNewWord();
			updateGameCookies(numDaysToSave);
		}
	}
	request.open("GET","data/getWord.php",true);
	request.send();
}

// This function gets a new word and special letter from the list of words and special letters received from the server
function requestNewWord()
{
	currentAnswer = answers[answerIndex];
	currentLetter = letters[answerIndex];
	var scrambledWord = scrambleWord(currentAnswer);
	
	document.getElementById("real_word").innerHTML = currentAnswer;
	document.getElementById("scrambled_word").innerHTML = scrambledWord;
}

// This function handles determining if a player's guess (passed in through the 'text' param) is correct
// It hashes the param and compares it to 'answer' (should be the value of 'answer_div')
// On correct: increment score, level, num_guesses, set the level_div to new value, request a new word, update cookies
// On incorrect: increment num_guesses, update level_div, update cookies
function handleGuess(text)
{
	var e = document.getElementById("result_div");
	if(text==currentAnswer)
	{
		e.innerHTML = "Correct";
		score = score + (level * 10);
		level = level + 1;
		num_guesses = num_guesses + 1;
		answerIndex = answerIndex + 1;
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