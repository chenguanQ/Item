$(function () {
    var oCarList = document.getElementById('carList');
    var btnClear = document.getElementById('mDelSkuBtn');
    var quantityTotal = document.getElementById('quantityTotal');
    var amountTptal = document.getElementsByClassName('amount-total')[0];
    var kinds = document.getElementsByClassName('kinds-total')[0];
    var goodslist = COOKIE.getItem('goodslist');

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
    //获取cookie，更新购物车数据
    if (goodslist) {
        goodslist = JSON.parse(goodslist);
        $(".null-shopping").css("display", "none");
        $(".close-show").css("margin-top", "0");
        render();
    }

    // 清空购物车
    btnClear.onclick = function (e) {
        if (flag) {
            // $(".checkbox").prop("checked", true);
            alert("确定清空？")
            COOKIE.removeItem("goodslist");
            goodslist = [];

            render();

            e.preventDefault();
        }

    }
    // 删除单个
    $("#carList").on("click", ".icon-delete", function () {
        var c = $(this).parent().parent().siblings(".commodity").children().children().prop("checked");
        // console.log(c);
        if (c) {
            var currentLi = this.parentNode.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid');
            console.log(guid);
            alert("确定删除？");
            COOKIE.removeItem(guid);
            for (var i = 0; i < goodslist.length; i++) {
                if (goodslist[i].guid === guid) {
                    goodslist.splice(i, 1);
                    break;
                }
            }
            COOKIE.setItem('goodslist', JSON.stringify(goodslist));
            amountTptal.innerHTML = `<span style="color: red">0</span>`
            render();

        }

    });
    //购物车商品添加
    $("#carList").on("click", ".push", function () {
        var index = this.getAttribute("data-i");
        goodslist[index].qty++;

        COOKIE.setItem('goodslist', JSON.stringify(goodslist));
        amountTptal.innerHTML = `<span style="color: red">0</span>`;
        render();

    });
    //购物车商品删减
    $("#carList").on("click", ".subtract", function () {

        var index = this.getAttribute("data-n");
        // console.log(index);

        if (goodslist[index].qty < 2) {
            goodslist[index].qty == 1;
            return;
        } else {
            goodslist[index].qty--;
        }

        COOKIE.setItem('goodslist', JSON.stringify(goodslist));
        amountTptal.innerHTML = `<span style="color: red">0</span>`;
        render();

    });

    //生成标签
    var allTotal = 0;

    function render() {

        var ul = document.createElement("ul");
        var total = 0;
        // var allTotal = 0;
        allTotal = 0;
        var Olength = goodslist.length;
        var inpValue = 0;


        ul.innerHTML = goodslist.map(function (goods, i) {
            // console.log(goodslist);

            var newPrice = (goods.price).slice(1);
            total = newPrice * goods.qty;
            allTotal = allTotal + total;


            kinds.innerHTML = `<span class="value" id="kindsTotal">${Olength}</span>种`;
            // console.log(inpValue);
            //    var t = document.getElementById('shopping-num');
            //    t.value = inpValue;

            return ` <li data-guid="${goods.guid}" >
            <div class="commodity">
            <span class="checkbox-layout">
                <input type="checkbox" class="checkbox  ggg"  autocomplete="off" id="storeAllCheck_1">
                <label></label>
        </div>
        <div class="goods-img">
            <a href="">
                <img src="${goods.imgurl}" alt="">
            </a>
        </div>

        <div class="goods-main">
            <div class="spu-name">
                <a href="">${goods.name}</a>
            </div>
            <div class="panel-remove">
                <a class="icon-collect" href="javascript:;">
                    <i><img src="./images/shoucang.png" alt=""></i>
                </a>
                <a class="icon-delete" href="javascript:;">
                    <i><img src="./images/del.png" alt=""></i>
                </a>
            </div>
            <ul class="sup-singles">
                <li class="sku-quantity">
                    <a href="javascript:;" class="subtract" data-n ="${i}">
                        <i>－</i>
                    </a>
                    <input type="text" class="input-text" value="${goods.qty}" autocomplete="off" id="shopping-num">
                    <a href="javascript:;" class="push" data-i ="${i}">
                        <i>＋</i>
                    </a>
                </li>
                <li class="unit-pcire">
                    <span>${goods.price}</span>
                </li>
                <li class="total-prices">
                    <span>${total}</span>
                 
                </li>
            </ul>
        </div></li>`


        }).join('\n');
        //  console.log(ul);

        // 把ul写入页面

        oCarList.innerHTML = '';
        oCarList.appendChild(ul);
        // console.log(t.value);


    }


    var flag = false;
    // 全选
    $("#checkedAllBtn, #checkedBtn").click(function () {
        flag = $(this).prop("checked");
        //  console.log(flag);

        if (flag) {
            render();
            $(".checkbox").prop("checked", true);
            amountTptal.innerHTML = `<span style="color: red">${allTotal}</span>`


            //  console.log(1);
        } else {
            $(".checkbox").prop("checked", false);
            //  console.log(2);
            amountTptal.innerHTML = `<span>0</span>`


        }
        //console.log(flag);
        // render();
    });


    // 单选
    var oneFlag = false;

    $("#carList").on("click", ".ggg", function () {
        console.log($(this));

        oneFlag = $(this).prop("checked");
        if (oneFlag) {

            $(this).prop("checked", true);
            var b = ($(this).parent().parent().siblings(".goods-main").children(".sup-singles").children(".total-prices").text() * 1);
            amountTptal.innerHTML = `<span style="color: red">${b}</span>`;
            // render();
            $(this).prop("checked", true);
        } else {
            amountTptal.innerHTML = `<span style="color: red">0</span>`;
        }
    });


})