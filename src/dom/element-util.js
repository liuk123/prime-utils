
export class ElementUtil {

  constructor() {
    this.requestAnimFrame = (
      function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) { window.setTimeout(callback, 1000 / 60); };
      })();
  }

  /**
   * 计算页面元素坐标
   * @param {element页面元素} elem 
   */
  getElementOffet(elem) {
    let pos = {
      top: elem.offsetTop,
      left: elem.offsetLeft,
    }
    while ((elem = elem.offsetParent) != null) {
      pos.top += elem.offsetTop;
      pos.left += elem.offsetLeft;
    }
    return pos;
  }

  /**
   * 页面滚动的距离
   */
  getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  }


  /**
   * 滚动条平滑滚动到某个位置
   * 
   */
  setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
  }

  /**
  *
  * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
  * @param {Number} to
  * @param {Number} duration
  */
  setScrollTo(to, duration) {
    if (duration < 0) {
      setScrollTop(to);
      return
    }
    var diff = to - getScrollTop();
    if (diff === 0) return
    var step = diff / duration * 10;
    requestAnimFrame(
      function () {
        if (Math.abs(step) > Math.abs(diff)) {
          setScrollTop(getScrollTop() + diff);
          return;
        }
        setScrollTop(getScrollTop() + step);
        if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
          return;
        }
        setScrollTo(to, duration - 10);
      });
  }
}