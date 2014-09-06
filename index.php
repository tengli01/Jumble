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
		<div id="score_div">
			Score = 0</br>
			Level = 0
		</div>
		<div style="display:none" align="center" id="game_div">
			<?php
	        	$contents = file("data/dict");
		        $line = $contents[rand(0,count($contents)-1)];
			$line = trim($line); // Remove whitespace
		        echo "Your word is: $line</br>";
			$scrambled_line = str_shuffle($line);
			echo "Your jumbled word is: $scrambled_line</br>";
			?>
		</div>
 	</body>
</html>
