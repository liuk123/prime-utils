


export class NumberUtil {
  constructor() {

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

}