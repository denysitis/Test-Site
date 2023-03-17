<?php 
	$connect = mysqli_connect('localhost', 'login', 'password', 'name DataBase');
    if (mysqli_connect_errno()) {
        echo 'Помилка підключенння ('.mysqli_connect_errno().'): '.mysqli_connect_error();
        exit();
    }
?>
