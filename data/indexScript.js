var level = 0;
var answer;

function controlClicked()
{
	var e = document.getElementById("game_div");
	var btn = document.getElementById("controlButton")
	if(e.style.display == 'none')
	{
		e.style.display = 'block';
		btn.value = 'Quit';
	}
	else
	{
		e.style.display = 'none';
		btn.value = 'Start';
	}	
}

function instructionsClicked()
{
	alert("Instructions go here");
}

function handleGuess(text)
{
	var md5Text = CryptoJS.MD5(text);
	var e = document.getElementById("answer_div");
	if(md5Text==answer)
	{
		e.innerHTML = "Correct";
		level = level + 1;
		document.getElementById("level_div").innerHTML = "Level = "+level+"<br>";
	}
	else
	{
		e.innerHTML = "Incorrect";
	}
}