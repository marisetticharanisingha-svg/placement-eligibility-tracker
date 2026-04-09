<?php
$servername = "sql113.byethost24.com";
$username = "b24_41619431";
$password = "Charani@3228";
$dbname = "b24_41619431_placement";
$port = "3307";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
