<?php
include 'config.php';

$email = $_POST['email'];
$cgpa = $_POST['cgpa'];
$backlogs = $_POST['backlogs'];
$companies = $_POST['companies'];

$sql = "INSERT INTO visitors (email, search_cgpa, search_backlogs, companies_viewed) 
        VALUES ('$email', '$cgpa', '$backlogs', '$companies')";

if ($conn->query($sql) === TRUE) {
    echo "Visitor saved!";
} else {
    echo "Error: " . $conn->error;
}
$conn->close();
?>
