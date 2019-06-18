$(function () {
    let phone = $("#phone-num")
    let btn = $("#regist-slide");
    let phoneReg = /^1[3-9]\d{9}$/;
    let passwordReg = /^[a-zA-Z0-9_]+$/;
    let verifyCode = new GVerify("v_container");
    let in_btn = $("#regist-out");
    let register = {};
    let num = "";
    // console.log(file);
    let res = false;
    //判断手机框的值是否符合  正则
    phone.blur(function (e) {
        e.preventDefault();
        num = $(this).val().trim();
        if (!phoneReg.test(num)) {
            //  console.log("错误");
            $(".error-A").css("display", "block");
        } else {
            $(".error-A").css("display", "none");
            res = true;
        }
    });
    //输入错误的提示
    btn.click(function () {
        let file = $("#clause").prop("checked");
        if (!file) {
            $(".error-B").css("display", "block");
        } else if (res == true && file) {
            $(".error-B").css("display", "none");
            $(".tabs-1").css("display", "none");
            $(".tabs-2").css("display", "block");
            register.user = num;
        }

    });
    // -------------------------------------------
    let auth = false;
    let paw = false;
    $("#code").change(function (e) {
        e.preventDefault();
        var str = $(this).val().trim();
        if (!verifyCode.validate(str)) {
            $(".error-C").css("display", "block");
        } else {
            auth = true;
            $(".error-C").css("display", "none");
        }
    });
    // 验证两次密码是否一样
    $("#pawB").change(function (e) {
        e.preventDefault();
        var p = $("#pawA").val().trim();
        var p1 = $(this).val().trim();


        if (p1 !== p) {
            $(".error-D").css("display", "block");
        } else {
            paw = true;
            register.paw = p1;
            $(".error-D").css("display", "none");
            // console.log(register);
        }
    });
    //点击提交后，生成user资料的cookie ，并跳转到index页
    in_btn.click(function (e) {
        e.preventDefault();
        // var ph = $("#phone-num").val().trim();
        // var pa = $("#pawB").val().trim();
        if (auth && paw) {

            // console.log(register.user);
            // console.log(register.paw);
            COOKIE.setItem("username", register.user);
            COOKIE.setItem("password", register.paw);
            // console.log(register.user, register.paw);

            // console.log(1);

            // console.log(phone);

            //console.log(phone, password);
            
            //发送请求，把user资料传给后台保存起来
            $.ajax({
                url: "http://127.0.0.1/yg/src/login.php",
                dataAll: {
                    // phone: phone,
                    // password: password
                },
                success: function (data) {
                    console.log(data);

                    //  console.log(data);

                }
               
            });
            window.location.href = "http://127.0.0.1/yg";
        }
    });



})