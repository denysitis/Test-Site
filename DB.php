<?php 
	$connect = mysqli_connect('localhost', 'u568759074_admin_den', 'bJ2bRa47*J', 'u568759074_denys_dataBase');
    if (mysqli_connect_errno()) {
        echo 'Помилка підключенння ('.mysqli_connect_errno().'): '.mysqli_connect_error();
        exit();
    }
?>