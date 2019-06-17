$(function () {
    //获取是否登录了
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
    $("#exit").click(function (e) {
        e.preventDefault();
        COOKIE.clear();
        window.location.href = "http://127.0.0.1/yg"
    });
    // ----------------------------
    var id = decodeURI(location.search).slice(4);
    var goodsName = $(".goods-name >h1");
    var goodsPrice = $(".goods-price >span>em");
    var goodsPic = $(".first-img >img");




    //根据列表页传过来的ID取出对应的数据渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/yg/src/listdata.php",
        success: function (txt) {
            var data = JSON.parse(txt);
            // console.log(data);
            data.forEach(value => {
                if (value.id == id) {
                    goodsName.text(value.name);
                    goodsPic.attr("src", value.src);
                    goodsPrice.text(value.price);

                    //放大镜插件调用  因为ajax是异步完成的，所以在外部调用插件的话，第一张图片生成有延时
                    var magnifierConfig = {
                        magnifier: "#magnifier1", //最外层的大容器
                        width: 360, //承载容器宽
                        height: 360, //承载容器高
                        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom: 2 //缩放比例
                    };
                    var _magnifier = magnifier(magnifierConfig);
                }
            });
        }
    });

    //加入购物车
    var goodslist = Cookie.get('goodslist');
    if (goodslist === '') {
        goodslist = []
    } else {
        goodslist = JSON.parse(goodslist); //goodslist必须为json字符串
    }
    $(".addcart").click(function () {
        //  console.log($(this));
        var currentGoods = goodslist.filter(function (g) {
            return g.guid === id;
        });

        var name = $(this).parent().parent().siblings(".goods-name").children("h1").html();
        var pic = $(this).parent().parent().siblings(".goods-price").children("span").children("em").html().slice(1);
        var imgs = $(this).parent().parent().parent().siblings(".goods-zoom").children().children(".magnifier-assembly").children().children().children(".active").children().children().attr("src");
        console.log(imgs);

        // console.log(currentGoods);
        if (currentGoods.length > 0) {
            currentGoods[0].qty++;
        } else {
            var goods = {
                guid: id,
                imgurl: imgs,
                name: name,
                price: pic,
                qty: 1
            }

            goodslist.push(goods);
        }
        Cookie.set('goodslist', JSON.stringify(goodslist));
    })


})