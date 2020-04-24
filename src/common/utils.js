export class Utils {

  constructor() { }

  getDataType(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
  }

  isObject(o) {
    return this.getDataType(o) === 'Object';
  }
  isArray(o) {
    return this.getDataType(o) === 'Array';
  }
  isString(o) {
    return this.getDataType(o) === 'String';
  }

  isNumberNotNaN(o) {
    return this.getDataType(o) === 'Number' && !isNaN(o);
  }
  isNumber(){
    return this.getDataType(o) === 'Number';
  }
  isNaN(o){
    return this.getDataType(o) === 'Number' && isNaN(o);
  }

  isDate(o) {
    return this.getDataType(o) === 'Date';
  }
  isFunction(o) {
    return this.getDataType(o) === 'Function';
  }
  isBoolean(o) {
    return this.getDataType(o) === 'Boolean';
  }

  
  isEmptyObject(o) {
    for (let key in o) {
      return false;
    }
    return true;
  }
  isEmptyValue(o) {
    if (this.isObject(o) && this.isEmptyObject(o) ||
      this.isArray(o) && o.length == 0 ||
      this.isString(o) && o === '' ||
      this.isNaN(o) ||
      o == null) {
      return true
    } else {
      return false
    }

  }


  // /**
  //    * 阻止冒泡事件
  //    * @param {event} e 
  //    */
  // cancelBubble(e) {
  //   var evt = e ? e : window.event;
  //   if (evt.stopPropagation) {
  //     evt.stopPropagation();
  //   }
  //   else {
  //     evt.cancelBubble = true;
  //   }
  // }
}