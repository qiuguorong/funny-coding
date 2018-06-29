## flex布局踩坑集锦
>测试IOS手机: iPhone5c 8.1.2/iPhone5s 8.3/iPhone6 10.1.1
>测试Android手机: Honor Hol-T00 4.2.2/Lenovo S810t 4.3
* 旧版的box item要求属性是块级结构，所以很多inline元素需要设置display：block等才能显示正常
* display：box虽然有box-lines属性，可以配置single/multiple,但是支持旧语法的浏览器都没有实现它
* 旧版的box中，没有对应兼容justify-content: space-around的属性，所以在部分手机上，该行为无法生效
* 