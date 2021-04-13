<?php
$my_sql = new mysqli('localhost','root','','movie');
if($my_sql->connect_error){
    echo 'connection error';
}
$name = $_GET['name'];
$email = $_GET['email'];
$password = $_GET['pass'];
$isRegester = $_GET['isregester'];
if($isRegester=='1'){
    $sql = "INSERT INTO Account (_name,_email,_password)VALUES ('".$name."', '".$email."', '".$password."')";
    $reslut = $my_sql->query($sql);
    if(!$reslut){
        echo'can not insert';
    }
    else{
        echo ' secsuly';
    }
}else if($isRegester=='0'){
    $sql = "SELECT Count(*) 'N' FROM Account where _email = '".$email."'";
    $reslut = $my_sql->query($sql);
    $list = array();
   if($reslut->num_rows>0){
       $i=0;
       while($row= $reslut->fetch_assoc()){
        $list[$i]=(array("number"=>$row['N']));
        $i++;
       }
   }else{
    echo'none';
}
$data= json_encode($list);
echo $data;
$my_sql->close();
}else if($isRegester=='2'){
    $return = array();
    $sql = "SELECT * FROM Account where _email = '".$email."'";
    $reslut = $my_sql->query($sql);
    $list = array();
   if($reslut->num_rows>0){
       $i=0;
       while($row= $reslut->fetch_assoc()){
        if($row['_password']==$password&&$row['_email']==$email){
            $return =(array('id'=>$row['id'],'name'=>$row['_name'],'email'=>$row['_email'],'password'=>$row['_password']));

        }
    }
   }else{
    echo'none';
}
$data= json_encode($return);
echo  $data;
$my_sql->close();
}

?>
