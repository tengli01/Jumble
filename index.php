<!DOCTYPE html>
<html>
	<head>
  		<title>Jumble</title>
		<script src = "data/indexScript.js"></script>
 	</head>
 	<body>
		<h1>JUMBLE!</h1>
		<form>
			<input type="button" id="controlButton" value="Start" onclick="controlClicked()">
			<input type="button" id="instructionsButton" value="Instructions" onclick="instructionsClicked()">
		</form>
		<div style="display:none" align="center" id="game_div">
			<?php
	        	$contents = file("data/dict");
		        $line = $contents[rand(0,count($contents)-1)];
			$line = trim($line); // Remove whitespace
			echo "<script>answer='$line';</script>";
			echo "Your word is: $line<br>";
			$scrambled_line = str_shuffle($line);
			echo "Your jumbled word is: $scrambled_line<br>";
			?>
			Guess:<input type="text" id="guessInput"><input type="button" value="Submit" id="submitGuess" onclick="handleGuess(guessInput.value)">
			<div align="center" id="level_div">
				Level = 0<br>
			</div>
		</div>
		<div align="center" id="answer_div"/>
 	</body>
</html>
