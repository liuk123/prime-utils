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

  isNumber(o) {
    return this.getDataType(o) === 'Number' && !isNaN(o);
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