<?php
    header("Content-Type:text/json;charset=utf-8");

    $password = $_REQUEST["password"];
    $username = $_REQUEST["username"];


    $usernames = array("13229558539","13229558566","13229558779");
    if(in_array($username,$usernames))
    {
        if($password == "12345")
        {
            echo '{"code":"100","msg":"登录成功","status":"success"}';
        }else
        {
            echo '{"code":"101","msg":"密码不正确！","status":"error"}';
        }
    }else
    {
        echo '{"code":"102","msg":"用户名不存在！","status":"error"}';
    }

?>