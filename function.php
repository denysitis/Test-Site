<?php 

function view_DB($connect) {
	$sql_view = "SELECT * FROM `users_on_site`";
	$result = mysqli_query($connect, $sql_view);

	$back_data_view = mysqli_fetch_all($result, 1);
	return $back_data_view;
}

