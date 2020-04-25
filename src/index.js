// let moduleExports = {};
// const r = require.context('./',true,/^\.\/.+\/.+-util\.js$/);
// r.keys().forEach((key)=>{
//   let attr = key.substring(key.lastIndexOf('/')+1,key.lastIndexOf('.'));
//   moduleExports[attr] = r(key);  
// })
// console.log(moduleExports)
// console.log(r.keys())
// module.exports = moduleExports;


import { ObjectUtil } from "./object/object-util";
import { NumberUtil } from "./number/number-util";
import { RegExpUtil } from "./regexp/regexp-util";
import { TimeUtil } from "./time/time-util";
import { FunctionUtil } from "./function/function-util"
// import { ElementUtil } from "./dom/element-util";
// import { ExploreUtil } from "./explore/explore-util";
// import { CookieUtil } from "./storage/cookie-util";


export let objectUtil = new ObjectUtil();
export let numberUtil = new NumberUtil();
export let regExpUtil = new RegExpUtil();
export let timeUtil = new TimeUtil();
export let functionUtil = new FunctionUtil();


// export let elementUtil = new ElementUtil();
// export let exploreUtil = new ExploreUtil();
// export let cookieUtil = new CookieUtil();