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
    return this.encodeData(data, {
      strfn: (v) => v.trim()
    });
  }

  /**
   * 删除空字符串 null []
   * @param {*} data 
   */
  delNull(data) {
    return this.encodeData(data, null, true);
  }

  /**
   * 删除空属性并且去空格
   * @param {*} data 
   */
  delNullAndTrim(data) {
    return this.encodeData(data, {
      strfn: (v) => v.trim()
    }, true)
  }

  /**
   * 深度克隆
   * @param {*} data 
   */
  clone(data) {
    return this.encodeData(data);
  }

  /**
   * 
   * @param {any} data 
   * @param {datefn: '',strfn: '',numfn: ''} callbackobj
   * @param {boolean} isDelEmptyValue 
   */
  encodeData(data, callbackobj = {}, isDelEmptyValue = false) {
    if(callbackobj == null) callbackobj={}

    if ($$.objectUtil.isDate(data)) {
      if ($$.objectUtil.isFunction(callbackobj.datefn)) {
        return callbackobj.datefn(new Date().setTime(data.getTime()));
      } else {
        return new Date().setTime(data.getTime());
      }

    } else if ($$.objectUtil.isObject(data)) {
      let newdata = {};
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        let tem = this.encodeData(data[keys[i]], callbackobj, isDelEmptyValue);
        if (!isDelEmptyValue || !$$.objectUtil.isEmptyValue(tem)) {
          newdata[keys[i]] = tem;
        }
        tem = null;
      }
      keys = null;
      return newdata;
    } else if ($$.objectUtil.isArray(data)) {
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        let tem = this.encodeData(data[i], callbackobj, isDelEmptyValue)
        if (!isDelEmptyValue || !$$.objectUtil.isEmptyValue(tem)) {
          newdata.push(tem);
        }
        tem = null

      }
      return newdata
    } else if (typeof data == 'string') {
      if ($$.objectUtil.isFunction(callbackobj.strfn)) {
        return callbackobj.strfn(data);
      } else {
        return data;
      }

    } else if (typeof data == 'number') {
      if ($$.objectUtil.isFunction(callbackobj.numfn)) {
        return callbackobj.numfn(data);
      } else {
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
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

}