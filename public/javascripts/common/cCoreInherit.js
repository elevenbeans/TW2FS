/**
 * @class
 * @name cCoreInherit
 * @description Class类，框架的基础类体系
 * @author cmli@ctrip.com / oxz欧新志 <ouxz@Ctrip.com> / vzyq张有泉 <yq.zhang@Ctrip.com>
 */


  var slice = [].slice;
  var Core = function () {
  };


  /**
   * @description Class方法，js的继承
   * @method cCoreInherit.Class
   * @param {function} supClass 可选，要继承的类
   * @param {object} subProperty 被创建类的成员
   * @return {function} 被创建的类
   * @example
   * var Parent = cCoreInherit.Class({
   *  //定义类属性
   *  __propertys__ : function () {
   *    this.Name = 'Parent';
   *    this.Type = 'Animal'
   *  },
   *  //构造方法
   *  initialize: function (options) {
   *
     *  },
     *
     *  //定义类方法
     *  sayHello: function(name){
     *    console.log('parent say : hello '+ name +'!');
     *  }
   * });
   *
   * var Child = cCoreInherit.Class(Parent,{
   *  //定义类属性
   *  __propertys__ : function () {
   *    this.Name = 'Child'
   *  },
   *  //构造方法
   *  initialize: function ($super, options) {
   *   //调用父类的构造方法
   *   $super(options);
   *  },
   *
   *  sayHello: function($super, name){
     *    //调用父类的方法
     *    $super(name);
     *    console.log('child say : hello '+ name +'!');
     *  }
   * });
   *
   * var parent = new Parent();
   * var child = new Child ();
   * parent.sayHello('anders')
   * //parent say : hello anders!
   * child.sayHello('jack');
   * //parent say : hello jack!
   * //child say : hello jack!
   */
  Core.Class = function () {
    if (arguments.length === 0 || arguments.length > 2) {
      throw '参数错误';
    }

    var parent = null;
    //将参数转换为数组
    var properties = slice.call(arguments);

    //如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function') {
      parent = properties.shift();
    }
    properties = properties[0];

    function klass() {
      this.__propertys__();
      this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    klass.subclasses = [];

    var sup__propertys__ = function () {
    };
    var sub__propertys__ = properties.__propertys__ || function () {
    };

    if (parent) {
      if (parent.prototype.__propertys__) {
        sup__propertys__ = parent.prototype.__propertys__;
      }      
      var Subclass = function () {
      };
      Subclass.prototype = parent.prototype;
      klass.prototype = new Subclass();
      parent.subclasses.push(klass);
    }


    var ancestor = klass.superclass && klass.superclass.prototype;
    var subclassfn = function (methodName, fn) {
      return function () {
        var scope = this;
        var args = [function () {
          return ancestor[methodName].apply(scope, arguments);
        } ];
        return fn.apply(this, args.concat(slice.call(arguments)));
      };
    };
    for (var k in properties) {
      var value = properties[k];

      //满足条件就重写
      if (ancestor && typeof value == 'function') {
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/i, '').split(',');
        //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
        if (argslist[0] === '$super' && ancestor[k]) {
          value = subclassfn(k, value);
        }
      }

      klass.prototype[k] = value;
    }

    if (!klass.prototype.initialize) {
      klass.prototype.initialize = function () {
      };
    }
   
    //兼容现有框架，__propertys__方法直接重写
    klass.prototype.__propertys__ = function () {
      sup__propertys__.call(this);
      sub__propertys__.call(this);
    };

//   //兼容代码，非原型属性也需要进行继承
//   for (key in parent) {
//     if (parent.hasOwnProperty(key) && key !== 'prototype')
//       klass[key] = parent[key];
//   }

    //兼容代码，非原型属性也需要进行继承
    for (var key in parent) {
      if (parent.hasOwnProperty(key) && key !== 'prototype' && key !== 'superclass') {
        klass[key] = parent[key];
      }
    }

    klass.prototype.constructor = klass;

    return klass;
  };


  /**
   * @description 对象扩展
   * @method cCoreInherit.extend
   * @param {object} targetObj 原型对象
   * @param {object} sourceObj1 要继承的对象1
   * @param {object} ... 要继承的对象2
   * @returns {object} res
   * @example
   *  var O1 = {
   *    "name" : "jim"
   *  };
   *
   *  var O2 = {
   *    "age": 18
   *  }
   *
   *  var O3 = {};
   *  cCoreInherit.extend(O3,O1,O2)
   *  // O3 = {
   *    "name" : "jim",
   *    "age": 18
   *  }
   */
  Core.extend = function () {
    var args = slice.call(arguments);
    var source = args.shift() || {};

    if (!source) {
      return false;
    }

    for (var i = 0, l = args.length; i < l; i++) {
      if (typeof args[i] === 'object') {
        for (var key in args[i]) {
          source[key] = args[i][key];
        }
      }
    }

    return source;
  };

  /**
   * @description 对原型链的扩充
   * @method cCoreInherit.implement
   * @param {function} fn 构造函数
   * @param {object} propertys 需要補充在原型链上的方法和属性
   * @returns {Function}
   * @example
   * var Car = cCoreInherit.class({});
   * cCoreInherit.implement(Car, {});
   */
  Core.implement = function (fn, propertys) {
    if (typeof fn !== 'function') {
      return false;
    }

    for (var i in propertys) {
      fn.prototype[i] = propertys[i];
    }

    return fn;
  };

export default Core;