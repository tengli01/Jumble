<!DOCTYPE html>
<html>
	<head>
  		<title>Jumble</title>
		<script src = "data/indexScript.js"></script>
		<script src="http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js"></script>
 	</head>
 	<body>
		<h1>JUMBLE!</h1>
		<form>
			<input type="button" id="controlButton" value="Start" onclick="controlClicked()">
			<input type="button" id="instructionsButton" value="Instructions" onclick="instructionsClicked()">
		</form>
		<div style="display:none" align="center" id="game_div">
			<?php
	        	require("data/getWord.php");
			?>
			Guess:<input type="text" id="guessInput"><input type="button" value="Submit" id="submitGuess" onclick="handleGuess(guessInput.value)">
			<div align="center" id="level_div">
				Level = 0<br>
			</div>
		</div>
		<div align="center" id="answer_div"/>
 	</body>
</html>
