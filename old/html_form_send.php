<?php

if(isset($_POST['email'])) {

    // CHANGE THE TWO LINES BELOW
    $email_to = "l.giorgio.99@gmail.com";


    function died($error) {
        // your error code can go here
        echo "An error occurred:<br />";
        echo "<br />";
        echo $error."<br /><br />";
        echo "Please <a onclick='self.close()' style='color:blue; cursor:pointer '>retry</a> removing errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, there is an error in your form.');
    }

    $first_name = $_POST['first_name']; // required
    $email_from = $_POST['email']; // required
    $comments = $_POST['comments']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Email address is unvalid.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'Name is unvalid.<br />';
  }
  if(strlen($comments) < 2) {
    $error_message .= 'Your message is too short.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Mail dal mio sito ";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "'".clean_string($first_name)."' - ";
    $email_message .= clean_string($email_from)."\n";
    $email_message .= "Messaggio: ".clean_string($comments)."\n";

    $email_subject .= "Email dal tuo sito da: ".clean_string($first_name);


// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
?>

<!-- place your own success html below -->

<p style="fontsize=20px">Thank you for contacting me.</p><br>
<script type="text/javascript">setTimeout("window.close();", 3000);</script>

<?php
}
die();
?>
