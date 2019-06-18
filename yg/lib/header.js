$(function () {
    let cat = $("#cat-list");
    let cateDetail = $("#cate-detail");
    let allCategory = $("#all-category");
    let oli = $("#cat-list >li");
    let cartPart = $(".cart-part");
    // 如果cookie获取到用户的资料 ，渲染ui为登陆状态
    let username = COOKIE.getItem("username");
    let password = COOKIE.getItem("password");
    if (username && password) {
        let o = {
            username,
            password
        };
        $(".login-link").html(`你好,${o.username}用户 `);
        $("#exit").css("display", "inline-block");
    }
    //点击退出按钮，清空cookie，并刷新主页
    $("#exit").click(function (e) {
        e.preventDefault();
        COOKIE.removeItem("username");
        COOKIE.removeItem("password");
        window.location.href = "http://127.0.0.1/yg"
    });
    // -----------------------------------
    //头部导航 下拉特效
    function topbar(index, name) {
        $(`.nav > li:eq(${index})`).hover(function () {
            $(this).children(`${name}`).stop(true, true).slideDown(150);
            $(this).css("border", "1px solid #ccc");
            $(this).css("border-bottom-color", "#fff");
        }, function () {
            $(this).children(`${name}`).stop(true, true).slideUp(150);
            $(this).css("border", "1px solid transparent");
        })
    }
    topbar(1, ".top-menu-title");
    topbar(2, ".user-centent-menu");
    topbar(3, ".top-menu-tit");
    topbar(4, ".top-menu-con");

    //请求数据，渲染侧边一级导航ui
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/yg/src/category.json",
        // async: false,
        success(data) {
            data.forEach((value, index) => {

                // console.log("ajax==end");
                let c = value.content;
                let res = "";
                for (var i = 0; i < c.length; i++) {
                    res += `
                  <a href="http://127.0.0.1/yg/list.html">${c[i]}</a>
                  <span>/</span>`
                }
                $("<li class ='d'></li>").html(`${res}`).appendTo(cat);


                $("#cat-list >li>span:last").remove();
            })
        }
    })

    //渲染侧边二级导航
    cat.on("mouseenter", "li", function () {
        var index = $(this).index();
        var showCart = $(this).parent().parent().parent().children(".cart-part");
        showCart.eq(index).css("display", "block");
    })
    cat.on("mouseleave", "li", function () {
        var index = $(this).index();
        var showCart = $(this).parent().parent().parent().children(".cart-part");
        showCart.eq(index).css("display", "none");
    })

    $.getJSON("http://127.0.0.1/yg/src/data.php",
        function (data) {
            data.forEach((value, i) => {
                $(".cate-detail-tit").eq(i).append(`<a href="">${value.kind}</a>`);

                var c = value.classify;
                for (var n = 0; n < c.length; n++) {
                    $(".cate-detail-con").eq(i).append(`<a href="">${c[n]}</a>`);

                }
            });
        }
    );
    cartPart.hover(function () {
        $(this).css("display", "block")

    }, function () {
        $(this).css("display", "none")
    });




})