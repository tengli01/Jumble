<html>
 <head>
  <title>Jumble</title>
 </head>
 <body>
 	Hello World </br>
<?php
        $contents = file("data/dict");
        $line = $contents[rand(0,count($contents)-1)];
	$line = trim($line);
        echo "Your word is: $line</br>";
	$scrambled_line = str_shuffle($line);
	echo "Your jumbled word is: $scrambled_line</br>";
?>

 </body>
</html>
