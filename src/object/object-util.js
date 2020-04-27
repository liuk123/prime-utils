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
    return this.encodeData(data, null, (v) => this.isEmptyValue(v));
  }

  /**
   * 删除空属性并且去空格
   * @param {*} data 
   */
  delNullAndTrim(data) {
    return this.encodeData(data, {
      strfn: (v) => v.trim()
    }, (v) => this.isEmptyValue(v))
  }

  /**
   * 深度克隆
   * @param {*} data 
   */
  clone(data) {
    return this.encodeData(data);
  }

  /**
   * 克隆object 继承原来的原型链
   * @param {*} data 
   */
  cloneObj(data) {
    let originProto = Object.getPrototypeOf(data);
    return Object.assign(Object.create(originProto), data);
  }

  /**
   * 删除id=1且pid=2的对象
   * @param {arr} data
   * @param {id:1,pid:2} obj
   */
  rmOneObj(data, obj) {
    let attr = Object.keys(obj)
    return this.encodeData(data, null, (v) => {
      if (this.isObject(v) &&
        attr.every(val => v[val] == obj[val]
        )) {
        return true
      } else {
        return false
      }
    });
  }
  /**
   * 删除多条
   * @param {arr} data 
   * @param {*} arr [{id:1},{id:3},{id:5,pid:6}]
   */
  rmSomeObj(data, arr) {
    let attr = arr.map(v => Object.keys(v))
    return this.encodeData(data, null, (v) => {
      if (this.isObject(v) &&
        attr.some((val, i) => val.every(subval => v[subval] == arr[i][subval]))
      ) {
        return true
      } else {
        return false
      }
    });
  }

  /**
   * 
   * @param {any} data 
   * @param {datefn: '',strfn: '',numfn: ''} callbackobj
   * @param {callback} del  return true =>删除 return false=>不删除
   */
  encodeData(data, callbackobj = {}, del) {
    if (callbackobj == null) callbackobj = {}

    if (this.isDate(data)) {
      if (this.isFunction(callbackobj.datefn)) {
        return callbackobj.datefn(new Date().setTime(data.getTime()));
      } else {
        return new Date().setTime(data.getTime());
      }

    } else if (this.isObject(data)) {
      let newdata = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          let tem = this.encodeData(data[key], callbackobj, del);
          if (this.isFunction(del) && !del(tem) || !this.isFunction(del)) {
            newdata[key] = tem;
          }
          tem = null;
        }
      }
      return newdata;
    } else if (this.isArray(data)) {
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        let tem = this.encodeData(data[i], callbackobj, del)
        if (this.isFunction(del) && !del(tem) || !this.isFunction(del)) {
          newdata.push(tem);
        }
        tem = null

      }
      return newdata
    } else if (typeof data == 'string') {
      if (this.isFunction(callbackobj.strfn)) {
        return callbackobj.strfn(data);
      } else {
        return data;
      }

    } else if (typeof data == 'number') {
      if (this.isFunction(callbackobj.numfn)) {
        return callbackobj.numfn(data);
      } else {
        return data;
      }
    } else {
      return data;
    }
  }

  /**
   * 
   * @param {*} data 
   * @param {*} callbackobj 
   * @param {*} del 
   */
  encodeLightData(data, callbackobj = {}, del) {
    if (callbackobj == null) callbackobj = {}

    if (this.isDate(data)) {
      if (this.isFunction(callbackobj.datefn)) {
        return callbackobj.datefn(data);
      } else {
        return data;
      }

    } else if (this.isObject(data)) {
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          this.encodeData(data[key], callbackobj, del);
          if (this.isFunction(del) && !del(tem) || !this.isFunction(del)) {
            
          }
          tem = null;
        }
      }
    } else if (this.isArray(data)) {
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        let tem = this.encodeData(data[i], callbackobj, del)
        if (this.isFunction(del) && !del(tem) || !this.isFunction(del)) {
          newdata.push(tem);
        }
        tem = null

      }
      return newdata
    } else if (typeof data == 'string') {
      if (this.isFunction(callbackobj.strfn)) {
        return callbackobj.strfn(data);
      } else {
        return data;
      }

    } else if (typeof data == 'number') {
      if (this.isFunction(callbackobj.numfn)) {
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