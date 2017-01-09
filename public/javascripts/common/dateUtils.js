/**
 * Created by kjmao on 2016/5/23.
 */
define([], function () {

    var _DATE_TEXT_REG = /(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})/;

    return {
        createDate: function (text) {
            if (this.isDateText(text)) {
                var arr = text.match(_DATE_TEXT_REG);
                text = new Date(arr[1], parseInt(arr[3], 10) - 1, arr[5]);
            } else if (!this.isDate(text)) {
                text = new Date();
            } else if (/\d{12,}/.test(text)) {
                text = new Date(text);
            } else if (!text) {
                text = new Date();
            }
            //text.setTime(text.getTime() + (text.getTimezoneOffset() * 60 * 1000 - -28800000));
            return text;
        },
        addDay: function (date, days) {
            days = days || 1;
            if (this.isDateText(date)) {
                date = this.createDate(date);
            }
            if (this.isDate(date)) {
                date.setDate(date.getDate() + days);
            }
            return date;
        },
        addHours: function (date, hours) {
            if (this.isDate(date)) {
                date.setHours(date.getHours() + hours);
            }
            return date;
        },
        subtractDay: function (date, days) {
            days = days || 1;
            if (this.isDateText(date)) {
                date = this.createDate(date);
            }
            if (this.isDate(date)) {
                date.setDate(date.getDate() - days);
            }
            return date;
        },
        max: function (from, to) {
            if (this._isAllDateText(from, to)) {
                from = this.createDate(from);
                to = this.createDate(to);
            }
            return this._isAllDate(from, to) && Math.max(from.getTime(), to.getTime());
        },
        min: function (from, to) {
            if (this._isAllDateText(from, to)) {
                from = this.createDate(from);
                to = this.createDate(to);
            }
            return this._isAllDate(from, to) && Math.min(from.getTime(), to.getTime());
        },
        isEqual: function (from, to) {
            return this.isSame(from, to);
        },
        format: function (date, formatText) {

            if (this.isDate(date) && !formatText) {

            } else if (date) {
                date = new Date(date * 1000);
            }
            return date.getFullYear() + '-' + this.formatNum(date.getMonth() + 1) + '-' + this.formatNum(date.getDate());
        },
        calcuRangeDay: function (start, end) {
            var startDate = null,
                endDate = null;

            if (this.isDate(start) && this.isDate(end)) {

            } else if (this.isDateText(start) && this.isDateText(end)) {
                startDate = this.createDate(start);
                endDate = this.createDate(end);
            }
            return Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
        },
        parse: function(e, t) {
            if ("undefined" == typeof e)
                return null ;
            if ("string" == typeof t) {
                var i = (new Date(t),
                    t.replace(/[^ymd]/g, "").split(""));
                if (!i && 3 != i.length)
                    return null ;
                t = t.replace(/y|m|d/g, function(e) {
                        switch (e) {
                            case "y":
                                return "(\\d{4})";
                            case "m":
                            case "d":
                                return "(\\d{1,2})"
                        }
                    }
                );
                for (var n = new RegExp(t,"g"), r = n.exec(e), a = {}, o = 0, s = i.length; s > o; o++)
                    a[i[o]] = r[o + 1];
                return new Date(a.y,a.m - 1,a.d)
            }
            return null
        },
        _format: function(e, t) {
            return arguments.length < 2 && !e.getTime && (t = e,
                e = new Date),
            "string" != typeof t && (t = "Y年M月D日 H时F分S秒"),
                t.replace(/[ymdhfs]/gi, function(t) {
                        switch (t) {
                            case "y":
                                return (e.getFullYear() + "").slice(2);
                            case "Y":
                                return e.getFullYear();
                            case "m":
                                return e.getMonth() + 1;
                            case "M":
                                return this.formatNum(e.getMonth() + 1);
                            case "d":
                                return e.getDate();
                            case "D":
                                return this.formatNum(e.getDate());
                            case "h":
                                return e.getHours();
                            case "H":
                                return this.formatNum(e.getHours());
                            case "f":
                                return e.getMinutes();
                            case "F":
                                return this.formatNum(e.getMinutes());
                            case "s":
                                return e.getSeconds();
                            case "S":
                                return this.formatNum(e.getSeconds())
                        }
                    }
                )
        },
        isLeapYear: function(e) {
            return this.isDate(e) && (e = e.getFullYear()),
                e % 4 === 0 && e % 100 !== 0 || e % 400 === 0 ? !0 : !1;
        },
        getDaysOfMonth: function(e, t) {
            return this.isDate(e) ? (t = e.getMonth(),
                e = e.getFullYear()) : t--,
                [31, this.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t];
        },
        getBeginDayOfMouth: function(e, t) {
            this.isDate(e) ? (t = e.getMonth(),
                e = e.getFullYear()) : t--;
            var i = new Date(e,t,1);
            return i.getDay();
        },
        formatTimes: function (date) {
            date = date * 1000;
            if (date) {
                date = new Date(date);
                return date.getFullYear() + '/' + this.formatNum(date.getMonth() + 1) + '/' + this.formatNum(date.getDate());
            }
        },
        formatNum: function (e) {
            return 10 > e ? "0" + e : e.toString();
        },
        isDateText: function (text) {
            return _DATE_TEXT_REG.test(text);
        },
        isDate: function (obj) {
            return '[object Date]' === Object.prototype.toString.call(obj);
        },
        _isAllDate: function (from, to) {
            return this.isDate(from) && this.isDate(to);
        },
        _isAllDateText: function (from, to) {
            return this.isDateText(from) && this.isDateText(to)
        },
        isAfter: function (from, to) {
            if (this._isAllDate(from, to)) {
                return from.getTime() > to.getTime();
            } else if (from && to && this._isAllDateText(from, to)) {
                return (this.createDate(from)).getTime() > (this.createDate(to)).getTime();
            }
            return !1;
        },
        isBefore: function (from, to) {
            if (this._isAllDate(from, to)) {
                return from.getTime() < to.getTime();
            } else if (from && to && this._isAllDateText(from, to)) {
                return (this.createDate(from)).getTime() < (this.createDate(to)).getTime();
            }
            return !1;
        },
        isBetween: function (from, to, input) {
            return this.isBefore(from, input)
                && this.isBefore(input, to);
        },
        isSame: function (from, to) {
            if (this._isAllDate(from, to)) {
                return from.getTime() === to.getTime();
            } else if (from && to && this._isAllDateText(from, to)) {
                return from === to;
            }
            return !1;
        },
        isSameOrAfter: function (from, to) {
            if (this._isAllDate(from, to)) {
                return from.getTime() >= to.getTime();
            } else if (from && to && this._isAllDateText(from, to)) {
                return (this.createDate(from)).getTime() >= (this.createDate(to)).getTime();
            }
            return !1;
        },
        isSameOrBefore: function (from, to) {
            if (this._isAllDate(from, to)) {
                return from.getTime() <= to.getTime();
            } else if (from && to && this._isAllDateText(from, to)) {
                return (this.createDate(from)).getTime() <= (this.createDate(to)).getTime();
            }
            return !1;
        },
        createDateModelByFormat: function (dateText, monthArr, weekDayArr) {
            if (this.isDateText(dateText)) {
                var arr = dateText.split(/\/|-/g);
                return this.createDateModel(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), monthArr, weekDayArr);
            }
        },
        createDateModel: function (changedYear, changedMonth, day, monthArr, weekDayArr) {
            monthArr = monthArr || 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
            weekDayArr = weekDayArr || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            //var props = defaultProps;
            var data = new Date();
            var curTime = data.getTime();// + data.getTimezoneOffset() * 60 * 1000;
            var isToday = false;
            var cndate = changedYear + '-' + this.formatNum(changedMonth + 1) + '-' + this.formatNum(day);
            var dateObj = this.createDate(cndate);
            var calendar_time = dateObj.getTime();
            var difftime = calendar_time - curTime;
            var _difftime = -1 * difftime;
            var diffHour = parseInt(_difftime / 3600000 * 100) / 100;
            var _diffHour = parseInt((curTime - calendar_time) / 36000) / 100;
            var _deffHour = parseInt(-1 * difftime / 3600000 * 100) / 100;
            var isPast = _diffHour >= 24 || (curTime && calendar_time > curTime);
            //处理日
            if (_deffHour >= 0 && _deffHour < 24) {
                isToday = true;
            } else {
                isToday = false;
            }
            return {
                time: calendar_time, //  - dateObj.getTimezoneOffset() * 60 * 1000,
                year: changedYear,
                month: changedMonth + 1,
                monthText: monthArr[changedMonth],
                date: day,
                day: dateObj.getDay(),
                dayText: weekDayArr[dateObj.getDay()],
                isToday: isToday,
                isPast: isPast,
                today: 'today',
                dateFormatStr: cndate,
                changedYear: changedYear,
                changedMonth: changedMonth,
                dateObj: dateObj,
                difftime: difftime
            };
        },
        createHotelCalendar: function (checkInText, checkOutText, monthArr, weekDayArr) {
            var date = this.createDate(new Date()),
                checkInDate = null,
                checkOutDate = null;

            if (!this.isDateText(checkInText) || !this.isDateText(checkOutText)) {
                checkInText = this.format(date);
                checkOutText = this.format(this.addDay(date));
            } else if (this.isDateText(checkInText) && this.isDateText(checkOutText) && this.isAfter(date, this.createDate(checkInText))) {
                checkInText = this.format(date);
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = this.format(this.addDay(date));
                }
            } else {
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = this.format(this.addDay(date));
                }
            }

            checkInDate = this.createDateModelByFormat(checkInText, monthArr, weekDayArr);
            checkOutDate = this.createDateModelByFormat(checkOutText, monthArr, weekDayArr);

            return {
                checkInText: checkInText,
                checkOutText: checkOutText,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate
            };
        },
        createFlightCalendar: function (checkInText, checkOutText, monthArr, weekDayArr) {
            var date = this.createDate(new Date()),
                checkInDate = null,
                checkOutDate = null;

            if (!this.isDateText(checkInText) || !this.isDateText(checkOutText)) {
                checkInText = this.format(date);
                checkOutText = this.format(this.addDay(date));
            } else if (this.isAfter(date, this.createDate(checkInText))) {
                checkInText = this.format(date);
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = checkInText;
                }
            } else {
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = checkInText;
                }
            }
            checkInDate = this.createDateModelByFormat(checkInText, monthArr, weekDayArr);
            checkOutDate = this.createDateModelByFormat(checkOutText, monthArr, weekDayArr);
            return {
                checkInText: checkInText,
                checkOutText: checkOutText,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate
            };
        },
        createTrainCalendar: function (checkInText, checkOutText, monthArr, weekDayArr) {
            var date = this.createDate(new Date()),
                checkInDate = null,
                checkOutDate = null;

            if (!this.isDateText(checkInText) || !this.isDateText(checkOutText)) {
                checkInText = this.format(date);
                checkOutText = this.format(this.addDay(date));
            } else if (this.isAfter(date, this.createDate(checkInText))) {
                checkInText = this.format(date);
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = checkInText;
                }
            } else {
                if (this.isSameOrAfter(checkInText, checkOutText)) {
                    checkOutText = checkInText;
                }
            }
            checkInDate = this.createDateModelByFormat(checkInText, monthArr, weekDayArr);
            checkOutDate = this.createDateModelByFormat(checkOutText, monthArr, weekDayArr);
            return {
                checkInText: checkInText,
                checkOutText: checkOutText,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate
            };
        }
    };
});