import { Utils } from "../common/utils";

export class RegExpUtil extends Utils {

  constructor() {
    super();

    this.reg={
      //特殊字符
      specialChar: /[\`\~\!\@\#\$\%\^\&\*\(\)\=\+\;\:\'\"\\\|\,<\.\>\/\?\[\]\{\}]/,
      //数字字母下划线
      normalChar: /^[_A-Za-z0-9]+$/,
      //整数
      integer:/^\d+$/,
      //n位小数
      decimals:(n)=> new RegExp(`^\\d+(.\\d{1,${n}})?$`),
      //m位整数n位小数
      decimalsNotZero:(m,n)=> new RegExp(`^[1-9]\\d{0,${m - 1}}(\.\\d{1,${n}})?$|^0\.\\d{0,${n - 1}}[1-9]$`),
      //1-28
      month28:/^(?:[1-9]|(1[0-9])?|2[0-8])$/,
      //汉字
      cn:/[\u4e00-\u9fa5]+/gm,
      //邮箱
      email:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
      //身份证
      idcard:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      //手机
      phone:/^((\+?86)|(\(\+86\)))?1\d{10}$/,
      //手机或座机
      phoneAndTel:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      //url
      url: new RegExp('^(ht|f)tp(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)' + "*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?"),
      //ip地址
      ipv4:/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
      //ipv6
      ipv6: new RegExp('^s*((([0-9A-Fa-f]{1,4}[:-]){7}(([0-9A-Fa-f]{1,4})|[:-]))|(([0-9A-Fa-f]{1,4}[:-]){6}([:-]' +
      '|((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|[01]?d{1,2})){3})|([:-][0-9A-Fa-f]{1,4})))|' +
      '(([0-9A-Fa-f]{1,4}[:-]){5}(([:-]((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|[01]?d{1,2}))' +
      '{3})?)|(([:-][0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}[:-]){4}([:-][0-9A-Fa-f]{1,4}){0,1}(([:-]' +
      '((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|[01]?d{1,2})){3})?)|(([:-][0-9A-Fa-f]{1,4})' +
      '{1,2})))|(([0-9A-Fa-f]{1,4}[:-]){3}([:-][0-9A-Fa-f]{1,4}){0,2}(([:-]((25[0-5]|2[0-4]d|[01]?d{1,2})' +
      '(.(25[0-5]|2[0-4]d|[01]?d{1,2})){3})?)|(([:-][0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}[:-]){2}' +
      '([:-][0-9A-Fa-f]{1,4}){0,3}(([:-]((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|[01]?d{1,2}))' +
      '{3})?)|(([:-][0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}[:-])([:-][0-9A-Fa-f]{1,4}){0,4}(([:-]' +
      '((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|[01]?d{1,2})){3})?)|(([:-][0-9A-Fa-f]{1,4})' +
      '{1,2})))|([:-]([:-][0-9A-Fa-f]{1,4}){0,5}(([:-]((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]|2[0-4]d|' +
      '[01]?d{1,2})){3})?)|(([:-][0-9A-Fa-f]{1,4}){1,2})))|(((25[0-5]|2[0-4]d|[01]?d{1,2})(.(25[0-5]' +
      '|2[0-4]d|[01]?d{1,2})){3})))(%.+)?s*$'),
      //端口号
      port: new RegExp('^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([1-9]' +
      '[0-9]{3})|([1-9][0-9]{2})|([1-9][0-9]{1})|([0-9]))?$'),
      //mac
      mac:/^([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2}$/
    }

    this.msg = {
      required: '必填项',
      specialChar: '不可包含以下字符：` ~ ! @ # $ % ^ & * ( ) = + ; : \' " |, < > . / ? [ ]{ }',
      normalChar: '只可输入字母、数字和下划线',
      
      number: '只可输入数字',
      integer: '只可输入整数',
      month28:'只可输入1-28的数字',
      
      email: '邮箱格式不正确',
      phone: '电话格式不正确',
      idcard:'身份证格式不正确',

      maxValue: (n)=>`请输入不大于${n}的数值`,
      minValue: (n)=>`请输入不小于${n}的数值`,
      valueRange: (min,max)=>`请输入${min}到${max}之间的数值`,
      maxLength: (n)=>`不可超过${n}个字符`,
      minLength: (n)=>`不可少于${n}个字符`,
      lengthRange: (min,max)=>`请输入${min}到${max}个字符`,
      decimals:(n)=>`只可输入最多${n}位小数的正数`,
      decimalsNotZero:(m,n)=>`只可输入最多${m}位整数且最多${n}位小数的正数`,
      
      equalTo: '两次输入密码不一致',
      remote: '数据已存在',
      
      url:'http格式不正确',
      ip: 'IP格式不正确',
      ipPort: '格式不正确',
      port: '端口号为0-65535之间的整数',
      ipv6: 'IPV6格式不正确',
      mac: 'MAC地址不正确',
    };

    this.placeholder = {
      ip: '如:192.168.3.10',
      ipPort: '如:192.168.3.10:8080',
      ipRanges: '如:192.168.3.10-192.168.3.50',
      mac: '如:00-E0-4C-32-56-76',
      port: '0-65535之间的整数',
      maxValue: '输入不大于{0}的数值',
      minValue: '输入不小于{0}的数值',
      valueRange: '输入{0}到{1}之间的数值',
      int: '只可输入整数',
      maxLength: '不可超过{0}个字符',
      minLength: '不可少于{0}个字符',
      lengthRange: '{0}到{1}个字符',
      url: '如:http://www.neiwang.cn'
    };
  }

  isSpecialChar(v) {
    return v.indexOf(this.reg.specialChar)!=-1;
  }
  isNormalChar(v) {
    return this.reg.normalChar.test(v);
  }
  isInteger(v) {
    return this.reg.integer.test(v);
  }
  isDecimals(v,n){
    return new RegExp(this.reg.decimals(n)).test(v);
  }
  isDecimalsNotZero(v,m,n){
    return new RegExp(this.reg.decimalsNotZero(m,n)).test(v);
  }
  isEmail(v) {
    return this.reg.email.test(v);
  }
  isIdcard(v) {
    return this.reg.idcard.test(v);
  }
  isPhone(v) {
    return this.reg.phone.test(v);
  }
  isPhoneAndTel(v){
    return this.reg.phoneAndTel.test(v);
  }
  isUrl(v){
    return new RegExp(this.reg.url).test(v);
  }
  isIpv4(v){
    return this.reg.ipv4.test(v);
  }
  isIpv6(v){
    return new RegExp(this.reg.ipv6).test(v);
  }
  isPort(v){
    return new RegExp(this.reg.port).test(v);
  }
  isMac(){
    return this.reg.mac.test(v);
  }
  //字符长度
  bytelength(v,min,max){
    let cnStrLength = v.match(this.reg.cn).length;
    let length = v.length + cnStrLength;
    return min<=length && length<=max
  }



}

