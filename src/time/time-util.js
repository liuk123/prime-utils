import { Utils } from "../common/utils";

export class TimeUtil extends Utils{
  constructor() {
    super();
  }

  /**
   * 距离现在的时间
   * @param {Date} startTime 
   */
  formatPassTime(startTime) {
    let currentTime = Date.parse(new Date()),
      time = currentTime - startTime,
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      hour = parseInt(time / (1000 * 60 * 60)),
      min = parseInt(time / (1000 * 60)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
  }

  /**
   * 距离结束日期的时间
   * @param {*} endTime 
   * @param {*} isEn
   */
  formatRemainTime(endTime,isEn=false) {
    let startDate = new Date();
    //开始时间
    let endDate = new Date(endTime);
    //结束时间
    let t = endDate.getTime() - startDate.getTime();
    //时间差
    let d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    if(isEn){
      return d + "d" + h + "h" + m + "m" + s + "s";
    }else{
      return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
    }
    
  }

  /**
   * 某月最后一天是多少号
   * 一个月共有多少天
   * @param {number} month 
   * @param {number} year 
   */
  getEndDate(month, year) {
    var thisDate = new Date();
    thisDate.setFullYear(
        year || thisDate.getFullYear()
        , month || (thisDate.getMonth() + 1)
        , 1);
    return new Date(thisDate.getTime() - 1000 * 60 * 60 * 24).getDate();
  };
}