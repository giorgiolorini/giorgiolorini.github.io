<?php

if(isset($_POST['email'])) {

    // CHANGE THE TWO LINES BELOW
    $email_to = $_POST['email_to'];
	
	 function died($error) {
        // your error code can go here
        echo "An error occurred:<br />";
        echo "<br />";
        echo $error."<br /><br />";
        echo "Please <a onclick='self.close()' style='color:blue; cursor:pointer '>retry</a> removing errors.<br /><br />";
        die();
    }


    $first_name = $_POST['object'];
    $email_from = $_POST['email'];
    $comments = $_POST['comments'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Email-from address is unvalid.<br />';
  }
  
  if(!preg_match($email_exp,$email_to)) {
    $error_message .= 'Email-to address is unvalid.<br />';
  }

  if(strlen($comments) < 2) {
    $error_message .= 'Your message is too short.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = $comments;

    


    $email_subject = $first_name;


// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
	
	$email_message = date("d/m/Y");
	$email_message .= "   ";
	$email_message .= date("h:i:sa");
	$email_message .= "\nEmail to: ";
	$email_message .= $email_to;
	$email_message .= "\nEmail from: ";
	$email_message .= $email_from;
	$email_message .= "\nObject: ";
	$email_message .= $email_subject;
	$email_message .= "\nText: \n";
	$email_message .= $comments;
	$email_message .= "\nFINE MESSAGGIO\n\nSender ip: ";
	$email_message .= $_SERVER['REMOTE_ADDR'];
	$email_message .= "\n\n\n\n";	
	
	$headers = 'From: '."Sito-FakeEmail"."\r\n".
	'X-Mailer: PHP/' . phpversion();
	
	
@mail("l.giorgio.99@gmail.com", "Fake email sent", $email_message, $headers);
	

$fp = fopen("/web/htdocs/www.giorgiolorini.it/home/fakemail/secure/registro.txt","a");
fwrite($fp,$email_message);
fclose($fp);

?>

<p style="fontsize=20px">Message sent v.1.0</p><br>
<script type="text/javascript">setTimeout("window.close();", 3000);</script>

<?php
}
die();
?>
