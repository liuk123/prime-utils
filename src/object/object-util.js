import { Utils } from "../common/utils";


export class ObjectUtil extends Utils {
  constructor() {
    super();
  }

  /**
   * 去空格
   * @param {*} data 
   */
  trim(data) {
    return this.encodeStr(data, v => v.trim());
  }

  /**
   * 删除空字符串 null []
   * @param {*} data 
   */
  delNull(data) {
    return this.encodeStr(data, null, true);
  }

  /**
   * 删除空属性并且去空格
   * @param {*} data 
   */
  delNullAndTrim(data) {
    return this.encodeStr(data, v => v.trim(), true)
  }

  /**
   * 深度克隆
   * @param {*} data 
   */
  clone(data) {
    return this.encodeStr(data, null);
  }

  /**
   * 
   * @param {克隆的数据} data 
   * @param {对data中string的操作} fn 
   * @param {是否删除数据中的undefine null '' []} isDelNull 
   */
  encodeStr(data, fn, isDelNull = false) {
    if (this.isDate(data)) {
      return new Date().setTime(data.getTime());
    } else if (this.isObject(data)) {
      let newdata = {};
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        let tem = this.encodeStr(data[keys[i]], fn, isDelNull);
        if (!isDelNull || ((tem != null && tem != ''))) {
          newdata[keys[i]] = tem;
        }
        tem = null;
      }
      keys = null;
      return newdata;
    } else if (this.isArray(data)) {
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        let tem = this.encodeStr(data[i], fn, isDelNull);
        if (!isDelNull || ((tem != null && tem != ''))) {
          newdata.push(this.encodeStr(data[i], fn, isDelNull));
        }
      }
      return newdata
    } else if (typeof data == 'string') {
      if(this.isFunction(fn)){
        return fn(data);
      }else{
        return data;
      }
      
    } else {
      return data;
    }
  }
  
  /**
   * 序列化对象  对象转url参数
   * @param {*} obj 
   */
  stringfyQueryString(obj) {
    if (!obj) return false;
    let pairs = [];
    for (let key in obj) {
      let value = obj[key];
      if (value instanceof Array) {
        for (let i = 0; i < value.length; ++i) {
          pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
        }
        continue;
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return pairs.join('&');
  }

  /**
   * url参数转对象
   * @param {*} url 
   */
  parseQueryString(url) {
    url = url == null ? window.location.href : url
    let search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return{}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}')
  }

}