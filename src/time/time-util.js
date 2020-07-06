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
    let currentTime = new Date(),
      time = currentTime - new Date(startTime),
      day = Number.parseInt(time / (1000 * 60 * 60 * 24)),
      hour = Number.parseInt(time / (1000 * 60 * 60)),
      min = Number.parseInt(time / (1000 * 60)),
      month = Number.parseInt(day / 30),
      year = Number.parseInt(month / 12);
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
    let endDate = new Date(endTime);
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
    return new Date(year, month, 0).getDate();
  };

  //一个月第一天是周几
  getWeekFirstDay(year,month){
    return new Date(year,month-1,1).getDay()
  }

  formatDateToStr(date,fmt='yyyy-MM-dd hh:mm:ss'){
    let ret;
    const opt = {
      "y+": date.getFullYear(),
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      "S+": date.getMilliseconds()
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? String(opt[k]) : (String(opt[k]).padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }
}