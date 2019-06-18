$(function () {
    //根据后台数据渲染ui，生成li
    //生成li
    function init(data) {
        data.forEach((value, i) => {
            // console.log(value.id);
            // console.log(value.id);

            let temp = ` <li class="item" data-guid = "${value.id}">
    <div class="goods-content">
        <div class="goods-pic">
            <a href="javascript:;" class="details-tit" id ="${value.id}">
                <img src="${value.src}" alt="">
            </a>
        </div>
        <div class="goods-info">
            <p class="price">
                <span id="price">¥${value.price}</span>
                <i>限时折扣</i>
            </p>
            <p class="name">
             
                    <span id="name">${value.name}</span>

             
                <i>${value.des}</i>
            </p>
            <div class="record">
                <strong class="make"><a href="">${value.make}</a>笔成交</strong>
                <strong class="comment"><a href="">${value.comment} </a>条评论</strong>
            </div>
            <p class="shop">
                <span> <a href="">${value.shop}</a></span>
            </p>
            <p class="icons">
                <i>${value.icons}</i>
            </p>
            <div class="operate">
                <div class="collect">
                    <a href=""><i></i>收藏</a>
                </div>
                <div class="addcart">
                    <a href="javascript:;"><i></i>加入购物车</a>
                </div>
            </div>
        </div>
    </div>
</li>`;
            list.append(temp);
        });
    }
    let list = $("#list-show");
    var getData = [];

    $.getJSON("http://127.0.0.1/yg/src/listdata.php",
        function (data) {
            init(data);
            getData = data;
            //   console.log(getData);
        });
    // 价格排序，从高到低
    $(".price-sort").click(function () {
        // list.html(" ");
        list.empty(); //删除被选元素的所有子元素
        $(this).css({
            "background": "#f30213",
            "color": "#fff"
        }).siblings().css({
            "background": "#f2f2f2",
            "border-color": "#ccc",
            "color": "#444"
        });
        getData.sort(function (val1, val2) {
            return val2.price - val1.price
        });
        console.log(getData);

        init(getData);
    });
    //默认排序
    $(".default").click(function () {
        list.empty();
        $(this).css({
            "background": "#f30213",
            "color": "#fff"
        }).siblings().css({
            "background": "#f2f2f2",
            "border-color": "#ccc",
            "color": "#444"
        });
        //sort 根据结果大于0、小于0、等于零做判断
        getData.sort(function (val1, val2) {
            return val1.id - val2.id
        });
        init(getData);
    });

    //把要跳转详情的商品的id值发过去给详情
    list.on("click", ".details-tit", function () {
        var mark = $(this).attr("id");
        //  console.log(mark);
        window.location.href = `http://127.0.0.1/yg/details.html?id=${mark}`;
    });


    //添加到购物车
    var goods = document.querySelector("#list-show");
    var goodslist = COOKIE.getItem('goodslist');
    if (goodslist === '') {
        goodslist = []
    } else {
        goodslist = JSON.parse(goodslist); //goodslist必须为json字符串
        // console.log(goodslist);
    }
    goods.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.parentNode.className === 'addcart') {
            // 获取当前li
            var currentLi = target.parentNode.parentNode.parentNode.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid');

            //筛选要要加入购物车的商品是否重样   数组去重方法  arr.filter()
            var currentGoods = goodslist.filter(function (value) {
                //  console.log(value);
                return value.guid === guid;
            });

            if (currentGoods.length > 0) {
                currentGoods[0].qty++;
            } else {
                var goods = {
                    guid: guid,
                    imgurl: currentLi.children[0].children[0].children[0].children[0].src,
                    name: currentLi.children[0].children[1].children[1].children[0].innerText,
                    price: currentLi.children[0].children[1].children[0].children[0].innerText,
                    qty: 1
                }

                goodslist.push(goods);
            }
            COOKIE.setItem('goodslist', JSON.stringify(goodslist), 3);
            // console.log(goodslist);

        }
    }






})