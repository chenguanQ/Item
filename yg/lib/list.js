$(function () {
    let list = $("#list-show");
    $.getJSON("http://127.0.0.1/yg/src/listdata.php",
        function (data) {
            data.forEach((value, i) => {
                let temp = ` <li class="item" data-guid = "${i}">
            <div class="goods-content">
                <div class="goods-pic">
                    <a href="javascript:;" class="details-tit" id =${i}>
                        <img src="${value.src}" alt="">
                    </a>
                </div>
                <div class="goods-info">
                    <p class="price">
                        <span id="price">${value.price}</span>
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
    );
    // ---------------------------------------
    //http://127.0.0.1/yg/details.html
    list.on("click", ".details-tit", function () {
        var mark = $(this).attr("id");
        //  console.log(mark);


        window.location.href = `http://127.0.0.1/yg/details.html?id=${mark}`;

    });



    // ----------------------------
    var goods = document.querySelector("#list-show");
    var goodslist = Cookie.get('goodslist');
    if (goodslist === '') {
        goodslist = []
    } else {
        goodslist = JSON.parse(goodslist); //goodslist必须为json字符串
    }
    goods.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.parentNode.className === 'addcart') {
            // 获取当前li
            var currentLi = target.parentNode.parentNode.parentNode.parentNode.parentNode;

            var guid = currentLi.getAttribute('data-guid');
          //  console.log(guid);


            console.log(guid);
            var currentGoods = goodslist.filter(function (g) {
                return g.guid === guid;
            });
            console.log(currentGoods);
            
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
            Cookie.set('goodslist', JSON.stringify(goodslist));
           // console.log(goodslist);

        }
    }






})