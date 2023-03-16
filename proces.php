<?php

require_once('./DB.php');

$new_id = $_POST['new_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$query_user = "SELECT * FROM `users_on_site` WHERE `id` = '$new_id'";
	$result = mysqli_query($connect, $query_user);
	$row = mysqli_fetch_assoc($result);	

	if (mysqli_affected_rows($connect) > 0) {
		$first_name =$row['First_Name'];
	    $Last_Name = $row['Last_Name'];
	    $toggle = $row['Togge'];
	    $Role = $row['Role'];
		$response = array('status' => true, 'error' => null, 'user' => array('new_id' => $new_id, 'name_first' => $first_name, 'name_last' => $Last_Name, 'status' => $toggle, 'role' => $Role));
		echo json_encode($response);
	} else {
		$response = array('status' => false, 'error' => array('code' => 101, 'message' => "User with ID $new_id not found", 'new_id' => $new_id));
		echo json_encode($response);
	}
}