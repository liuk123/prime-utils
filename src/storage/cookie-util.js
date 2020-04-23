
export class CookieUtil {
  constructor() { }

  /**
   * 获取cookie
   * @param {*} name 
   */
  getCookie(name) {
    let arr = document.cookie.replace(/\s/g, "").split(';');
    for (let i = 0; i < arr.length; i++) {
      let tempArr = arr[i].split('=');
      if (tempArr[0] == name) {
        return decodeURIComponent(tempArr[1]);
      }
    }
    return '';
  }


  /**
   * 设置cookie
   * @param {*} name 
   * @param {*} value 
   * @param {*} days 
   */
  setCookie(name, value, days) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
  }

  /**
   * 删除cookie
   * @param {*} name 
   */
  removeCookie(name) {
    this.setCookie(name, '1', -1);
  }
}