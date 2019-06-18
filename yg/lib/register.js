$(function () {
    let btn = $("#slide-btn");
    let phoneReg = /^1[3-9]\d{9}$/;
    let emailReg = /^[\w-+&%]+@[\w-+&%]+\.[a-zA-z]+$/;
    let oCheckBox = $("#autoLogin");
    let res = false;
    let p = false;
    let use = "";
    let paw = "";
    let username = COOKIE.getItem("username");
    let password = COOKIE.getItem("password");

    //判断后台有没有该用户资料
    if (username && password) {
        let o = {
            username,
            password
        };
        netWork($.param(o));


    } else {
            //判断用户名是否正确
        $("#username").blur(function (e) {
            e.preventDefault();
            use = $("#username").val().trim();
            if (!phoneReg.test(use)) {
                // console.log("错误");
                $(".error-A").css("display", "block");
            } else {
                $(".error-A").css("display", "none");
                res = true;
            }
        });
        //判断密码是否正确
        $("#paw-icon").blur(function (e) {
            e.preventDefault();
            paw = $("#paw-icon").val().trim();
            if (paw == "") {
                $(".error-B").css("display", "block");
            } else {
                $(".error-B").css("display", "none");
                p = true;
            }
        });
        //判断用户和密码正确后设置cooki，跳转页面
        btn.click(function (e) {
            e.preventDefault();
            let file = $("#autoLogin").prop("checked");
            console.log(file);
            if (res == true && p == true) {
                COOKIE.setItem("username", use);
                COOKIE.setItem("password", paw);
                netWork(`username=${use}&password=${paw}`);
                //7天免登陆
                if (file == true) {
                    COOKIE.setItem("username", use, 7);
                    COOKIE.setItem("password", paw, 7);

                }

            }
        });
    }

    // ------------------
    function netWork(queryString) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/yg/src/register.php",
            data: queryString,
            success: function (res) {
                if (res.status == "success") {
                    window.location.href = "http://127.0.0.1/yg"
                } else {
                    COOKIE.clear();
                    alert("用户不存在")
                }
            }
        });
    }

})