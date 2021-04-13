<?php 
$mysql = new mysqli('localhost','root','','movie');
if($mysql->connect_error){
    echo'error';
}
$input = $_GET['q']."%";
$sql ="SELECT * FROM `movie` WHERE `COL 1`Like'".$input."'";
 $result = $mysql->query($sql);
 $list = array();
   if($result->num_rows>0){
       $i=0;
       while($row= $result->fetch_assoc()){
        $list[$i]=(array("movie_ID"=>$row['movie_ID'],"name"=>$row['COL 1'],'category'=>$row['COL 2'],"Rate"=>$row['COL 3'],'Poster'=>$row['COL 4'],"background"=>$row['COL 5'],'trailer'=>$row['COL 6'],"Movie"=>$row['COL 7'],'TvShow'=>$row['COL 8']));
        $i++;
       }
   }else{
    echo'none';
}
$data= json_encode($list);
echo $data;
$mysql->close();



?>