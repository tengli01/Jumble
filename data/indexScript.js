var level = 1;
var num_guesses = 0;
var answer;

function controlClicked()
{
	var e = document.getElementById("game_div");
	var btn = document.getElementById("controlButton");
	var level_div = document.getElementById("level_div");
	
	if(e.style.display == 'none') // User clicked "Start"
	{
		e.style.display = 'block';
		btn.value = 'Quit';
		reloadAnswer();
	}
	else // User clicked "Quit"
	{
		e.style.display = 'none';
		btn.value = 'Start';
		level = 1;
		num_guesses = 0;
		setScore();
	}	
}

function instructionsClicked()
{
	alert("Instructions go here");
}

function setScore()
{
	document.getElementById("level_div").innerHTML = "Level = "+level+"<br>Number of Guesses = "+num_guesses;
}

function reloadAnswer()
{
	var answer_div = document.getElementById("answer_div");
	answer = answer_div.innerHTML;
}

function handleGuess(text)
{
	var md5Text = CryptoJS.MD5(text);
	var e = document.getElementById("result_div");
	if(md5Text==answer)
	{
		e.innerHTML = "Correct";
		level = level + 1;
		num_guesses = num_guesses + 1;
		setScore();
		
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
	else
	{
		e.innerHTML = "Incorrect";
		num_guesses = num_guesses + 1;
		setScore();
	}
}