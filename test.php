<?php
include 'config.php';

echo "PHP is working!<br>";
echo "Database: ";

if ($conn->connect_error) {
    echo "FAILED - " . $conn->connect_error;
} else {
    echo "CONNECTED<br>";
    $result = $conn->query("SELECT COUNT(*) as total FROM visitors");
    $row = $result->fetch_assoc();
    echo "Total visitors: " . $row['total'];
}
$conn->close();
?>