<html>
 <head>
  <title>Jumble</title>
 </head>
 <body>
 	Hello World </br>
<?php
        $contents = file("data/dict");
        $line = $contents[rand(0,count($contents)-1)];
        echo "Your word is: $line\n"
?>

 </body>
</html>
