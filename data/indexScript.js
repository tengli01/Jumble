var level = 1; // Stores what level the player is on
var num_guesses = 0; // Stores how many guesses the player has made
var score = 0; // Stores the current score
var answerIndex = 0; // Stores an index into the answers and letters array
var answers = new Array(); // Array of words for the player to guess
var letters = new Array(); // Array of indices into each word, which specify the letter of the special word
var currentAnswer; // Stores the correct answer that the player is currently trying to guess
var currentLetter; // Stores the correct letter index of the word the player is guessing
var specialWord; // Stores the final word the player is trying to guess
var finalWord; // Stores the scrambled version of the special word that the player builds up letter by letter
var numDaysToSave = 7; // Stores how long the cookie that saves the player's progress lasts

//This function is called when the user clicks "Start"/"Reset"
//On start: displays the game div and requests a new word list from the server
//On reset: clears points, level, num_guesses, and requests a new word list from the server
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
			reloadAnswer(answerIndex,finalWord);
			requestNewWord();
		}
		else
		{
			level = 1;
			num_guesses = 0;
			score = 0;
			answerIndex = 0;
			requestNewWordList();
			setScore();
		}
	}
	else // User clicked "Reset"
	{
		level = 1;
		num_guesses = 0;
		score = 0;
		document.getElementById("submitGuess").disabled = false;
		var canvas = document.getElementById("final_word_canvas");
		drawWord("",canvas,-1);
		setScore();
		requestNewWordList();
	}	
}

// This function loads game values from a saved session
function getGameCookies()
{
	score = parseInt(getCookie("Score"));
	level = parseInt(getCookie("Level"));
	num_guesses = parseInt(getCookie("Num_Guesses"));
	answerIndex = parseInt(getCookie("Answer_Index"));
	finalWord = getCookie("Final_Word");
	var canvas = document.getElementById("final_word_canvas");
	drawWord(finalWord,canvas,-1);
	var answer_div = document.getElementById("data_div").innerHTML = getCookie("game_data");
}

// This function saves off data needed to make game sessions persistant
function updateGameCookies(_numDaysToSave)
{
	setCookie(_numDaysToSave,"Score",score);
	setCookie(_numDaysToSave,"Level",level);
	setCookie(_numDaysToSave,"Num_Guesses",num_guesses);
	setCookie(_numDaysToSave,"Answer_Index",answerIndex);
	setCookie(_numDaysToSave,"Final_Word",finalWord);
	
	//Reconstruct the string that we originally got from the server
	var game_data = specialWord + ',';
	for(var i = 0; i < answers.length; i++)
	{
		game_data += letters[i];
		game_data += ',';
		game_data += answers[i];
		if(i != answers.length - 1)
		{
			game_data += ','; // Only add a trailing comma if we are on the last word in the array
		}
	}
	setCookie(_numDaysToSave,"game_data",game_data);
}

// This function splits the comma-separated list of words from the server into an array of words, with the special word first 
// and every other word prefixed by the index of the letter that is in the special word
// EX: bat,0,ball,2,drat,1,at
//	Special word is 'bat', the first word to guess is 'ball' and the index of the letter making up part of the special word is '0'
// If we are loading from cookies, than the parameters to this function should be filled in by whatever the anserIndex and finalWord we loaded are
// Otherwise, they can be '0' and "", respectively.
function reloadAnswer(_answerIndex, _finalWord)
{
	var answer_div = document.getElementById("data_div");
	answerList = answer_div.innerHTML.split(",");
	specialWord = answerList[0];
	answerIndex = _answerIndex;
	finalWord = _finalWord;
	answers = new Array();
	letters = new Array();
	
	for( var i = 1; i < answerList.length; i += 2)
	{
		letters.push(parseInt(answerList[i]));
		answers.push(answerList[i+1]);
	}
}

// This function performs an AJAX request at the server to get a new word list
// Should only be called when the player presses "Start" with no cookies or "Reset"
function requestNewWordList()
{
	var new_word_div = document.getElementById("data_div");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4)
		{
			new_word_div.innerHTML = request.responseText;
			reloadAnswer(0,"");
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
	if(answerIndex < answers.length) // Player needs one of the non-special words
	{
		currentAnswer = answers[answerIndex];
		currentLetter = letters[answerIndex];
		var scrambledWord = scrambleWord(currentAnswer);
		
		document.getElementById("real_word").innerHTML = currentAnswer;
		var canvas = document.getElementById("scrambled_word_canvas");
		drawWord(scrambledWord,canvas,currentLetter);
	}
	else // The player has guessed all the correct words, time for the special word
	{
		currentAnswer = specialWord;
		
		document.getElementById("real_word").innerHTML = currentAnswer;
		var canvas = document.getElementById("scrambled_word_canvas");
		drawWord("Final Word",canvas,-1);
		level = "Final Word";
		setScore();
	}
}

// This function handles determining if a player's guess (passed in through the 'text' param) is correct
// On correct: increment score, level, num_guesses, set the level_div to new value, request a new word, update cookies
// On incorrect: increment num_guesses, update level_div, update cookies
function handleGuess(text)
{
	var e = document.getElementById("result_div");
	if(text==currentAnswer) // Player guessed right
	{
		if(currentAnswer==specialWord)
		{
			// The player has guessed the special word, game over
			e.innerHTML = "Game Over";
			score = score * 10;
			num_guesses = num_guesses + 1;
			setScore();
			document.getElementById("submitGuess").disabled = true;
			document.getElementsByClassName("overlay").display = 'block';
			updateGameCookies(numDaysToSave);
		}
		else // The player has guessed one of the levels, get a new word
		{
			e.innerHTML = "Correct";
			score = score + (level * 10);
			level = level + 1;
			finalWord += currentAnswer.charAt(currentLetter);
			var canvas = document.getElementById("final_word_canvas");
			drawWord(finalWord,canvas,-1);
			
			num_guesses = num_guesses + 1;
			answerIndex = answerIndex + 1;
			setScore();
			requestNewWord();
			updateGameCookies(numDaysToSave);
		}
	}
	else // Player guessed wrong
	{
		e.innerHTML = "Incorrect";
		num_guesses = num_guesses + 1;
		setScore();
		updateGameCookies(numDaysToSave);
	}
}