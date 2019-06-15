<?php
  header("Content-Type:text/html;charset=UTF-8");
  $phone=$_REQUEST["dataAll"]["phone"];
  $password=$_REQUEST["dataAll"]["password"];
// $phone=$_COOKIE["username"]
//  $password=$_COOKIE["password"]
var_dump($phone);
$res=true;
echo $phone;
$filePath = "http://127.0.0.1/yg/src/userdata.json";

$content=fread(fopen($filePath,"r"),filesize($filePath));

     $data=json_decode($content,true);

     for($n=0;$n<count($data);$n++){     
                       
        if( $data[$n]["phone"]==$phone){
                echo "204";
                $res=false;
 
        };
        if($res=="true"){
            array_push($data,$_REQUEST["dataAll"]);
        };
    };
        fwrite(fopen($filePath,"w"),json_encode($data,true));
?>