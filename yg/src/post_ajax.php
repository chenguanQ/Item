
<?php
    header('content-type:text/html;charset=utf-8');
    $name=$_POST['Name'];
    //对比是数据可以通过数据库获取，并验证
    $nameArray = array('熊大',"熊二",'张三','李四','王五');
    $result=in_array($name, $nameArray);
    // 返回判定值给调用者
    if($result){
        echo "OK";
    } else{
        echo "not OK";
    }
?>