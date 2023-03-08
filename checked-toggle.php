<?php

require_once('./DB.php');

$user_id = $_POST['id'];
$value = $_POST['value'];

if ($value == 'ON') {
    $sql_update_toggle_ON = "UPDATE `users_on_site` SET `Togge` = 'ON' WHERE `users_on_site`.`id` = '$user_id'";
    if (mysqli_query($connect, $sql_update_toggle_ON)) {
        $response = array('status' => true, 'error' => null, 'toggle' => 'ON', 'id' => $user_id);
        echo json_encode($response);
    } else {
        $response = array('status' => false, 'error' => array('code' => 103, 'message' => mysqli_error($connect)));
        echo json_encode($response);
    }
} elseif ($value == 'OFF') {
    $sql_update_toggle_OFF = "UPDATE `users_on_site` SET `Togge` = 'OFF' WHERE `users_on_site`.`id` = '$user_id'";
    if (mysqli_query($connect, $sql_update_toggle_OFF)) {
        $response = array('status' => true, 'error' => null, 'toggle' => 'OFF', 'id' => $user_id);
        echo json_encode($response);
    } else {
        $response = array('status' => false, 'error' => array('code' => 103, 'message' => mysqli_error($connect)));
        echo json_encode($response);
    }
} elseif ($value == 'DELETE') {
    $sql_update_toggle_DELETE = "DELETE FROM `users_on_site` WHERE `users_on_site`.`id` = '$user_id'";
    if (mysqli_query($connect, $sql_update_toggle_DELETE)) {
        $response = array('status' => true, 'error' => null, 'id' => $user_id);
        echo json_encode($response);
    } else {
        $response = array('status' => false, 'error' => array('code' => 103, 'message' => mysqli_error($connect)));
        echo json_encode($response);
    }
}
