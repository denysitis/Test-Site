<?php 

require_once('./DB.php');

//print_r($_POST);

$user_id = $_POST['id'];
print_r(empty($user_id));
$first_name = $_POST['first-name'];
$Last_Name = $_POST['last-name'];
$Role = $_POST['role'];
$toggle = $_POST['toggle'];


if (empty($user_id) || empty($first_name) || empty($Last_Name) || empty($Role) || empty($toggle)) {
		$response = array('status' => false, 'error' => array('code' => 100, 'message' => "Not all required fields are filled"));
		echo json_encode($reіsponse);
}
else {
	if ($user_id == 1) {
		$sql_create = "INSERT INTO `users_on_site` (`id`, `First_Name`, `Last_Name`, `Role`, `Togge`) VALUES (NULL, '$first_name', '$Last_Name', '$Role', '$toggle')";
		mysqli_query($connect, $sql_create);
		$id = mysqli_insert_id($connect);
		$response = array('status' => true, 'error' => null, 'id' => $id);
		echo json_encode($response);
	}
	else {
		$sql_update = "UPDATE `users_on_site` SET `First_Name` = '$first_name', `Last_Name` = '$Last_Name', `Role` = '$Role', `Togge` = '$toggle'  WHERE `users_on_site`.`id` = '$user_id'";
		mysqli_query($connect, $sql_update);
		
		// $sql_update = "INSERT INTO `users_on_site` (`id`, `First_Name`, `Last_Name`, `Role`, `Togge`) VALUES (NULL, '$first_name', '$Last_Name', '$Role', '$toggle') ON DUPLICATE KEY UPDATE `First_Name` = VALUES(`First_Name`), `Last_Name` = VALUES(`Last_Name`), `Role` = VALUES(`Role`), `Togge` = VALUES(`Togge`)";
		// mysqli_query($connect, $sql_update);

		if (mysqli_affected_rows($connect) > 0) {
			$response = array('status' => true, 'error' => null, 'user' => array('id' => $user_id, 'name_first' => $first_name, 'name_last' => $last_name, 'status' => $toggle == 'ON'));
			echo json_encode($response);
		} else {
			$response = array('status' => false, 'error' => array('code' => 101, 'message' => "User with ID $user_id not found"));
			echo json_encode($response);
		}
	}
}
