<?php
include 'config.php';

if ($conn->connect_error) {
    echo "Database FAILED: " . $conn->connect_error;
} else {
    echo "Database CONNECTED<br>";
    
    $test = $conn->query("INSERT INTO visitors (email, search_cgpa, search_backlogs, companies_viewed, visit_time) VALUES ('test@test.com', 8.5, 0, 'Google,Microsoft', NOW())");
    
    if ($test) {
        echo "Test insert SUCCESS";
    } else {
        echo "Test insert FAILED: " . $conn->error;
    }
}
$conn->close();
?>