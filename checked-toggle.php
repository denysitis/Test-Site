<?php

require_once('./DB.php');

$id_array = $_POST['id'];
$value_array = $_POST['value'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримати всі існуючі ідентифікатори з бази даних
    $sql_get_ids = "SELECT id FROM users_on_site";
    $result = mysqli_query($connect, mysqli_real_escape_string($connect, $sql_get_ids));
    $existing_ids = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $existing_ids[] = $row['id'];
        }
    }
    $invalid_ids = array();
    foreach($id_array as $key=>$user_id){
        if(!in_array($user_id, $existing_ids)) {
            // Якщо id не існує, додати його до списку невірних id
            $invalid_ids[] = mysqli_real_escape_string($connect, $user_id);
        }
    }
    if (!empty($invalid_ids)) {
        // Якщо є невірні id, вивести помилку
        $response[] = array('status' => false, 'error' => array('code' => 104, 'message' => 'ID does not exist in database'), 'users' => $invalid_ids);
    } else {

        $id_string = implode(',', $id_array);

        // Оновлення
        $sql_update_toggle = "UPDATE users_on_site SET Togge = CASE ";
        foreach ($id_array as $key => $user_id) {
            $value = $value_array[$key];
            if ($value == '1' || $value == '0') {
                $sql_update_toggle .= "WHEN users_on_site.id = " . mysqli_real_escape_string($connect, $user_id) . " THEN " . mysqli_real_escape_string($connect, $value) . " ";
            }
        }
        $sql_update_toggle .= "END WHERE users_on_site.id IN ($id_string)";

        // Видалення
        $sql_update_toggle_DELETE = "DELETE FROM users_on_site WHERE users_on_site.id IN ($id_string)";
        // Виконання
        if (mysqli_query($connect, $sql_update_toggle) || mysqli_query($connect, $sql_update_toggle_DELETE)) {
            $response = array();
            foreach ($id_array as $key => $user_id) {
                $value = $value_array[$key];
                if ($value == '1') {
                    $response[] = array('status' => true, 'error' => null, 'user' => array('id' => mysqli_real_escape_string($connect, $user_id), 'status' => '1'));
                } elseif ($value == '0') {
                    $response[] = array('status' => true, 'error' => null, 'user' => array('id' => mysqli_real_escape_string($connect, $user_id), 'status' => '0'));
                } elseif ($value == 'DELETE') {
                    $response[] = array('status' => true, 'error' => null, 'id' => mysqli_real_escape_string($connect, $user_id));
                }
            }
        } else {
            $response[] = array('status' => false, 'error' => array('code' => 103, 'message' => mysqli_error($connect)));
        }
    }
echo json_encode($response);
}