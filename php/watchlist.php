<?php
$my_sqli = new mysqli('localhost', 'root', '', 'movie');
if ($my_sqli->connect_error) {
    echo 'Connect Eroor';
}
$AccountID = $_GET['id'];
$MovieID = $_GET['movie'];
$setStatue = $_GET['setStatue'];
if ($setStatue == 'write') {
    ///read data and determen if this movies does exists 
    // will be deleted if already exists
    $sql = "SELECT * from whatchlist WHERE account_id= '" . $AccountID . "'and movie_id ='" . $MovieID . "'";
    $result = $my_sqli->query($sql);
    $list = array();
    $i = 0;
    if ($result->num_rows > 0) {
        ///
       
    } else {
        ////////
        $sql = "INSERT INTO whatchlist(movie_id,account_id)Values('" . $MovieID . "','" . $AccountID . "')";
        $result = $my_sqli->query($sql);
        if (!$result) {
            echo 'can not insert';
        } else {
            echo ' secsuly';
        }
    }
} else if ($setStatue == 'read') {
    $sql = "SELECT * from whatchlist WHERE account_id= '" . $AccountID . "'";
    $result = $my_sqli->query($sql);
    $list = array();
    $i = 0;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $list[$i] = $row;
            $i++;
        }
    }
    $data = json_encode($list);
    echo $data;
}
$my_sqli->close();

// }else{
// //table doesnot exist
// echo'table does not exists';
// $create = "CREATE TABLE whatchlist(id int primary key AUTO_INCREMENT,movie_id int,account_id int,FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID),FOREIGN KEY (account_id) REFERENCES account(id))";
// if($my_sqli->query($create)==TRUE){
//  echo'created';   
// }else{
//     echo'failed to create';
// }
// }
