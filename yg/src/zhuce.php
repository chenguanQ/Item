<?php

// header("Content-Type:text/html;charset=UTF-8");
// $name=$_REQUEST["name"];
// $id=$_REQUEST["ID"];
// $lastname=$_REQUEST["lastname"];
// $filePath="../json/sanxingjson.json";
// // 
// $content = fread(fopen($filePath,"r"),filesize($filePath));

// $data = json_decode($content,true);

// for($i=0;$i<count($data);$i++){
//     if($data[$i]["id"]!=$id){
//     echo "未注册";
//     $res=array("name"=>$name,"id"=>$id,"lastname"=>$lastname);
//     // break;
//     }else{
//     echo "此身份证已存在注册";
//     break;

//     };
// };
// array_push($data , $res);

// // 
// $handle=fopen($filePath,"w");
// fwrite($handle,json_encode($data,true));
// fclose($handle);


echo "+++";
$phone=$_REQUEST["dataAll"]["phone"];
$password=$_REQUEST["dataAll"]["password"];
$res=true;
echo $password;
$filePath = "userdata.json";

$content=fread(fopen($filePath,"r"),filesize($filePath));
     $data=json_decode($content,true);
echo  $data;
     for($n=0;$n<count($data);$n++){     
                       
        if( $data[$n]["phone"]==$phone){
                echo "204";
                $res=false;
 
        };
        if($res=="true"){
            array_push($data,$_REQUEST["dataAll"]);
        };
    };
?>