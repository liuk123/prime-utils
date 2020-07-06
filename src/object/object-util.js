import { Utils } from "../common/utils";


export class ObjectUtil extends Utils {
  constructor() {
    super();
  }

  /**
   * 去空格(字符串)
   * @param {*} data 
   */
  trim(data) {
    return this.encodeData(data, {
      strfn: (v) => v.trim()
    });
  }

  /**
   * 删除空属性 '',[],{},null,undefined，NaN
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
   * 删除(符合要求的所有对象)
   * @param {arr} data
   * @param {id:1,pid:2} obj
   */
  // rmOneObj(data, obj) {
  //   let tem = Object.keys(obj);
  //   return this.encodeData(data, null, (v) => {
  //     if (this.isObject(v) && tem.every(val => v[val] == obj[val])
  //     ) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   });
  // }

  /**
   * 删除(符合要求的所有对象)
   * @param {arr} data 
   * @param {*} arr [{id:1},{id:3},{id:5,pid:6}]
   */
  rmSomeObj(data, condition) {
    if(this.isArray(condition)){
      let tem = condition.map(v => Object.keys(v));
      return this.encodeData(data, null, (v) => {
        if (this.isObject(v) &&
        tem.some((val, i) => val.every(subval => v[subval] == condition[i][subval]))
        ) {
          return true
        } else {
          return false
        }
      });
    }else{
      let tem = Object.keys(obj);
      return this.encodeData(data, null, (v) => {
        if (this.isObject(v) && tem.every(val => v[val] == obj[val])
        ) {
          return true
        } else {
          return false
        }
      });
    }
    
  }

  /**
   * 删除一条(修改原数组)
   * @param {arr} data
   * @param {id:1,pid:2} obj/arr
   */
  removeOneObj(data, condition) {
    if(this.isArray(condition)){
      let tem = condition.map(v => Object.keys(v));
      this.delSomeFromArr(data, (datav) => {
        if (this.isObject(datav) &&
          tem.some((val, i) => {
            if(val.every(subval => datav[subval] == condition[i][subval])){
              tem.splice(i,1);
              return true;
            }else{
              return false;
            }
          })
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => v.splice(i, 1));
      return data;
    }else{
      let tem = Object.keys(condition);
      this.delOneFromArr(data, (v) => {
        if (this.isObject(v) &&
          tem.every(val => v[val] == condition[val])
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => v.splice(i, 1));
      return data;
    }
  }

  /**
   * 删除所有 (修改原数组)
   * @param {arr} data 
   * @param {*} arr [{id:1},{id:3},{id:5,pid:6}]
   */
  removeSomeObj(data, condition) {
    if(this.isArray(condition)){
      let tem = condition.map(v => Object.keys(v));
      this.delSomeFromArr(data, (datav) => {
        if (this.isObject(datav) &&
          tem.some((val, i) => {
            if(val.every(subval => datav[subval] == condition[i][subval])){
              return true;
            }else{
              return false;
            }
          })
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => v.splice(i, 1));
      return data;
    }else{
      let tem = Object.keys(condition);
      this.delSomeFromArr(data, (v) => {
        if (this.isObject(v) &&
          tem.every(val => v[val] == condition[val])
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => {
        if(this.isArray(newData)){
          newData.forEach(val => v.push(val))
        }else{
          v.push(newData)
        }
      });
      return data;
    }
    
  }

  /**
   * 添加一条 (平级)
   * @param {*} data 
   * @param {*} obj 
   */
  addOneObj(data, condition, newData) {
      if(this.isArray(condition)){
        let tem = condition.map(v => Object.keys(v));
        this.delSomeFromArr(data, (datav) => {
          if (this.isObject(datav) &&
            tem.some((val, i) => {
              if(val.every(subval => datav[subval] == condition[i][subval])){
                tem.splice(i,1);
                return true;
              }else{
                return false;
              }
            })
          ) {
            return true
          } else {
            return false
          }
        }, (v, i) => {
          if(this.isArray(newData)){
            newData.forEach(val => v.push(val))
          }else{
            v.push(newData)
          }
          
        });
        return data;
    }else{
      let tem = Object.keys(condition);
      this.delOneFromArr(data, (v) => {
        if (this.isObject(v) &&
        tem.every(val => v[val] == condition[val])
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => {
        if(this.isArray(newData)){
          newData.forEach(val => v.push(val))
        }else{
          v.push(newData)
        }
        
      });
      return data
    }
  }
  /**
   * 添加多条 (平级)
   * @param {*} data 
   * @param {*} obj 
   */
  addSomeObj(data, condition, newData) {
    if(this.isArray(condition)){
      let tem = condition.map(v => Object.keys(v));
      this.delSomeFromArr(data, (datav) => {
        if (this.isObject(datav) &&
          tem.some((val, i) => {
            if(val.every(subval => datav[subval] == condition[i][subval])){
              return true;
            }else{
              return false;
            }
          })
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) =>{
        if(this.isArray(newData)){
          newData.forEach(val => v.push(val))
        }else{
          v.push(newData)
        }
      });
      return data;
    }else{
      let tem = Object.keys(condition);
      this.delSomeFromArr(data, (v) => {
        //v,子元素
        if (this.isObject(v) &&
        tem.every(val => v[val] == condition[val])
        ) {
          return true
        } else {
          return false
        }
      }, (v, i) => {
        if(this.isArray(newData)){
          newData.forEach(val => v.push(val))
        }else{
          v.push(newData)
        }
      });//v，父元素
      return data;
    }
    
  }

  /**
   * 对数组的操作 - 增删改查(修改第一条复核条件的)
   * @param {*} data
   * @param {*} obj 
   * @param {*} fn 
   */
  operatOneArr(data, obj, fn) {
    let tem = Object.keys(obj);
    this.delOneFromArr(data, (v) => {
      //v,子元素
      if (this.isObject(v) &&
      tem.every(val => v[val] == obj[val])
      ) {
        return true
      } else {
        return false
      }
    }, (v, i) => fn(v, i));//v，父元素
    return data;
  }
  /**
   * 对数组的操作 - 增删改查(修改所有复核条件的)
   * @param {*} data
   * @param {*} obj 
   * @param {*} fn 
   */
  operatSomeArr(data, obj, fn) {
    let tem = Object.keys(obj);
    this.delSomeFromArr(data, (v) => {
      //v,子元素
      if (this.isObject(v) &&
      tem.every(val => v[val] == obj[val])
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
  delOneFromArr(data, callback, deal) {
    if (this.isObject(data)) {
      for (let key in data) {
        this.delOneFromArr(data[key], callback, deal);
      }
    } else if (this.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (callback(data[i])) {
          deal(data, i)
          break;
        }
        this.delOneFromArr(data[i], callback, deal)
      }
    }
  }
  /**
   * 数组递归修改
   * @param {*} data 
   * @param {*} callback
   */
  delSomeFromArr(data, callback, deal) {
    if (this.isObject(data)) {
      for (let key in data) {
        this.delSomeFromArr(data[key], callback, deal);
      }
    } else if (this.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (callback(data[i])) {
          deal(data, i);
        }
        this.delSomeFromArr(data[i], callback, deal)
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
  // filterNonUnique(arr) {
  //   return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
  // }

  /**
   * 打乱数组排序
   * @param {} arr 
   */
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5)
  }

  /**
   * 汉字排序
   * @param {[]} arr 
   */
  sortCn(arr){
    if(this.isArray(arr)){
      arr.sort((a,b)=>a.localeCompare(b,'zh-CN'))
    }
  }

}