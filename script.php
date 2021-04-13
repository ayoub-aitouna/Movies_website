<?php
$my_sql = new mysqli("localhost","root","","movie");
// $my_sql = new mysqli("sql11.freemysqlhosting.net","sql11394465","G2d4tMUk9z","sql11394465");
if($my_sql->connect_error){
    echo"Failed:" . $my_sql->connect_error;
    exit();
}
if($_GET['q']!=''||$_GET['q']!=null){
$sql ="SELECT * FROM `movie` WHERE `COL 2`='".$_GET['q']."'";
}
else if($_GET['c']==''||$_GET['c']==null){
  if($_GET['t']!=''||$_GET['t']!=null){
    $sql ="SELECT * FROM `movie` WHERE `COL 10`='".$_GET['t']."'";
  }else{
  $sql ="SELECT * FROM `movie`";

}}else{
  $sql ="SELECT * FROM `movie` WHERE `COL 9`='".$_GET['c']."'";
}
 //"SELECT * FROM mv WHERE `COL 2` =\' ".$_GET['q']."\'";
$result = $my_sql->query($sql);
$re_ = array();
if ($result->num_rows > 0) {
  // output data of each row
  $i=0;
  while($row = $result->fetch_assoc()) {
    //$conv=(array('COL1'=>$row["COL 1"],'COL2'=>$row["COL 2"]));
    $re_[$i]=(array("movie_ID"=>$row['movie_ID'],"name"=>$row['COL 1'],'category'=>$row['COL 2'],"Rate"=>$row['COL 3'],'Poster'=>$row['COL 4'],"background"=>$row['COL 5'],'trailer'=>$row['COL 6'],"Movie"=>$row['COL 7'],'t'=>$row['COL 8'],'coming_soon'=>$row['COL 9'],'trending'=>$row['COL 10'],'Tvshow'=>$row['COL 11']));
    $i++;
  }
} else {
  echo "0 results";
}
$data= json_encode($re_);
echo $data;
$my_sql->close();
?> 
