export class Utils {

  constructor() {
  }

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
  isNumber(){
    return this.getDataType(o) === 'Number';
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
  isNull(o){
    return this.getDataType(o) === 'Null';
  }
  isUndefind(o){
    return this.getDataType(o) === 'Undefined';
  }


  isNotEmptyObject(o) {
    if(this.isObject(o)){
      for (let key in o) {return true;}
      return false;
    }else{
      return false;
    }
  }
  isNotEmptyArray(o){
    return this.isArray(o) && o.length > 0;
  }
  
  isEmptyObject(o) {
    if(this.isObject(o)){
      for (let key in o) {return false;}
      return true;
    }else{
      return false;
    }
    
  }
  isEmptyArray(o){
    return this.isArray(o) && o.length == 0;
  }
  isEmptyValue(o) {
    if (this.isEmptyObject(o) ||
        this.isEmptyArray(o) ||
        isNaN(o) ||
        isBlank(val)) {
      return true
    } else {
      return false
    }
  }
  isBlank(val){
    if(val == null || val == ""){
      return true;
    }else{
      return false;
    }
  }
}