<?php 

require_once('./DB.php');

$user_id = mysqli_real_escape_string($connect, $_POST['id']);
$first_name = mysqli_real_escape_string($connect, $_POST['first-name']);
$Last_Name = mysqli_real_escape_string($connect, $_POST['last-name']);
$Role = mysqli_real_escape_string($connect, $_POST['role']);
$toggle = mysqli_real_escape_string($connect, $_POST['toggle']);


if ($_SERVER["REQUEST_METHOD"] == "POST") {

	if (preg_match('/\d/', $first_name)) { // додано перевірку на цифри
	    $response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле ім'я не може містити цифри"));
	    echo json_encode($response);
	    exit();
	}
	else if (preg_match('/\s/', $first_name)) { // додано перевірку на пробіли
	    $response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле ім'я не може містити пробіли"));
	    echo json_encode($response);
	    exit();
	}
	elseif (preg_match('/\d/', $Last_Name)) { // додано перевірку на цифри
	    $response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле прізвище не може містити цифри"));
	    echo json_encode($response);
	    exit();
	}
	else if (preg_match('/\s/', $Last_Name)) { // додано перевірку на пробіли
	    $response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле прізвище не може містити пробіли"));
	    echo json_encode($response);
	    exit();
	}
	else if (empty($first_name)) {		
		$response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле імя не може бути пустим"));
		echo json_encode($response);
		exit();
	} 
	else if (empty($Last_Name)) {		
		$response = array('status' => false, 'error' => array('code' => 100, 'message' => "Поле прізвище не може бути пустим"));
		echo json_encode($response);
		exit();
	}
	else {
		if (empty($user_id)) {
			$sql_create = "INSERT INTO `users_on_site` (`id`, `First_Name`, `Last_Name`, `Role`, `Togge`) VALUES (NULL, '$first_name', '$Last_Name', '$Role', '$toggle')";
			$result = mysqli_query($connect, $sql_create);

			$new_id_user = mysqli_insert_id($connect);
			$response = array('status' => true, 'error' => null, 'user' => array('id' => $new_id_user, 'name_first' => $first_name, 'name_last' => $Last_Name, 'status' => $toggle, 'role' => $Role));
			echo json_encode($response);
		}
		else {

			$sql_select = "SELECT * FROM `users_on_site` WHERE `id` = '$user_id'";
        	$result = mysqli_query($connect, $sql_select);

			if (mysqli_num_rows($result) > 0) {
				$sql_update = "UPDATE `users_on_site` SET `First_Name` = '$first_name', `Last_Name` = '$Last_Name', `Role` = '$Role', `Togge` = '$toggle'  WHERE `users_on_site`.`id` = '$user_id'";
				mysqli_query($connect, $sql_update);
				
				$response = array('status' => true, 'error' => null, 'user' => array('id' => $user_id, 'name_first' => $first_name, 'name_last' => $Last_Name, 'status' => $toggle, 'role' => $Role));
				echo json_encode($response);
			}
			else {
				$response = array('status' => false, 'error' => array('code' => 101, 'message' => "User with ID $user_id not found"));
            	echo json_encode($response);
			}
			
		}
	}

}