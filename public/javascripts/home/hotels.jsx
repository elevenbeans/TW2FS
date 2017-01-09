define(['react','utility','dateUtils','store','Calendar2','i18n2','analytics','loading2',
    'selecthoteladdress2','geo2','popalert2','ClickBox'],
	function (React,Utility, DateUtils,Store,Calendar, I18n,Analytics,Loading,
        Selecthoteladdress,Geo,Popalert,ClickBox) {
		var KEYS = Store.keys;
    var tcheckInDateText = Store.getItem(KEYS.hotels.last_check_in);
    var tcheckOutDateText = Store.getItem(KEYS.hotels.last_check_out);
    var tcheckInDate = {};
    var tcheckOutDate = {time:''};
    if(typeof window['__bfi'] == 'undefined') window['__bfi'] = [];
		return React.createClass({
			     getDefaultProps: function () {
                return {
                    show: false,
                    addDays: 1,
                    weekDayArr: I18n.h_mn_sh_3008.split(','),
                    monthArr: I18n.h_mn_sh_3009.split(',').slice(1),
                    stayingInData: Store.getItem(KEYS.hotels.last_staying_in) || {},
                }
            },
            getInitialState: function () {
                return {
                    showStayingIn: false,
                    openLoading:false,
                    searchNearby: false,
                    showHotelCalender: false,
                    stayingInData: this.props.stayingInData,
                    confirm: false,
                    confirmtxt: 'input invalid',
                    checkInDate: {},
          					checkIn:false,
          					checkOut:false,
                    checkOutDate: {},
                    checkInDateText: Store.getItem(KEYS.hotels.last_check_in) || '2016-12-10',
                    checkOutDateText: Store.getItem(KEYS.hotels.last_check_out) || '2016-12-11',
                    SearchType: 0,
                    DotX: '',
                    DotY: '',
                    star2: false,
                    star3: false,
                    star4: false,
                    star5: false
                };
            },
            stayingInCallback: function (data) {
                //console.log(data);
                Store.setItem(KEYS.hotels.last_staying_in, data);
                this.setState({
                    stayingInData: data
                });
                this.clickStayingIn();
            },
            componentWillReceiveProps: function (nextProps) {
                if (nextProps.onHide) {
                    this.props.onHide = false;
                    this.onHide();
                }
            },
            componentWillMount: function () {
                this.initCalendar();
            },
            componentDidMount:function(){
            },
            initCalendar: function () {
                var date = null,
                    checkInText = this.state.checkInDateText,
                    checkOutText = this.state.checkOutDateText,
                    checkInDate = null,
                    checkOutDate = null;

                if (DateUtils.isAfter(new Date(), DateUtils.createDate(this.state.checkInDateText))) {
                    date = new Date();
                    checkInText = DateUtils.format(date);
                    if (DateUtils.isSameOrAfter(checkInText, this.state.checkOutDateText)) {
                        checkOutText = DateUtils.format(DateUtils.addDay(date));
                    } else {
                        checkOutText = this.state.checkOutDateText;
                    }

                } else {
                    checkInText = this.state.checkInDateText;
                    if (DateUtils.isSameOrAfter(checkInText, this.state.checkOutDateText)) {
                        checkOutText = DateUtils.format(DateUtils.addDay(date));
                    } else {
                        checkOutText = this.state.checkOutDateText;
                    }
                }
                checkInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr);
                checkOutDate = DateUtils.createDateModelByFormat(checkOutText, this.props.monthArr, this.props.weekDayArr);
                tcheckInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr);
                tcheckOutDate = DateUtils.createDateModelByFormat(checkOutText, this.props.monthArr, this.props.weekDayArr);
                this.setState({
                    checkInDateText: checkInText,
                    checkOutDateText: checkOutText,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate
                });
            },
            clickStayingIn: function () {
              this.setState({
                showStayingIn: !this.state.showStayingIn
              });
            },
            clickCheckIn: function () {
              this.setState({
                checkIn: true,
                checkOut: false,
                calendarTitle: I18n.h_mn_sh_3002,
                showHotelCalender: true
              });
            },
            clickStarList:function(star){
                var star2 = this.state.star2,
                    star3 =  this.state.star3,
                    star4 = this.state.star4,
                    star5 = this.state.star5;
                switch(star){
                    case 2:
                        star2 = !star2;
                        break;
                    case 3:
                        star3 = !star3;
                        break;
                    case 4:
                        star4 = !star4;
                        break;
                    case 5:
                        star5 = !star5;
                        break;
                }
                this.setState({
                    star2: star2,
                    star3: star3,
                    star4: star4,
                    star5: star5
                });
            },
            onShow: function () {
                this.setState({
                    openLoading: false
                });
                Analytics.gaPush();
            },
            onHide: function () {
                this.setState({
                    showStayingIn: false,
                    showHotelCalender: false
                });
            },
            clickCheckOut: function () {
              this.setState({
                checkIn: false,
                checkOut: true,
                calendarTitle: I18n.h_mn_sh_3003,
                showHotelCalender: true
              });
            },
      			onCalendarChanged: function(data){
      				this.setState({
      					checkIn:data,
      					checkOut:!data
      				});
      			},
            cancelCalendar: function (isCheckIn,isconfirm) {
							if(!isCheckIn){
                  this.setState({
                    showHotelCalender: false
                  });
							}
              if(isconfirm){
                tcheckInDate = this.state.checkInDate;
                tcheckOutDate = this.state.checkOutDate;
                tcheckInDateText = this.state.checkInDateText;
                tcheckOutDateText = this.state.checkOutDateText;
              }
            },
            selectedDate: function (checkInData, checkOutData, isCheckIn) {
                Store.setItem(KEYS.hotels.last_check_in, checkInData.dateFormatStr);
                Store.setItem(KEYS.hotels.last_check_out, checkOutData.dateFormatStr);
                this.setState({
                    checkInDateText: checkInData.dateFormatStr,
                    checkOutDateText: checkOutData.dateFormatStr,
                    checkInDate: checkInData,
                    checkOutDate: checkOutData
                });
        				var _self =this;
        				setTimeout(function(){
        					_self.cancelCalendar(isCheckIn,!isCheckIn);
        				},500)
            },
            cancelSelectDate: function(){
                this.setState({
                  checkInDateText: tcheckInDateText,
                  checkOutDateText: tcheckOutDateText,
                  checkInDate: tcheckInDate,
                  checkOutDate: tcheckOutDate
                });
                this.cancelCalendar(false,false);
            },
            confirmCallback: function (data) {
                //console.log(data);
                this.setState({
                    confirm: false
                });
            },
            goToNewPage:function(newUrl){
                this.setState({
                    openLoading:true
                },function(){
                    var _self = this;
                    setTimeout(function(){
                        _self.setState({
                            openLoading:false
                        });
                        window.location.href = newUrl;
                    },300)
                });
            },
            searchHotels: function (e) {
                var _starID='';
                if(this.state.star2) _starID+='1,2,';
                if(this.state.star3) _starID+='3,';
                if(this.state.star4) _starID+='4,';
                if(this.state.star5) _starID+='5';

                if(_starID.charAt(_starID.length-1)==','){
                    _starID = _starID.substring(0,_starID.length-1);
                }
                if(this.state.DotX==0&&this.state.DotY==0){
                    if(!(this.state.stayingInData.CityENname
                        && this.state.stayingInData.CityID)){
                        this.setState({
                            confirm: true,
                            confirmtxt: I18n.c_3035
                        });
                        return false;
                    }
                }
                if(tcheckOutDateText=='NaN-NaN-NaN'){
                    this.setState({
                        confirm: true,
                        confirmtxt: I18n.h_sh_tl_2002 || '请填写退房日期'
                    });
                    return false;
                }
                if (this.state.stayingInData.CityENname && this.state.stayingInData.CityID) {
                    this.state.stayingInData.checkIn = this.state.checkInDate.dateFormatStr;
                    this.state.stayingInData.checkOut = this.state.checkOutDate.dateFormatStr;
                    Store.saveSearchedHotels(this.state.stayingInData);
                    if(this.state.stayingInData.Itemtype==6){
                        this.goToNewPage(Utility.format('/m/hotels/{0}-hotel-detail-{1}/{2}/?cityid={3}&hotelname={4}&checkin={5}&checkout={6}&cityname={7}',
                        this.state.stayingInData.CityENname.replace(/\s/g, '').toLowerCase(), this.state.stayingInData.HotelID,
                        this.state.stayingInData.HotelEnName.toLowerCase(), this.state.stayingInData.CityID, this.state.stayingInData.HotelName,
                        this.state.checkInDate.dateFormatStr, this.state.checkOutDate.dateFormatStr, this.state.stayingInData.CityENname));
                    } else {
                        this.goToNewPage(Utility.format('/m/hotels/{0}-hotels-list-{1}/?IsAround={2}&citytype={3}&hotelname={4}&checkin={5}&checkout={6}&cityname={7}&starID={8}',
                        this.state.stayingInData.CityENname.replace(/\s/g, '').toLowerCase(), this.state.stayingInData.CityID, 0, this.state.stayingInData.IsInternational, '',
                        this.state.checkInDate.dateFormatStr, this.state.checkOutDate.dateFormatStr, this.state.stayingInData.CityName,_starID));
                    }
                    //增加埋点
                    if(typeof window['__bfi'] == 'undefined') window['__bfi'] = [];
                    var browserInfor=Utility.getbBrowserInfor();
                    window['__bfi'].push(['_tracklog', '100192', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0037+"&stayin="+this.state.stayingInData.CityENname]);
                    window['__bfi'].push(['_tracklog', '100193', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0037+"&checkin="+this.state.stayingInData.checkIn]);
                    window['__bfi'].push(['_tracklog', '100194', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0037+"&checkout="+this.state.stayingInData.checkOut]);
                } else {
                    this.goToNewPage(Utility.format('/m/hotels/list/?IsAround={0}&DotX={1}&DotY={2}&checkin={3}&checkout={4}&SearchType={5}',
                    1, this.state.DotX, this.state.DotY,
                    this.state.checkInDate.dateFormatStr,
                    this.state.checkOutDate.dateFormatStr,
                    this.state.SearchType));
                }
            },
            searchNearbyTonight: function () {
                var _self = this,
                date = new Date(),
                checkInText = DateUtils.format(date),
                checkOutText = DateUtils.format(DateUtils.addDay(date)),
                checkInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr),
                checkOutDate = DateUtils.createDateModelByFormat(checkOutText, this.props.monthArr, this.props.weekDayArr);
                this.GeoHandle(function(){
                    _self.goToNewPage(Utility.format('/m/hotels/list/?IsAround={0}&DotX={1}&DotY={2}&checkin={3}&checkout={4}&SearchType={5}',
                    1,
                    _self.state.DotX,
                    _self.state.DotY,
                    checkInDate.dateFormatStr,
                    checkOutDate.dateFormatStr,
                    _self.state.SearchType));
                });
            },
            getPosition:function(){
                this.setState({
                    searchNearby:true
                },function(){
                    var _self = this;
                    this.GeoHandle(function(){
                        _self.setState({
                            searchNearby: false,
                            stayingInData: {
                                CityName: I18n.h_mn_sh_3007
                            }
                        });
                    });
                });
            },
            GeoHandle: function (callback) {
                Geo.getCurrentPosition(function (data) {
                    if (data.isCN) {
                        this.setState({
                            DotX: data.coords.latitude,
                            DotY: data.coords.longitude,
                            SearchType: 0
                        });
                    } else {
                        this.setState({
                            DotX: data.coords.latitude,
                            DotY: data.coords.longitude,
                            SearchType: 1
                        });
                    }
                    if(callback) callback();
                }.bind(this), function () {
                    this.setState({
                        searchNearby: false,
                        stayingInData: {
                            CityName: '',
                            CityID: 0
                        },
                        confirm: true,
                        confirmtxt: I18n.h_mn_sh_3011
                    });
                }.bind(this));
            },
			render:function(){
				// console.log(this.state.checkInDate);
				// console.log(this.state.checkOutDate);
				return(<div><div className="srh-shadow">
                <div className="srh-con srh-hotel">
      						<div className="srh-box">
      							<div className="srh-item">
      								<div className={this.state.stayingInData.CityName?"srh-opt selected":"srh-opt"} onClick={this.clickStayingIn}>
      									<span className="tit">{I18n.h_mn_sh_3001}</span>
      									<div className="city">
                                              {!this.state.searchNearby && (this.state.stayingInData.CityName || I18n.c_3029)}
                                              {this.state.searchNearby &&
                                                  <span className="loader-box loader-box-blue">
                                                      <svg className="circular" viewBox="0 0 50 50">
                                                          <circle cx="25" cy="25" r="20" fill="none" stroke-linecap="round"></circle>
                                                      </svg>
                                                  </span>}
                                              {this.state.searchNearby && I18n.c_3034}
                                          </div>
      									{this.state.stayingInData.Note && <span className="code">{this.state.stayingInData.Note}</span>}
      								</div>
      								<div className="ic-location" onClick={this.getPosition}></div>
      							</div>
      							<div className="srh-item srh-flex">
      								<div className="srh-opt selected"  onClick={this.clickCheckIn}>
      									<span className="tit">{I18n.h_mn_sh_3002}</span>
                                          <div className="date">
                                              <span className="month">{(this.state.checkInDate && !!this.state.checkInDate.monthText)?this.state.checkInDate.monthText:I18n.f_mn_sh_3026}</span>
                                              <span className="day">{Utility.formatDay(this.state.checkInDate.date)}</span>
                                              <span className={this.state.checkInDate.isToday?"week today":"week"}>
                                              {this.state.checkInDate.isToday ? I18n.h_mn_sh_3010 : this.state.checkInDate.dayText}
                                              </span>
                                          </div>
      								</div>
      								<div className={"srh-opt "+((this.state.checkOutDate && !!this.state.checkOutDate.date)?" selected":"")} onClick={this.clickCheckOut}>
      									<span className="tit">{I18n.h_mn_sh_3003}</span>
                                          <div className="date">
                                              <span className="month">{(this.state.checkOutDate && !!this.state.checkOutDate.monthText)?this.state.checkOutDate.monthText:I18n.f_mn_sh_3026}</span>
                                              <span className="day">{Utility.formatDay(this.state.checkOutDate.date)}</span>
                                              <span className={this.state.checkOutDate.isToday?"week today":"week"}>
                                              {this.state.checkOutDate.isToday ? I18n.h_mn_sh_3010 : this.state.checkOutDate.dayText}
                                              </span>
                                          </div>
      								</div>
      							</div>
      							<div className="srh-item">
      								<span className="tit">{I18n.h_mn_sh_3004}</span>
      								<div className="star-opt">
      									<div className={this.state.star2?"star-level active":"star-level"}
                                              onClick={this.clickStarList.bind(null,2)}>
                                              ≤2<input type="checkbox"/>
                                              <i className="i-icon ic-star-outline"></i>
                                          </div>
      									<div className={this.state.star3?"star-level active":"star-level"}
                                              onClick={this.clickStarList.bind(null,3)}>
                                              3<input type="checkbox"/>
                                              <i className="i-icon ic-star-outline"></i>
                                          </div>
      									<div className={this.state.star4?"star-level active":"star-level"}
                                              onClick={this.clickStarList.bind(null,4)}>
                                              4<input type="checkbox"/>
                                              <i className="i-icon ic-star-outline"></i>
                                          </div>
      									<div className={this.state.star5?"star-level active":"star-level"}
                                              onClick={this.clickStarList.bind(null,5)}>
                                              5<input type="checkbox"/>
                                              <i className="i-icon ic-star-outline"></i>
                                          </div>
      								</div>
      							</div>
      							<ClickBox className="srh-item" onClick={this.searchHotels}>
      								<button className="c-btn btn-warn">{I18n.h_mn_sh_3005}</button>
      							</ClickBox>
      						</div>
                    {this.state.openLoading && <Loading needoverlay={1} />}
        						{this.state.showStayingIn && <Selecthoteladdress cancelSelect={this.clickStayingIn}
                                             selectedData={this.stayingInCallback}
                                             checkIn={this.state.checkInDateText}
                                             checkOut={this.state.checkOutDateText}
                                             searchText={this.state.stayingInData.CityName}
                                             searchTitle={I18n.h_mn_sh_3001}
                        />}
                    {this.state.confirm && <Popalert clickBtn={this.confirmCallback}
                                                   content={this.state.confirmtxt}
                                                   btns={[{text: "OK"}]} />}
        						{this.state.showHotelCalender && <Calendar
        							//当前选择的日期
        							checkInDateText={this.state.checkInDateText}
        							checkOutDateText={this.state.checkOutDateText}
        							checkInState={true}
        							checkOutState={true}
        							rangeState={true}
        							inputCheckIn={this.state.checkIn?true:false}
        							inputCheckOut={this.state.checkIn?false:true}
        							cancelCalendar={this.cancelCalendar}
        							selectedDate={this.selectedDate}
                      cancelSelectDate={this.cancelSelectDate}
        							displayMonthNum={12}
        							title={I18n.c_3036}
        							inTitle={I18n.h_mn_sh_3002}
        							outTitle={I18n.h_mn_sh_3003}
        							isHotel={true}
        							isAround={true}
        							callbackParent = {this.onCalendarChanged}
        						/>}
					      </div>
              </div>
          <ClickBox style={{"overflow":"hidden","position":"relative"}} className="srh-box nearby-hotel" onClick={this.searchNearbyTonight}>
            <i className="i-icon ic-place"></i>{I18n.h_mn_sh_3006}
          </ClickBox></div>);
		}
	});
})
