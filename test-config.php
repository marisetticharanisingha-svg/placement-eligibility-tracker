<?php
$servername = "sql113.byethost24.com";
$username = "b24_41619431";
$password = "Charani@3228";
$dbname = "b24_41619431_placement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "FAILED: " . $conn->connect_error;
} else {
    echo "CONNECTED!";
}
?>