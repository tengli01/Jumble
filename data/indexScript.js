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
	alert("Instructions go here")
}