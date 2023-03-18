<?php 

require_once('./DB.php');

$user_id = mysqli_real_escape_string($connect, $_POST['id']);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql_delete = "DELETE FROM `users_on_site` WHERE `id` = '$user_id'";
    mysqli_query($connect, $sql_delete);

    if(mysqli_affected_rows($connect) > 0) {
        $response = array('status' => true, 'error' => null, 'id' => $user_id);
        echo json_encode($response);
    } else {
        $response = array('status' => false, 'error' => array('code' => 100, 'message' => "User with ID $user_id not found"));
        echo json_encode($response);
    }
}