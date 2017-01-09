/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:80/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _detector = __webpack_require__(2);

	var _detector2 = _interopRequireDefault(_detector);

	var _convertor = __webpack_require__(9);

	var _convertor2 = _interopRequireDefault(_convertor);

	var _toast = __webpack_require__(4);

	var _toast2 = _interopRequireDefault(_toast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CtripGlobal = function () {
	  function CtripGlobal() {
	    _classCallCheck(this, CtripGlobal);

	    this.detector = new _detector2.default(); //复制detecter类的一个实例
	    this.UA = this.detector.UA; // 复制自detecter模块，detecter 继承自底层 base 模块
	    this.convertor = new _convertor2.default();
	  }

	  _createClass(CtripGlobal, [{
	    key: 'getURLParam',
	    value: function getURLParam(url) {
	      return this.detector.getURLParam(url);
	    }
	  }, {
	    key: 'toast',
	    value: function toast(msg, posCall, negCall) {
	      new _toast2.default(msg, posCall, negCall);
	    }
	  }]);

	  return CtripGlobal;
	}();

	window.ctripGlobal = new CtripGlobal();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(3);

	var _base2 = _interopRequireDefault(_base);

	var _toast = __webpack_require__(4);

	var _toast2 = _interopRequireDefault(_toast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**detector用作各类环境检测
	    methods:
	      lang: 检测页面语言类型
	      core:检测内核类型 （trident、webKit... to be added...）
	      device：检测设备类型 （mobile/android/iPhone... to be added...）
	      inCtripApp：检测页面是否运行在CtripApp中
	      openCtripApp（arg1,arg2,arg3）：检测是否安装 CtripApp
	        @param1: 检测需要传入的配置信息
	        @param2：未检测到，或者检测失败的回调
	**/

	var Detector = function (_Base) {
	    _inherits(Detector, _Base);

	    function Detector() {
	        _classCallCheck(this, Detector);

	        return _possibleConstructorReturn(this, (Detector.__proto__ || Object.getPrototypeOf(Detector)).call(this));
	    }

	    _createClass(Detector, [{
	        key: 'lang',
	        value: function lang() {

	            var urlParam = this.getURLParam(this.URL);
	            var res;
	            var urlLangArr = ['HK', 'EN', 'JP', 'KR', 'FR', 'DE', 'ES', 'SG', 'MY', 'RU', 'ID', 'TH'];
	            var urlArr = ['.hk', 'english', 'jp.', '.kr', 'fr.', 'de.', 'es.', '.sg', '.my', 'ru.', '.id', '.th'];
	            var standard = ["zh-HK", "en-US", "ja-JP", "ko-KR", "fr-FR", "de-DE", "es-ES", "en-SG", "ms-MY", "ru-RU", "id-ID", "th-TH"];
	            //优先从restfulAPI里取
	            if (typeof restfulApi !== "undefined" && restfulApi.APPLANGSFFX) {
	                res = restfulApi.APPLANGSFFX;
	                return res;
	            }

	            //restfulAPI没得到，就从url里取；
	            for (var i in urlLangArr) {
	                if (urlParam.language == urlLangArr[i]) {
	                    return standard[i];
	                }
	            }

	            //如果url也没有，最后再用最笨的匹配法
	            for (var i in urlArr) {
	                if (this.URL.indexOf(urlArr[i]) !== -1) {
	                    return standard[i];
	                }
	            }

	            res = 'en-US';
	            return res;
	        }
	    }, {
	        key: 'core',
	        value: function core() {
	            var u = this.UA;
	            var coreArr = ['Trident', 'Presto', 'AppleWebKit', 'Gecko'];

	            for (var i in coreArr) {
	                if (u.indexOf(coreArr[i]) !== -1) {
	                    break;
	                }
	            }
	            return coreArr[i];
	        }
	    }, {
	        key: 'device',
	        value: function device() {
	            var u = this.UA;
	            return {
	                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端
	                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
	                iPad: u.indexOf('iPad') > -1 //是否iPad
	            };
	        }
	    }, {
	        key: 'aboveIOS9',
	        value: function aboveIOS9() {
	            var u = this.UA;
	            var agent = u.toLowerCase();
	            var version;
	            if (agent.indexOf("like mac os x") > 0) {
	                var regStr_saf = /os [\d._]*/gi;
	                var verinfo = agent.match(regStr_saf);
	                version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
	            }
	            //alert(version);
	            return parseInt(version) >= 9 ? true : false;
	        }
	    }, {
	        key: 'inChrome',
	        value: function inChrome() {
	            var u = this.UA;
	            return u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1; //
	        }
	    }, {
	        key: 'detectLocalStorage',
	        value: function detectLocalStorage() {
	            try {
	                window.localStorage.detect = "detect";
	            } catch (e) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'inCtripApp',
	        value: function inCtripApp() {
	            var u = this.UA;
	            return u.indexOf('Ctrip') > -1;
	        }
	    }, {
	        key: 'openCtripApp',
	        value: function openCtripApp(cfg, errorCal) {
	            // 通过不同方式试图打开APP，如果能正常打开，会直接切换到APP
	            var urlParam = this.getURLParam(this.URL);

	            if (this.inChrome()) {

	                setTimeout(function () {
	                    errorCal(false);
	                }, 3600);
	                // android Chrome 中主动唤起 bug 多多，降级处理为手动唤起按钮
	                // if (this.device().android) {

	                //     if (window.localStorage.firstInChrome !== '1') {
	                //         window.open(cfg.deeplink);
	                //         window.localStorage.firstInChrome = 1;
	                //     }

	                //     var timer = null;
	                //     if (window.localStorage.hasOpenPop !== 'true' + new Date().getDate()) { //用户取消后，一天内只提示一次

	                //         new Toast({
	                //             title: "Save Up to 50%<br /> with the free Ctrip App!",
	                //             posText: "OPEN CTRIP APP",
	                //             negText: "NO THANKS",
	                //             deeplink: cfg.deeplink,
	                //             timeout: 4800
	                //         }, function() {
	                //             console.log('open');
	                //             //window.localStorage.hasOpenPop = 'true'+ new Date().getDate();
	                //         }, function() {
	                //             console.log('do not open');
	                //             window.localStorage.hasOpenPop = 'true' + new Date().getDate();
	                //             clearTimeout(timer);
	                //         }, true);
	                //     }

	                //     timer = setTimeout(function() {
	                //         errorCal(false);
	                //     }, 4800); //给降级按钮留充足时间
	                // } else {
	                //     var timer = null;
	                //     setTimeout(function() {
	                //         window.location.href = cfg.deeplink;
	                //     }, 1800);
	                //     timer = setTimeout(function() {
	                //         errorCal(false);
	                //     }, 3600); //IOSChrome浏览器，1.8s 内未唤起，则表示唤起失败，进入失败回调
	                // }
	            } else {
	                var timer1 = null,
	                    timer2 = null,
	                    timer3 = null;
	                if (this.aboveIOS9()) {
	                    //IOS9 safari 需要一个间隔，才能弹出唤起框
	                    if (this.detectLocalStorage() && window.localStorage.firstInIOS9 !== 'true' + new Date().getDate()) {
	                        //一天只唤起一次
	                        window.localStorage.firstInIOS9 = 'true' + new Date().getDate();
	                        timer1 = setTimeout(function () {
	                            window.location.href = cfg.deeplink;
	                        }, 3000);
	                    }

	                    timer2 = setTimeout(function () {
	                        errorCal(false);
	                    }, 6000);
	                } else {
	                    window.location.href = cfg.deeplink;
	                    timer3 = setTimeout(function () {
	                        errorCal(false);
	                    }, 3600);
	                }
	            }

	            // ifr = document.createElement('iframe');
	            // ifr.style.display = 'none';
	            // ifr.src = ifrSrc;
	            // document.body.appendChild(ifr);
	            //
	            // setTimeout(function() {
	            //   document.body.removeChild(ifr);
	            // },3000);
	        }
	    }]);

	    return Detector;
	}(_base2.default);

	module.exports = Detector;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Base = function () {
	  function Base() {
	    _classCallCheck(this, Base);

	    this.UA = navigator.userAgent;
	    this.URL = window.location.href;
	  }

	  _createClass(Base, [{
	    key: 'getURLParam',
	    value: function getURLParam(url) {
	      var result = {};
	      var paramParts;
	      var reg = /^([\u4E00-\u9FFF]|[a-zA-Z]|[0-9]|\s)+$/;
	      var params = (url.split('?')[1] || '').split('&');

	      for (var param in params) {
	        if (params.hasOwnProperty(param)) {
	          paramParts = params[param].split('=');
	          var temp = decodeURIComponent(paramParts[1] || "");
	          if (temp && reg.test(temp)) result[paramParts[0]] = temp;
	        }
	      }
	      // console.log('result::',result);
	      return result;
	    }
	  }]);

	  return Base;
	}();

	module.exports = Base;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Toast = function () {
	  function Toast(cfg, pCall, nCall, _private) {
	    _classCallCheck(this, Toast);

	    this.init(cfg, pCall, nCall, _private);
	  }

	  _createClass(Toast, [{
	    key: 'init',
	    value: function init(cfg, posCall, negCall, _private) {

	      // default value
	      cfg.timeout = cfg.timeout || 8000;
	      cfg.deeplink = cfg.deeplink || 'ctripglobal://Home';
	      cfg.posText = cfg.posText || 'YES';
	      cfg.negText = cfg.negText || 'no';
	      cfg.title = cfg.title || 'This is a default<br />title of Ctrip App toast!';

	      var aHtml = "<a href = " + "'" + cfg.deeplink + "'" + "class = 't-positive' id='t-pos'>" + cfg.posText + "</a>";
	      var divHtml = "<div class = 't-positive' id='t-pos'>" + cfg.posText + "</div>";
	      var resHtml = _private ? aHtml : divHtml;

	      var html = "<div class = 't-mask' id='t-mask'>" + "<div class = 't-main'>" + "<div class = 't-close' id='t-close'></div>" + "<div class = 't-title'>" + "<div class = 't-logo'> </div>" + "<div class = 't-text'>" + cfg.title + "</div>" + "</div>" + "<div class = 't-action'>" + resHtml + "<div class = 't-negative' id='t-neg'>" + cfg.negText + "</div>" + "</div>" + "</div>" + "</div>";

	      if (!document.getElementById('t-mask')) {
	        document.body.insertAdjacentHTML('beforeEnd', html);
	        this.blindEvent(cfg, posCall, negCall);
	      }
	    }
	  }, {
	    key: 'blindEvent',
	    value: function blindEvent(cfg, posCall, negCall) {
	      var mainEle = document.getElementById('t-mask');
	      var closeEle = document.getElementById('t-close');
	      var posEle = document.getElementById('t-pos');
	      var negEle = document.getElementById('t-neg');
	      //debugger
	      var time = null;
	      var _self = this;
	      time = setTimeout(function () {
	        if (document.getElementById('t-mask')) {
	          _self.disableScroll(false);
	          document.body.removeChild(mainEle);
	        }
	      }, cfg.timeout);

	      closeEle.addEventListener("click", function (e) {
	        _self.disableScroll(false);
	        document.body.removeChild(mainEle);
	        negCall(e);
	      });

	      posEle.addEventListener("click", function (e) {
	        _self.disableScroll(false);
	        document.body.removeChild(mainEle);
	        posCall(e);
	      });

	      negEle.addEventListener("click", function (e) {
	        _self.disableScroll(false);
	        document.body.removeChild(mainEle);
	        negCall(e);
	      });
	      this.disableScroll(true);
	    }
	  }, {
	    key: 'disableScroll',
	    value: function disableScroll(n) {
	      if (document.addEventListener) {
	        document.addEventListener('DOMMouseScroll', scrollFunc, true);
	      } //W3C
	      window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
	      if (n) {
	        document.getElementById('t-mask').addEventListener('touchmove', bodyScroll, false);
	      } else {
	        document.getElementById('t-mask').removeEventListener('touchmove', bodyScroll, false);
	      }
	      function bodyScroll(e) {
	        e.preventDefault();
	      }
	      function scrollFunc(evt) {
	        return !n;
	      }
	    }
	  }]);

	  return Toast;
	}();

	module.exports = Toast;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./toast.less", function() {
				var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.2.2.3@less-loader/index.js!./toast.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".t-mask {\n  font-family: \"DroidSans\", \"DroidSansFallback\", \"roboto\", tahoma, arial, sans-serif;\n}\n.t-mask {\n  position: fixed;\n  z-index: 9999;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.t-mask .t-main {\n  z-index: 9;\n  position: absolute;\n  border-radius: 2px;\n  width: 80%;\n  bottom: 50%;\n  padding: 18px;\n  left: 50%;\n  -webkit-transform: translate3D(-50%, 50%, 0);\n  background: #fff;\n}\n.t-mask .t-main .t-close {\n  position: absolute;\n  z-index: 999;\n  top: 0px;\n  right: 0px;\n  width: 20px;\n  height: 20px;\n  margin: 12px;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAkCAMAAAA5HAOUAAAASFBMVEX///9mZmbU1NRra2v7+/vy8vKzs7OYmJh/f399fX2Wlpb9/f21tbXt7e24uLienp6RkZGMjIz29vbo6Oji4uLHx8esrKxxcXEwoAjrAAAAe0lEQVQ4y+3PRwrAMBAEwZW1zjn//6dODEYWjMBn9bkuLbGfLZ24JePkoXk3mYus6T2luQEDKlLhDIgyIMqACGPoqb4YEGc9EGcM4e5UWxBZY3HKUNk+pxylohUYQXKzJoTAOALjCKzzUV0CvWz1WTvc6GXDqBJOVWLfDqDFA631O2GSAAAAAElFTkSuQmCC\");\n  background-size: 100%;\n}\n.t-mask .t-main .t-title {\n  overflow: hidden;\n  position: relative;\n}\n.t-mask .t-main .t-title .t-logo {\n  float: left;\n  width: 52px;\n  height: 52px;\n  background: url(http://pic.c-ctrip.com/common/c_logo2013.png) 7px 5px no-repeat;\n  border-radius: 24px;\n  box-shadow: 1px 2px 1px #999;\n  overflow: hidden;\n}\n.t-mask .t-main .t-title .t-text {\n  float: right;\n  width: 75%;\n  font-size: 18px;\n  margin-bottom: 20px;\n}\n.t-mask .t-main .t-action {\n  overflow: hidden;\n  position: relative;\n}\n.t-mask .t-main .t-action a {\n  text-decoration: none;\n}\n.t-mask .t-main .t-action .t-positive {\n  float: right;\n  width: 130px;\n  height: 30px;\n  background: #2577e3;\n  text-align: center;\n  line-height: 30px;\n  border-radius: 3px;\n  color: #fff;\n  font-size: 12px;\n}\n.t-mask .t-main .t-action .t-negative {\n  float: right;\n  width: 120px;\n  height: 30px;\n  text-align: center;\n  line-height: 30px;\n  border-radius: 3px;\n  font-size: 12px;\n  color: #2577e3;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(3);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Convertor = function (_Base) {
	  _inherits(Convertor, _Base);

	  function Convertor() {
	    _classCallCheck(this, Convertor);

	    return _possibleConstructorReturn(this, (Convertor.__proto__ || Object.getPrototypeOf(Convertor)).call(this));
	  }

	  _createClass(Convertor, [{
	    key: 'convertToNative',
	    value: function convertToNative(url) {
	      if (typeof url == "undefined") {
	        //如果参数空缺，取当前　URL
	        var url = this.URL;
	      }

	      var urlParam = this.getURLParam(url);
	      var resArr = [];

	      resArr.push(url.split('://')[0]); // 协议
	      resArr.push(url.split('://')[1].split('?')[0]); // 主域
	      resArr.push(url.split('://')[1].split('?')[1]); // 参数

	      // 协议主域缺一不可
	      if (!(resArr[0] && resArr[1])) {
	        console.log('Incomplete URL!');
	        return;
	      }

	      //转换协议头
	      resArr[0] = resArr[0].replace('http', 'ctripglobal').replace('https', 'ctripglobal');

	      if (!resArr[2]) {
	        //URL 无参数则统一跳转至 Home
	        resArr[1] = 'Home';
	      }

	      if (url.indexOf('/m/?') !== -1) {
	        //URL为主页
	        resArr[1] = 'Home';
	        //处理 search 类主域
	        if (urlParam && urlParam.tab) {
	          var temp = urlParam.tab;
	          switch (temp) {
	            case 'h':
	              resArr[1] = 'HotelSearch';
	              break;
	            case 'f':
	              resArr[1] = 'FlightSearch';
	              break;
	            case 't':
	              resArr[1] = 'TrainSearch';
	              break;
	            default:
	              resArr[1] = 'Home';
	          }
	        }
	      }

	      //处理 list && detail 主域
	      if (resArr[1].indexOf('-hotels-list-') !== -1) {
	        var tempArr = resArr[1].split('/');
	        for (var index in tempArr) {
	          if (tempArr[index].indexOf('-hotels-list-') !== -1) {
	            resArr[2] = resArr[2] + '&kd=' + 'city|' + tempArr[index].replace(/[^0-9]/ig, "");
	          }
	        }
	        resArr[1] = 'HotelList';
	      } else if (resArr[1].indexOf('hotels/list/') !== -1) {
	        //无法获取城市信息 IsAround=1&DotX=22.396428&DotY=114.10949699999999&checkin=2016-08-25&checkout=2016-08-26&SearchType=0
	        //resArr[2] = resArr[2] + '&kd='+ 'city|' + '' + '_' + 'nearby|'+urlParam.DotX + ',' +urlParam.DotY;
	        resArr[1] = 'HotelList';
	      } else if (resArr[1].indexOf('-hotel-detail-') !== -1) {
	        var tempArr = resArr[1].split('/');
	        for (var index in tempArr) {
	          if (tempArr[index].indexOf('-hotel-detail-') !== -1) {
	            resArr[2] = resArr[2] + '&hid=' + tempArr[index].replace(/[^0-9]/ig, "");
	          }
	        }
	        resArr[1] = 'HotelDetail';
	      } else if (resArr[1].indexOf('/flights') !== -1) {
	        //international
	        resArr[2] = resArr[2] + '&nb=1' + '&dn=' + urlParam.dcity + '|' + urlParam.acity + '&tp=i';
	        resArr[1] = 'FlightListAB';
	      } else if (resArr[1].indexOf('/chinaflights/') !== -1) {
	        //domastic
	        resArr[2] = resArr[2] + '&nb=1' + '&dn=' + urlParam.dcity + '|' + urlParam.acity + '&tp=d';
	        resArr[1] = 'FlightListAB';
	      } else if (resArr[1].indexOf('trains/List/') !== -1) {
	        resArr[2] = resArr[2] + '&dn=' + urlParam.DepartureStation + '|' + urlParam.ArrivalStation;
	        // 调整火车票 list 日期参数格式 ... 给跪了
	        var uglyDate = resArr[2].replace(/[^\d{2}-\d{2}-\d{4}]/ig, ""); // 例如 08-29-2016
	        var tempArr = uglyDate.split('-');
	        var cuteDate = tempArr[2] + '-' + tempArr[0] + '-' + tempArr[1];
	        //console.log(cuteDate,uglyDate);
	        resArr[2] = resArr[2].replace(uglyDate, cuteDate);
	        //取到日期
	        resArr[1] = 'TrainList';
	      } else {}

	      //处理拼接参数
	      if (resArr[2]) {
	        resArr[2] = resArr[2].replace('allianceid', 'aid').replace('curr', 'cur').replace('checkin', 'cin').replace('checkout', 'cout').replace('cityname', 'dn').replace('cityenname', 'dn') //??? 这里存疑

	        .replace('cityid', 'ct').replace('cityname', 'dn')
	        //.replace('flighttype','ft')
	        .replace('dcitycode', 'dct').replace('acitycode', 'act').replace('ddate', 'ddt').replace('adate', 'rdt').replace('triptype=0', 'ft=s').replace('triptype=1', 'ft=d').replace('classtype=0', 'fc=y').replace('classtype=2', 'fc=c').replace('classtype=3', 'fc=f').replace('DepartureStation', 'dp').replace('ArrivalStation', 'ap').replace('DepartDate', 'ddt');

	        return resArr[0] + '://' + resArr[1] + '?' + resArr[2];
	      }

	      return resArr[0] + '://' + resArr[1];
	    }
	  }, {
	    key: 'htmlEscaper',
	    value: function htmlEscaper(str) {
	      var s = "";
	      if (str.length == 0) return "";
	      s = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
	      return s;
	    }
	  }, {
	    key: 'htmlUNEscaper',
	    value: function htmlUNEscaper(str) {
	      var s = "";
	      if (str.length == 0) return "";
	      s = str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(/<br>/g, "\n");
	      return s;
	    }
	  }]);

	  return Convertor;
	}(_base2.default);

	module.exports = Convertor;

/***/ }
/******/ ]);
