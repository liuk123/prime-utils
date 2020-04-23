import { Utils } from "../common/utils";

export class FunctionUtil extends Utils {
    constructor() {
        super();
    }

    /**
     * @desc   函数节流。
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                      false: 在delay时间内连续触发，最后一次触发后delay时间后执行
     *                                      true:  在delay时间内连续触发，先执行后延续delay秒
     *                                      
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *                                      true: 先执行一次，最后触发delay秒内不执行，
     *                                      false: delay秒之后执行一次
     *
     * @return {Function}  新的节流函数
     */
    throttle(delay, noTrailing, callback, debounceMode) {
        var timeoutID;
        var lastExec = 0;
        if (!this.isBoolean(noTrailing)) {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }
        function wrapper() {
            var self = this;
            var elapsed = Number(new Date()) - lastExec;
            var args = arguments;
            function exec() {
                lastExec = Number(new Date());
                callback.apply(self, args);
            }
            function clear() {
                timeoutID = undefined;
            }
            if (debounceMode && !timeoutID) {
                exec();
            }
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            if (debounceMode === undefined && elapsed > delay) {
                exec();
            } else if (noTrailing !== true) {

                timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
            }
        }
        return wrapper;
    };


    /**
     * @desc 函数防抖
     * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
     * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
     * @example 适用场景：如在线编辑的自动存储防抖。
     * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}  atBegin       可选，默认为false。
     *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
     如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
     * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                  执行去抖动功能时，，调用`callback`。
     *
     * @return {Function} 新的防抖函数。
     */
    debounce(delay, atBegin, callback) {
        return callback === undefined ? this.throttle(delay, atBegin, false) : this.throttle(delay, callback, atBegin !== false);
    };

}