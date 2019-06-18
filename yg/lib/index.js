$(function () {

    //秒杀功能的倒计时
    var date = new Date(2019, 6, 9, 20, 0);
    var time = 0;
    var h = 0;
    var m = 0;
    var s = 0;

    function timer() {
        var nowDate = new Date;
        time = (date.getTime() - nowDate.getTime()) / 1000;
        h = bl(parseInt(time / 60 / 60) % 24);
        m = bl(parseInt(time / 60) % 60);
        s = bl(parseInt(time) % 60);
        $(".timer").children(".h").html(h);
        $(".timer").children(".m").html(m);
        $(".timer").children(".s").html(s);
        if (time <= 0) {
            clearInterval(timing);
        }
    }
    timer();
    //倒计时补零
    function bl(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    };
    var timing = setInterval(timer, 1000);
    let skUl = $("#sk-ul");
    // -------------------------------------------------
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/yg/src/seckill.json",
        async: false,
        success(data) {

            data.forEach(value => {
                let tempEle = $(`<li class="sk-items">
            <div class="sk-goods">
                <a href="">
                    <img src="${value.src}" alt="" class="sk-img">
                    <p class="sk-name">
                       ${value.name}
                    </p>
                </a>
                <span class="sk-shadow"></span>
                <p class="sk-price">
                    <span class="old">${value.oldPrice}</span>
                    <span class="new">${value.newPrice}</span>
                </p>
            </div>
        </li>`);
                skUl.append(tempEle);
            });
        }
    });
    // ----------------------------------------------
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/yg/src/right-bar.json",
        success(data) {
            data.forEach(element => {
                $(".bar-img").attr("src", `${element.src}`);
                $("#right-max > h3").html(`${element.name}`)
                $("#right-max > p").html(`${element.tit}`)
            });
        }
    });
    // -------------------------------------------
    //秒杀模块的手动轮播图
    skUl.append(skUl.children("li:lt(6)").clone());
    let length = skUl.children("li").length;
    let ylength = skUl.children("li").length - 6;

    let bxWidth = $(".bx-wrapper").width();
    let index = 0;
    $(".next").click(function () {
        index += 6;
        console.log(index);
        if (index >= length - 6) {
            skUl.css("left", "0");
            index = 1;
        }
        skUl.stop(true, true).animate({
            "left": `-${(index) *201}px`
        })
        console.log(index, "--");

    });
    $(".back").click(function () {
        index -= 6;
        if (index < 0) {
            skUl.stop(true, true).animate({
                "left": `-${(length - 6) *201}px`
            })
            index = length - ylength;
        }
        skUl.stop(true, true).animate({
            "left": `-${(index) *201}px`
        })

    })
    // -------------------------------------------------------

    //首页商品列表
    let mainList = $("#main-list");
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/yg/src/commodity.json",
        success(data) {
            // console.log(data);
            data.forEach((value, i) => {
                let item = $(` <div class="item">
            <a href="" class="item-goods">
                <dl>
                    <dt>
                        <img src="${value.src}" alt="">
                    </dt>
                    <dd>
                        <p class=" goods-name">${value.name}</p>
                        <p class="goods-price">${value.price}</p>
                    </dd>
                </dl>
            </a>
        </div>`)
                mainList.append(item)
            });

        }
    });
})