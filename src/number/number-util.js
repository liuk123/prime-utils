import { Utils } from "../common/utils";



export class NumberUtil extends Utils {
  constructor() {
    super();
  }

  /**
   * 钱每隔三位添加，号
   * @param {number or string} value 
   */
  moneyDelimiter(value) {
    let v = (value || 0).toString();
    if (v.includes('.')) {
      return v.slice(0, v.indexOf('.')).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + v.slice(v.indexOf('.'));
    } else {
      return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
  /**
   * 数字小写转大写
   * @param {number} n 
   */
  digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    const head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  };

  /**
   * 生成指定范围的数字
   * @param {*} min 
   * @param {*} max 
   */
  randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  add(n1,n2,around){
    if(n1 == null || n2 == null){
      throw 'arguments error'
    }
    let strs1 = n1.toString().match(/^-?\d+(.\d+)?/),
    strs2 = n2.toString().match(/^-?\d+(.\d+)?/);
    if(strs1 === null || strs2 === null){
      throw 'arguments error'
    }
    let str1 = strs1[0];
    let str2 = strs2[0];
    let num1 = Number(str1),
    num2 = Number(str2);
    let len1 = str1.indexOf('.')==-1 ? 0 : str1.length-str1.indexOf('.')-1;
    let len2 = str2.indexOf('.')==-1 ? 0 : str2.length-str2.indexOf('.')-1;
    let maxlen = Math.max(len1, len2);
    let result = (num1+num2).toFixed(around || maxlen);
    return result
  }
  sub(n1,n2,around){
    return this.add(n1,-Number(n2),around);
  }
  mul(n1,n2,around){
    if(n1 == null || n2 == null){
      throw 'arguments error'
    }
    let strs1 = n1.toString().match(/^-?\d+(.\d+)?/),
    strs2 = n2.toString().match(/^-?\d+(.\d+)?/);
    if(strs1 === null || strs2 === null){
      throw 'arguments error'
    }
    let str1 = strs1[0];
    let str2 = strs2[0];
    let num1 = Number(str1),
    num2 = Number(str2);
    let len1 = str1.indexOf('.')==-1 ? 0 : str1.length-str1.indexOf('.')-1;
    let len2 = str2.indexOf('.')==-1 ? 0 : str2.length-str2.indexOf('.')-1;
    let maxlen = len1+len2;
    let result = (num1*num2).toFixed(around || maxlen);
    return result;
  }
  div(n1,n2,around){
    if(n1 == null || n2 == null){
      throw 'arguments error'
    }
    let strs1 = n1.toString().match(/^-?\d+(.\d+)?/),
    strs2 = n2.toString().match(/^-?\d+(.\d+)?/);
    if(strs1 === null || strs2 === null){
      throw 'arguments error'
    }
    let str1 = strs1[0];
    let str2 = strs2[0];
    let num1 = Number(str1),
    num2 = Number(str2);
    let len1 = str1.indexOf('.')==-1 ? 0 : str1.length-str1.indexOf('.')-1;
    let len2 = str2.indexOf('.')==-1 ? 0 : str2.length-str2.indexOf('.')-1;
    let maxlen = Math.max(len1, len2) + 1;
    let result = (num1/num2).toFixed(around || maxlen);
    return result;
  }
}