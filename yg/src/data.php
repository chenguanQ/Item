<?php
header("Content-Type:text/html;charset=UTF-8");

 $arr1 = array("kind" =>"休闲小吃 >",
 "classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr2 = array("kind" =>"水果 >",
"classify" =>array("国产水果","进口水果","其他水果")
);
$arr3 = array("kind" =>"中外名酒 >",
"classify" =>array("红酒","白酒","洋酒","啤酒","保健酒","其他酒")
);
$arr4 = array("kind" =>"传统滋补 >",
"classify" =>array("海参","燕窝","鹿茸","藏红花","其他传统滋补")
);
$arr5 = array("kind" =>"跨境食品 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr6 = array("kind" =>"厨房用品 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr7 = array("kind" =>"布艺家纺 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr8 = array("kind" =>"大家电 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr9 = array("kind" =>"珠宝饰品 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr10 = array("kind" =>"服装鞋鞋 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr11 = array("kind" =>"面部护理 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr12 = array("kind" =>"保健器材 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
$arr13 = array("kind" =>"金质饰品 >",
"classify" =>array("膨化糕饼","坚果炒货","蜜饯糖果","素食肉干","其他休闲食品")
);
 $list = array($arr1,$arr2,$arr3,$arr4,$arr5,$arr6,$arr7,$arr8,$arr9,$arr10,$arr11,$arr12,$arr13);
 
print_r (json_encode ($list));
?>