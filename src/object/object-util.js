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
   * 删除一条
   * @param {arr} data
   * @param {id:1,pid:2} obj
   */
  rmOneObj(data, obj) {
    return this.encodeData(data, null, (v) => {
      if (this.isObject(v) &&
        Object.keys(obj).every(val => v[val] == obj[val])
      ) {
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
    return this.encodeData(data, null, (v) => {
      if (this.isObject(v) &&
        arr.map(v => Object.keys(v)).some((val, i) => val.every(subval => v[subval] == arr[i][subval]))
      ) {
        return true
      } else {
        return false
      }
    });
  }

  /**
   * 删除一条(修改原数组)
   * @param {arr} data
   * @param {id:1,pid:2} obj
   */
  removeOneObj(data, obj) {
    this.lightCloneAndDelFromArr(data, (v) => {
      if (this.isObject(v) &&
        Object.keys(obj).every(val => v[val] == obj[val])
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => v.splice(i, 1));
    return data;
  }

  /**
   * 删除多条 (修改原数组)
   * @param {arr} data 
   * @param {*} arr [{id:1},{id:3},{id:5,pid:6}]
   */
  removeSomeObj(data, arr) {
    this.lightCloneAndDelFromArr(data, (v) => {
      if (this.isObject(v) &&
        arr.filter(v => Object.keys(v)).some((val, i) => val.every(subval => v[subval] == arr[i][subval]))
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => v.splice(i, 1));
    return data;
  }

  /**
   * 添加一条 (平级)
   * @param {*} data 
   * @param {*} obj 
   */
  addOneObj(data, obj, newData) {
    this.lightCloneAndDelFromArr(data, (v) => {
      if (this.isObject(v) &&
        Object.keys(obj).every(val => v[val] == obj[val])
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => v.push(newData));
    return data
  }
  /**
   * 添加多条 (平级)
   * @param {*} data 
   * @param {*} obj 
   */
  addSomeObj(data, obj, newData) {
    this.lightCloneAndDelFromArr(data, (v) => {
      //v,子元素
      if (this.isObject(v) &&
        Object.keys(obj).every(val => v[val] == obj[val])
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => newData.forEach(val => v.push(val)));//v，父元素
    return data;
  }

  /**
   * 对数组的操作 - 增删改查
   * @param {*} data 
   * @param {*} obj 
   * @param {*} fn 
   */
  operatArr(data, obj, fn) {
    this.lightCloneAndDelFromArr(data, (v) => {
      //v,子元素
      if (this.isObject(v) &&
        Object.keys(obj).every(val => v[val] == obj[val])
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => fn(v, i));//v，父元素
    return data;
  }


  /**
   * 数组递归修改
   * @param {*} data 
   * @param {*} callback
   */
  lightCloneAndDelFromArr(data, callback, deal) {
    if (this.isObject(data)) {
      for (let key in data) {
        this.lightCloneAndDelFromArr(data[key], callback, deal);
      }
    } else if (this.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (callback(data[i])) {
          deal(data, i)
          break;
        }
        this.lightCloneAndDelFromArr(data[i], callback, deal)
      }
    }
  }


  /**
   * 
   * @param {any} data 
   * @param {strfn: '',numfn: ''} callbackobj
   * @param {callback} del  return true =>删除 return false=>不删除
   */
  encodeData(data, callbackobj = {}, del) {
    if (callbackobj == null) callbackobj = {}

    if (this.isDate(data)) {
        return new Date().setTime(data.getTime());
    } else if (this.isObject(data)) {
      let newdata = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
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
   * 对象替换key
   * @param {*} data 
   * @param {*} obj 
   */
  replaceObjKey(data, obj) {

    if (this.isObject(data)) {
      let newdata = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (!this.isBlank(obj[key])) {
            newdata[obj[key]] = this.replaceObjKey(data[key], obj);
          } else {
            newdata[key] = this.replaceObjKey(data[key], obj);
          }

        }
      }
      return newdata;
    } else if (this.isArray(data)) {
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        newdata.push(this.replaceObjKey(data[i], obj));
      }
      return newdata;
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

  /**
   * 平铺数组
   * @param {*} arr 
   */
  deepFlatten(arr) {
    return arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
  }

  /**
   * 去掉数组中相同的元素 filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
   * @param {*} arr 
   */
  filterNonUnique(arr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
  }

  /**
   * 打乱数组排序
   * @param {} arr 
   */
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5)
  }

}