<!DOCTYPE html>
<html>
	<head>
  		<title>Jumble</title>
		<link type="text/css" rel="stylesheet" href="data/index_stylesheet.css"/>
		<script src = "data/utilities.js"></script>
		<script src = "data/indexScript.js"></script>
 	</head>
 	<body onload="windowLoaded();">
		<div class="overlay"></div>
		<h1 id="game_title">JUMBLE!</h1>
		<div id="control_div">
			<form>
				<input type="button" id="controlButton" value="Start" onclick="controlClicked()">
				<input type="button" id="instructionsButton" value="Instructions" onclick="instructionsClicked()">
			</form>
		</div>
		<div id="game_div">
			<div id="data_div"></div>
			<div id="word_div">
				<div id='answer_div'></div>
				Your word is: <div id='real_word'></div><br>
				<canvas id='scrambled_word'></canvas><br>
			</div>
			Guess:
				<input type="text" id="guessInput"onkeydown="if (event.keyCode == 13) document.getElementById('submitGuess').click()">
				<input type="Submit" value="Submit" id="submitGuess" onclick="handleGuess(guessInput.value)">
			<div id="level_div"></div>
			<div id="result_div"></div>
		</div>
 	</body>
</html>
