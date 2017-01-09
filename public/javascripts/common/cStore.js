/**
 * Created by lbin on 2016/5/23.
 */

 import cCoreInherit from 'cCoreInherit';


    var Store = new cCoreInherit.Class(/** @lends cAbstractStore.prototype */{

        __propertys__: function () {

            this.NULL = {};

            this.key = this.NULL;

            this.lifeTime = '30M';

            this.useServerTime = false;

            this.defaultData = null;

            this.sProxy = this.NULL;


            this.userData = false;

            this.rollbackEnabled = false;
        },

        /**
         * 复写自顶层Class的initialize，赋值队�?
         * @param {Object} options
         */
        initialize: function (options) {
            for (var opt in options) {
                this[opt] = options[opt];
            }
            this.assert();
        },

        assert: function () {
           return "";
        },

        /**
         * 向Store中添加数�?
         * @param {Object} value 要添加的数据
         * @param {String} [tag] 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期�?
         * @param {Object} {oldVal} 如果启用了数据回滚机�?此参数可以设置备份数�?如rollbackEnabled为true,此参数不�?默认为value
         */
        set: function (value, tag,oldVal) {
            return "";
        },

        /**
         * 设置属性�?
         * @param {String} attrName  支持通过路径的方式，�?setAttr('global.user.name','张三')
         * @param {Object} attrVal 属性�?
         * @param {String|Number} tag 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期�?
         */
        setAttr: function (attrName, attrVal, tag) {
            return "";
        },

        /**
         * 设置当前对象的过期时�?
         * @param {String} lifeTime 字符�?
         * @param {Boolean}  [override=false] 是否在当前时间点修改,如为否则在saveDate上修�?默认为false
         */
        setLifeTime: function (lifeTime, override) {
            this.lifeTime = lifeTime;
            var tag = this.getTag(),
                value = this.get(),
                time;
            //覆盖
            if (override) {
                time = this._getNowTime();
                //在原时间点修改时�?
            } else {
                time = this.sProxy.getSaveDate(this.key, true) || this._getNowTime();
            }
            var stime = (new CDate(time.valueOf())).format('Y/m/d H:i:s');
            time.addSeconds(this._getLifeTime());
            this.sProxy.set(this.key, value, time, tag, stime);
        },


        /**
         * 获取已存取数�?
         * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期�?
         * @param {boolean} [oldFlag=false] 是否取原始数�?
         * @return {Object} result Store中存储的数据
         */
        get: function (tag, oldFlag) {
            return "";
        },

        /**
         * 获取已存取对象的属�?
         * @param {String} attrName 支持通过路径的方式，�?getAttr('global.user.name')
         * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期�?
         * @returns {Object} value 数据的属性�?
         */
        getAttr: function (attrName, tag) {
            return "";
        },
        /**
         * 获取数据tag
         * @method Store.cAbstractStore.getTag
         * @returns {String} tag 返回Store的版本标�?
         */
        getTag: function () {
            return "";
        },
        /**
         * 移除数据存储
         */
        remove: function () {
            return "";
        },

        /**
         * 移除存储对象的指定属�?
         * @param {String} attrName
         */
        removeAttr: function (attrName) {
            return "";
        },

        /**
         * 返回失效时间
         * @returns {object} exprieTime 过期时间
         */
        getExpireTime: function () {
            return "";
        },

        /**
         * 设置过期时间
         * @param {Date} time 过期时间
         */
        setExpireTime: function (time) {
            return "";
        },

        /**
         * 活动当前时间 useServerTime:true 返回服务器时�?false返回本地时间
         * @private
         */
        _getNowTime: function () {
            return "";
        },

        /*
         * 根据liftTime 计算要增加的毫秒�?
         * @returns {number} 根据liftTime 计算要增加的毫秒�?
         * @private
         */
        _getLifeTime: function () {
            return "";
        },

        /**
         * 回滚至上个版�?
         * @param {Array} [attrs] 属性名数组，如传递此参数只回滚指定属性，如不指定全部回滚
         */
        rollback: function (attrs) {
            return "";
        }
    });

    /**
     * 单例方法,获取Store的实�?
     * @method cAbstractStore.getInstance
     * @returns {object}
     */
    Store.getInstance = function () {
        if (this.instance) {
            return this.instance;
        } else {
            return this.instance = new this();
        }
    };
export default Store;




//define([], function () {
//
//
//
//    var LocalStore = {};
//    LocalStore.setItem
//    return LocalStore;
//});




