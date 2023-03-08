<?php 

require_once('./DB.php');

$user_id = $_POST['id'];
$first_name = $_POST['first-name'];
$Last_Name = $_POST['last-name'];
$Role = $_POST['role'];
$toggle = $_POST['toggle'];


if (empty($first_name) || empty($Last_Name) || empty($Role) || empty($toggle)) {
	$response = array('status' => false, 'error' => array('code' => 100, 'message' => "Not all required fields are filled"));
	echo json_encode($response);
} else {
	if (empty($user_id)) {
		$sql_create = "INSERT INTO `users_on_site` (`id`, `First_Name`, `Last_Name`, `Role`, `Togge`) VALUES (NULL, '$first_name', '$Last_Name', '$Role', '$toggle')";
		mysqli_query($connect, $sql_create);

		$new_id_user = mysqli_insert_id($connect);

		$response = array('status' => true, 'error' => null, 'user' => array('id' => $new_id_user, 'name_first' => $first_name, 'name_last' => $Last_Name, 'status' => $toggle, 'role' => $Role));
		echo json_encode($response);
	}
	else {
		$sql_update = "UPDATE `users_on_site` SET `First_Name` = '$first_name', `Last_Name` = '$Last_Name', `Role` = '$Role', `Togge` = '$toggle'  WHERE `users_on_site`.`id` = '$user_id'";
		mysqli_query($connect, $sql_update);
		
		if (mysqli_affected_rows($connect) > 0) {
			$response = array('status' => true, 'error' => null, 'user' => array('id' => $user_id, 'name_first' => $first_name, 'name_last' => $Last_Name, 'status' => $toggle, 'role' => $Role));
			echo json_encode($response);
		} else {
			$response = array('status' => false, 'error' => array('code' => 101, 'message' => "User with ID $user_id not found"));
			echo json_encode($response);
		}
	}
}