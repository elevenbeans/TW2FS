define(['react', 'dateUtils', 'utility','store', 'Calendar2','popalert2', 'i18n2', 'analytics','loading2',
    'selecttrainaddress2','conmonbutton','ClickBox'],
    function (React, DateUtils, Utility,Store, Calendar, Popalert, I18n, Analytics,Loading,
        Selecttrainaddress,ConmonButton,ClickBox) {
	var KEYS = Store.keys;
	return React.createClass({
		getDefaultProps: function() {
            return {
                show: false,
                weekDayArr: I18n.t_mn_sh_3007.split(','),
                monthArr: I18n.t_mn_sh_3008.split(',').slice(1)
            }
        },
        getInitialState: function() {
            var date = new Date(),
                checkInText = Store.getItem(KEYS.trains.last_depart_date),
                checkInDate = null;

            if (!checkInText || DateUtils.isAfter(date, DateUtils.createDate(checkInText))) {
                checkInText = DateUtils.format(date);
            }
            checkInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr);
            return {
                openLoading:false,
                openAddress: false,
                isOpenFrom: false,
                isHighWayOnly: false,
                fromCityData: Store.getItem(KEYS.trains.last_from_city) || {},
                toCityData: Store.getItem(KEYS.trains.last_to_city) || {},
                checkInDate: checkInDate,
                checkInDateText:  checkInText,
                openCalendar: false
            };
        },
        checkAllowSearch: function () {
            if (!this.state.fromCityData.StationName) {
                this.selectFromCity();
                return false;
            }
            if (!this.state.toCityData.StationName) {
                this.selectToCity();
                return false;
            }
            if (this.state.toCityData.StationName === this.state.fromCityData.StationName) {
                this.setState({
                    confirm: true
                });
                return false;
            }
            return true;
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
        searchTrains: function() {
            var checkInDate = this.state.checkInDate;
            var highwayOnly = this.state.isHighWayOnly?"&TrainType=G":"";
            if (this.checkAllowSearch()) {
                this.goToNewPage('/trains/List/Index?DepartureStation='
                    + this.state.fromCityData.StationNameCn + '&ArrivalStation='
                    + this.state.toCityData.StationNameCn + '&DepartDate=' + DateUtils.formatNum(checkInDate.month) +
                    '-' + DateUtils.formatNum(checkInDate.date) + '-' + checkInDate.year + highwayOnly);
            }
        },
        selectFromCity: function() {
            this.setState({
                openAddress: true,
                isOpenFrom: true,
                searchTitle: I18n.t_mn_sh_3001
            });
        },
        selectToCity: function() {
            this.setState({
                openAddress: true,
                isOpenFrom: false,
                searchTitle: I18n.t_mn_sh_3002
            });
        },
        switchCity: function(e) {
            if (!this.state.fromCityData.StationName) {
                return false;
            }
            if (!this.state.toCityData.StationName) {
                return false;
            }

            $('.train_dcityInfo').addClass('show-result');
            $('.train_acityInfo').addClass('show-result');
            $('.dcityInfo-animate').prepend($('.train_dcityInfo').children().clone())
                                   .addClass('trains-down-running');
            $('.acityInfo-animate').prepend($('.train_acityInfo').children().clone())
                                   .addClass('trains-up-running');
            setTimeout(function(){
                $('.dcityInfo-animate').removeClass('trains-down-running').children().remove();
                $('.acityInfo-animate').removeClass('trains-up-running').children().remove();;
                $('.train_dcityInfo').removeClass('show-result')
                $('.train_acityInfo').removeClass('show-result')
            },300);

            var fromData = this.state.fromCityData;
            Store.setItem(KEYS.trains.last_from_city, this.state.toCityData);
            Store.setItem(KEYS.trains.last_to_city, fromData);
            this.setState({
                fromCityData: this.state.toCityData,
                toCityData: fromData
            });
        },
        switchHighWayOnly:function(){
        	this.setState({
        		isHighWayOnly: !this.state.isHighWayOnly
        	});
        },
        parseData: function(data) {
            return data.TrainStations || data.TrainHotStations || [];
        },
        closeAddress: function() {
            this.setState({
                openAddress: false
            });
        },
        selectAddress: function(data) {
          if (this.state.isOpenFrom) {
              this.setState({
                  openAddress: false,
                  fromCityData: data
              });
              Store.setItem(KEYS.trains.last_from_city, data);
          } else {
              Store.setItem(KEYS.trains.last_to_city, data);
              this.setState({
                  openAddress: false,
                  toCityData: data
              });
          }
        },
        openCalendar: function() {
            this.setState({
                openCalendar: true
            });
        },
        onCalendarChanged: function(data){

        },
        cancelCalendar: function() {
            this.setState({
                openCalendar: false
            });
        },
        selectedDate: function(checkInData) {
            Store.setItem(KEYS.trains.last_depart_date, checkInData.dateFormatStr);
            this.setState({
                checkInDateText: checkInData.dateFormatStr,
                checkInDate: checkInData,
                openCalendar: false
            });
        },
        confirmCallback: function () {
          this.setState({
              confirm: false
          });
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.onHide) {
                this.props.onHide = false;
                this.onHide();
            }
        },
        onHide: function () {
            this.setState({
                openAddress: false,
                openCalendar: false,
                confirm: false
            });
        },
        onShow: function () {
            this.setState({
                openLoading: false
            });
            Analytics.gaPush();
        },
		render:function(){
			return(<div className="srh-shadow"><div className="srh-con srh-train">
					<div className="srh-box">
						<div className="srh-item">
							<div className={this.state.fromCityData.StationName!=null?"srh-opt selected":"srh-opt"}
                                style={{'position':'relative'}}>
								<span className="tit">{I18n.t_mn_sh_3001}</span>
								<div className="dcityInfo-animate" style={{
                                        position: 'absolute',
                                        top:'29px',
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        'white-space': 'nowrap',
                                        'text-overflow':' ellipsis'
                                    }}></div>
                                <div className="train_dcityInfo">
                                    <div className="city" onClick={this.selectFromCity}>
    									{this.state.fromCityData.CityName||this.state.fromCityData.StationName || I18n.c_3029}
    								</div>
    								{this.state.fromCityData.CityName && this.state.fromCityData.StationName &&
    								<span className="code">{this.state.fromCityData.StationName}</span>}
							    </div>
                            </div>
							<div className={this.state.toCityData.StationName!=null?"srh-opt selected":"srh-opt"}
                                style={{'position':'relative'}}>
								<span className="tit">{I18n.t_mn_sh_3002}</span>
								<div className="acityInfo-animate" style={{
                                        position: 'absolute',
                                        top:'29px',
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        'white-space': 'nowrap',
                                        'text-overflow':' ellipsis'
                                    }}></div>
                                <div className="train_acityInfo">
                                    <div className="city" onClick={this.selectToCity}>
    									{this.state.toCityData.CityName || this.state.toCityData.StationName || I18n.c_3029}
    								</div>
    								{this.state.toCityData.CityName && this.state.toCityData.StationName &&
    								<span className="code">{this.state.toCityData.StationName}</span>}
							    </div>
                            </div>
                            <div className="toggle-box" onClick={this.switchCity}>
                                <div className="ic-toggle"></div>
                            </div>
						</div>

						<div className="srh-item">
							<div className="srh-opt selected" onClick={this.openCalendar}>
								<span className="tit">{I18n.t_mn_sh_3003}</span>
                                <div className="date">
                                    <span className="month">{(this.state.checkInDate && !!this.state.checkInDate.monthText)?this.state.checkInDate.monthText:I18n.c_2006}</span>
                                    <span className="day">{Utility.formatDay(this.state.checkInDate.date)}</span>
                                    <span className={this.state.checkInDate.isToday?"week today":"week"}>
                                    {this.state.checkInDate.isToday ? I18n.t_mn_sh_3006 : this.state.checkInDate.dayText}
                                    </span>
                                </div>
							</div>
						</div>
						<div className="srh-item src-only">
							{I18n.t_mn_sh_3004}
							<ConmonButton clickbtncancel={this.switchHighWayOnly} _TransitType={this.state.isHighWayOnly} clickbtnactive={this.switchHighWayOnly}/>
						</div>

						<ClickBox style={{"overflow":"hidden","position":"relative"}} className="srh-item" onClick={this.searchTrains}>
							<button className="c-btn btn-warn">{I18n.t_mn_sh_3005}</button>
						</ClickBox>
					</div>
                    {this.state.openLoading && <Loading needoverlay={1} />}
					{this.state.openAddress && <Selecttrainaddress recentKey={KEYS.trains.recent_from_city}
                                                          hasNearCurLocation={false}
                                                          searchTitle={this.state.searchTitle}
                                                          searchText={this.state.isOpenFrom
                                                                ?(this.state.fromCityData.CityName || this.state.fromCityData.StationName)
                                                                :(this.state.toCityData.CityName || this.state.toCityData.StationName)}
                                                          fetchKeywordURL={restfulApi.trains.getstationbykey}
                                                          fetchTopDestURL={restfulApi.trains.hotstation}
                                                          compareKey="StationName"
                                                          searchKey="key"
                                                          parseDataFunc={this.parseData}
                                                          cancelSelect={this.closeAddress} selectedData={this.selectAddress}/>}
                    {this.state.openCalendar && <Calendar
                        checkInDateText={this.state.checkInDateText}
                        //isAround={true}
                        checkOutDateText={''}
                        inputCheckIn={true}
                        inputCheckOut={false}
                        checkInState={true}
                        checkOutState={false}
                        cancelCalendar={this.cancelCalendar}
                        cancelSelectDate={this.cancelCalendar}
                        displayMonthNum={3}
                        selectedDate={this.selectedDate}
                        rangeState={false}
                        title={I18n.c_3036}
                        inTitle={I18n.t_mn_sh_3003}
                        isTrain={true}
                        callbackParent = {this.onCalendarChanged}
                    />}
					{this.state.confirm && <Popalert clickBtn={this.confirmCallback}
                                                   content={I18n.t_mn_sh_3009}
                                                   btns={[{text: 'OK'}]}/>}
				</div></div>);
		}
	});
})
