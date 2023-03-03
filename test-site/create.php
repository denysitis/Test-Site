<?php 

require_once('./DB.php');
// Тільки для тесту

$first_name = $_POST['first-name'];
$Last_Name = $_POST['last-name'];
$Role = $_POST['role'];
$toggle = $_POST['toggle'];


$sql_create = "INSERT INTO `users_on_site` (`id`, `First_Name`, `Last_Name`, `Role`, `Togge`) VALUES (NULL, '$first_name', '$Last_Name', '$Role', '$toggle')";
mysqli_query($connect, $sql_create);
$id = mysqli_insert_id($connect);
$response = array('status' => true, 'error' => null, 'id' => $id);
echo json_encode($response);