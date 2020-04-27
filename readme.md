
# prime-jsutils

## 介绍

 简洁而常用的原生js库

## 安装

```
npm install prime-jsutils
```

## 目录

1. [数据        ObjectUtil](#数据处理)
2. [数字与金额    numberUtil](#数字与金额)
3. [时间        timeUtil](#时间处理)
4. [功能函数    functionUtil](#功能函数)
5. [校验        regExpUtil](#校验)
<!-- 6. [浏览器      exploreUtil](#数据处理) -->
<!-- 7. [dom         domUtil](#数据处理) -->
<!-- 8. [cookie      cookieUtil](#数据处理) -->

## 使用

### 数据处理

1. 深度克隆的操作

```
//深度克隆 对象数组等数据
let newobj = $$.objectUtil.clone(value);

//去空格 对象数组中的字符串去空格
//value的类型包括：object,array,string,number等等
let newobj = $$.objectUtil.trim(value);

//删除空属性 '',[],{},null,undefined，NaN
let newobj = $$.objectUtil.delNull(value);

//删除空属性，又去空格
let newobj = $$.objectUtil.delNullAndTrim(value)


//--数组的操作（返回深度克隆后的数据）

//数组中删除a=1且pid=2的对象 obj={a:1,pid:2}
$$.objectUtil.rmOneObj(arr1,obj)

//数组删除多个对象 arr=[{id:1},{id:3},{id:5,pid:6}]
$$.objectUtil.rmSomeObj(arr1,arr)
```


2. 数组的操作
```
```

3. 对象序列化与反序列化

```
let str = $$.objectUtil.stringfyQueryString(obj);

let obj = $$.objectUtil.parseQueryString(url);
```

### 数字与金额

```
//金额每三位添加,号。 value: number,string
let str = $$.numberUtil.moneyDelimiter(value);

//数字小写转大写
let str = $$.numberUtil.digitUppercase(number);

//生成指定范围的数字
let number = $$.numberUtil.randomNum(min, max);
```

### 时间处理

- 日期处理

```
//距离现在过去多少时间 
//eg：刚刚、分钟前、小时前、天前、个月前、年前、
let date = $$.timeUtil.formatPassTime(startTime);

//距离结束的时间 eg：1天2小时30分钟30秒 或1d2h30m30s(为了方便大家截取)
let str = $$.timeUtil.formatRemainTime(endTime,isEn);

//某月共有多少天
//某月最后一天是几号
let date = $$.timeUtil.getEndDate(month,year);
```

### 功能函数

```
/**
     * 函数节流。
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                      false: 在delay时间内连续触发，最后一次触发后delay时间后执行
     *                                      true:  在delay时间内连续触发，先执行后延续delay秒
     *                                      
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *                                      true: 先执行一次，最后触发delay秒内不执行，
     *                                      false: delay秒之后执行一次
     *
     * @return {Function}  新的节流函数
     */
$$.functionUtil.throttle(delay, noTrailing, callback, debounceMode)

eg:
window.addEventListener('click',$$.functionUtil.throttle(2000,false,function(){
    console.log(1);
},false))
```

### 校验

```
//特殊字符
isSpecialChar(v)

//数字字母下划线
isNormalChar(v)

//整数
isInteger(v)

//n位小数的数字
isDecimals(v, n)

//m位整数n位小数的数字
isDecimalsNotZero(v, m, n)

//邮箱
isEmail(v)

//身份证
isIdcard(v)

//手机号
isPhone(v)

//手机号或固话
isPhoneAndTel(v)

//url
isUrl(v)

//ip地址
isIpv4(v)

//ipv6地址
isIpv6(v)

//端口号
isPort(v)

//mac地址
isMac()

//字符长度
bytelength(v, min, max)
```

