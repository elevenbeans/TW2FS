import {Component} from 'react';



import Selectflightaddress from 'selectflightaddress';
import Selectpassengertype from 'selectpassengertype';
import Popalert from 'popalert';
import Loading from 'loading';
import Utility from 'utility';
import dateUtils from 'dateUtils';
//import Store from 'store';
import Calendar from 'Calendar';
import I18n from 'i18n';
import Analytics from 'analytic';
import ClickBox from 'clickBox';

class Flights extends Component {
    render(){
        return(<div style={{'overflow-x':'hidden'}}>
                    Flights
                <div>
                    <Link to="/flight" >go to flight</Link>
                </div>

                    {/*<Appbanner htmls="dasd"/>
                        <Header pageType={0} isToHome={1} />
                        <Pagetab onTabChange={this.pageTabChange} tabIndex={this.state.channelIndex}
                    tabData={this.state.tabData}
                    onHide={this.state.onHide} />
            <Footer />*/}
                    </div>
                    );
    }
}

export default Flights;

// define(['react','selectflightaddress2','selectpassengertype2','popalert2','loading2', 'utility', 'dateUtils',
//     'store','Calendar2', 'i18n2','analytics','ClickBox'],
// 	function (Selectflightaddress,Selectpassengertype,Popalert,Loading,Utility, DateUtils,
//         Store,Calendar, I18n, Analytics, ClickBox) {

// 		if(typeof window['__bfi'] == 'undefined') window['__bfi'] = [];
//         var browserInfor=Utility.getbBrowserInfor();
//         var KEYS = Store.keys;
//         var tcheckInDateText = Store.getItem(KEYS.flights.last_depart_date);
//         var tcheckOutDateText = Store.getItem(KEYS.flights.last_return_date);
//         var tcheckInDate = {};
//         var tcheckOutDate = {};
//         return React.createClass({
//             getDefaultProps: function () {
//                 return {
//                     today: I18n.f_mn_sh_3009,
//                     addDays: 1,
//                     weekDayArr: I18n.f_mn_sh_3010.split(','),
//                     monthArr: I18n.f_mn_sh_3011.split(',').slice(1),
//                     show: false
//                 }
//             },
//             getInitialState: function() {
//                 var classIndex = Store.getItem(KEYS.flights.last_class) || 0,
//                     classData = [
//                         {text: I18n.f_mn_sh_3003, value: 0},
//                         {text: I18n.f_mn_sh_3004, value: 2},
//                         {text: I18n.f_mn_sh_3005, value: 3}],
//                     passengerData = {
//                         Adult:Store.getItem(KEYS.chinaflights.added_adult)||1,
//                         Child:Store.getItem(KEYS.chinaflights.added_child)||0,
//                         Infant:Store.getItem(KEYS.chinaflights.added_infant)||0
//                     };

//                 return {
//                     roundTrip: true,
//                     showAddress: false,
//                     showCalendar: false,
//                     isFromCity: true,
//                     fromCityData: Store.getItem(KEYS.flights.last_from_city) || {},
//                     toCityData: Store.getItem(KEYS.flights.last_to_city) || {},
//                     checkInDateText: Store.getItem(KEYS.flights.last_depart_date) || '',
//                     checkOutDateText: Store.getItem(KEYS.flights.last_return_date) || '',
//                     checkInDate:{},
//                     checkOutDate:{},
//                     checkInState: true,
//                     checkOutState: true,
//                     classIndex: classIndex,
//                     selectClassData: classData[classIndex],
//                     classData: classData,
//                     confirm: false,
//                     confirmtxt: 'input invalid',
//                     showPassengerType: false,
//                     passengerData: passengerData,
//                     openLoading: false,
//                     tabhandleclick:false
//                 };
//             },
//             componentWillMount: function () {
//                 var index = Store.getFlightRoundType();
//                 this.setState({
//                     roundTrip: index ? false : true,
//                     checkOutState: index ? false : true
//                 });
//                 this.initCalendar();
//             },
//             componentDidMount:function(){

//             },
//             componentWillReceiveProps: function (nextProps) {
//                 if (nextProps.onHide) {
//                     this.props.onHide = false;
//                     this.onHide();
//                 }
//             },
//             initCalendar: function () {
//                 var date = null,
//                     checkInText = null,
//                     checkOutText = null,
//                     checkInDate = null,
//                     checkOutDate = null;
//                 if (DateUtils.isAfter(new Date(), DateUtils.createDate(this.state.checkInDateText))) {
//                     date = new Date();
//                     checkInText = DateUtils.format(date);
//                     if (DateUtils.isSameOrAfter(checkInText, this.state.checkOutDateText)) {
//                         checkOutText = checkInText;
//                     } else {
//                         checkOutText = this.state.checkOutDateText;
//                     }
//                 } else {
//                     checkInText = this.state.checkInDateText;
//                     if (DateUtils.isSameOrAfter(checkInText, this.state.checkOutDateText)) {
//                         checkOutText = checkInText;
//                     } else {
//                         checkOutText = this.state.checkOutDateText;
//                     }
//                 }
//                 checkInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr);
//                 checkOutDate = DateUtils.createDateModelByFormat(checkOutText, this.props.monthArr, this.props.weekDayArr);

//                 tcheckInDate = DateUtils.createDateModelByFormat(checkInText, this.props.monthArr, this.props.weekDayArr);
//                 tcheckOutDate = DateUtils.createDateModelByFormat(checkOutText, this.props.monthArr, this.props.weekDayArr);

//                 this.setState({
//                     checkInDateText: checkInText,
//                     checkOutDateText: checkOutText,
//                     checkInDate: checkInDate,
//                     checkOutDate: checkOutDate
//                 });
//             },
//             componentDidUpdate:function(){
//                 setTimeout(function(){
//                     if($("#tabtransition").hasClass("tab-left-active")){
//                         $("#tabtransition").removeClass("tab-left-active");
//                     }
//                     if($("#tabtransition").hasClass("tab-right-active")){
//                         $("#tabtransition").removeClass("tab-right-active")
//                     }

//                     if($("#tabchengetransition").hasClass("right-to-left")){
//                         $("#tabchengetransition").removeClass("right-to-left");

//                     }
//                     if($("#tabchengetransition").hasClass("left-to-right")){
//                         $("#tabchengetransition").removeClass("left-to-right")
//                     }
//                 },600)
//                 if(this.state.roundTrip){
//                     $("#tabtransition").css({left:0,right:'auto',color:'#fff'});
//                     $("#tabchengetransition").css({left:'0'});
//                 }
//                 if(!this.state.roundTrip){
//                     $("#tabtransition").css({right:0,left:'auto',color:'#fff'});
//                     $("#tabchengetransition").css({left:'100%'});
//                 }
//             },
//             pageTabChange: function (index) {
//                 Store.saveFlightRoundType(index);
//                 this.setState({
//                     roundTrip: index ? false : true,
//                     checkOutState: index ? false : true,
//                     tabhandleclick:true
//                 });
//             },
//             selectFromCity: function () {
//                 this.setState({
//                     isFromCity: true,
//                     selectTopType: true,
//                     searchTitle: I18n.f_mn_sh_3015,
//                     showAddress: true
//                 });
//             },
//             selectToCity: function () {
//                 this.setState({
//                     isFromCity: false,
//                     selectTopType: false,
//                     searchTitle: I18n.f_mn_sh_3016,
//                     showAddress: true
//                 });
//             },
//             cancelSelectCity: function () {
//                 this.setState({
//                     showAddress: false
//                 });
//             },
//             selectedDataCallback: function (data) {
//                 if (this.state.isFromCity) {
//                     this.setState({
//                         fromCityData: data,
//                         showAddress: false
//                     },function(){
//                         Store.setItem(KEYS.flights.last_from_city, data);
//                         var _this=this;
//                         /*setTimeout(function(){
//                             _this.selectToCity();
//                         },800);*/
//                     });
//                 } else {
//                     this.setState({
//                         toCityData: data,
//                         showAddress: false
//                     },function(){
//                         Store.setItem(KEYS.flights.last_to_city, data);
//                         //var _this=this;
//                         /*setTimeout(function(){
//                             if(_this.state.checkInDateText==""
//                                 ||_this.state.checkInDateText==null){
//                                 _this.clickDepartDate();
//                             }
//                         },800);*/
//                     });
//                 }
//             },
//             cancelCalendar: function (isCheckIn,isconfirm,isSingle) {
// 				if(!isCheckIn || !this.state.roundTrip){
// 	                this.setState({
// 	                    showCalendar: false
// 	                });
//                 }
//                 if(isconfirm || isSingle){
//                   tcheckInDate = this.state.checkInDate;
//                   tcheckOutDate = this.state.checkOutDate;
//                   tcheckInDateText = this.state.checkInDateText;
//                   tcheckOutDateText = this.state.checkOutDateText;
//                 }
//             },
//             cancelSelectDate: function(){
//                 this.setState({
//                   checkInDateText: tcheckInDateText,
//                   checkOutDateText: tcheckOutDateText,
//                   checkInDate: tcheckInDate,
//                   checkOutDate: tcheckOutDate
//                 });
//                 this.cancelCalendar(false,false);
//             },
//             selectedDate: function (checkInData, checkOutData, isCheckIn) {
//                 Store.setItem(KEYS.flights.last_depart_date, checkInData.dateFormatStr);
//                 Store.setItem(KEYS.flights.last_return_date, checkOutData.dateFormatStr);

//                 this.setState({
//                     checkInDateText: checkInData.dateFormatStr,
//                     checkOutDateText: checkOutData.dateFormatStr,
//                     checkInDate: checkInData,
//                     checkOutDate: checkOutData
//                 });
// 				var _self = this;
// 				setTimeout(function(){
// 					_self.cancelCalendar(isCheckIn,!isCheckIn,!_self.state.roundTrip);
// 				},500);
//             },
//             clickDepartDate: function () {
//                 this.setState({
//                     showCalendar: true,
//                     calendarTitle: I18n.f_mn_sh_3007,
//                     isDepartDate: true
//                 });
//             },
//             clickReturnDate: function () {
//                 this.setState({
//                     showCalendar: true,
//                     calendarTitle: I18n.f_mn_sh_3008,
//                     isDepartDate: false
//                 });
//             },
//   			onCalendarChanged: function(data){
//   				this.setState({
//   					isDepartDate:data,
//   				});
//   			},

//             switchCity: function () {
//                 if (!this.state.fromCityData.CityName) {
//                     return false;
//                 }
//                 if (!this.state.toCityData.CityName) {
//                     return false;
//                 }
//                 $('.dcityInfo').addClass('show-result');
//                 $('.acityInfo').addClass('show-result');
//                 $('.dcityInfo-animate').prepend($('.dcityInfo').children().clone())
//                                        .addClass('down-running');
//                 $('.acityInfo-animate').prepend($('.acityInfo').children().clone())
//                                        .addClass('up-running');
//                 setTimeout(function(){
//                     $('.dcityInfo-animate').removeClass('down-running').children().remove();
//                     $('.acityInfo-animate').removeClass('up-running').children().remove();;
//                     $('.dcityInfo').removeClass('show-result')
//                     $('.acityInfo').removeClass('show-result')
//                 },300);

//                 this.setState({
//                     fromCityData: this.state.toCityData,
//                     toCityData: this.state.fromCityData
//                 });

//                 Store.setItem(KEYS.flights.last_from_city, this.state.fromCityData);
//                 Store.setItem(KEYS.flights.last_to_city, this.state.toCityData);

//             },
//             classChange: function () {
//                 var _selectClassData = this.state.selectClassData;
//                 var _classIndex = this.state.classIndex;
//                 switch(_selectClassData.value){
//                 	case 0:
//                 		_selectClassData = this.state.classData[1];
//                 		_classIndex = 1;
//                 		Store.setItem(KEYS.flights.last_class, 1);
//                 		break;
//                 	case 2:
//                 		_selectClassData = this.state.classData[2];
//                 		_classIndex = 2;
//                 		Store.setItem(KEYS.flights.last_class, 2);
//                 		break;
//                 	case 3:
//                 		_selectClassData = this.state.classData[0];
//                 		_classIndex = 0;
//                 		Store.setItem(KEYS.flights.last_class, 0);
//                 		break;
//                 }


//                 $('.activescroll').addClass("active-scroll");
//                 $('.upscroll').addClass("up-scroll")
//                               .text(this.state.selectClassData.text);

//                 this.setState({
//                     classIndex: _classIndex,
//                     showSelectClass: false,
//                     selectClassData: _selectClassData
//                 },function(){
//                     $('.downscroll').addClass("down-scroll")
//                                     .text(this.state.selectClassData.text);
//                 });

//                 setTimeout(function(){
//                     $('.upscroll').removeClass('up-scroll')
//                                   .text('');
//                     $('.downscroll').removeClass('down-scroll')
//                                     .text('');
//                     $('.activescroll').removeClass("active-scroll");
//                 },300);

//             },
//             CancelSelectPassenger:function(){
//             	this.setState({
//             		showPassengerType: false
//             	});
//             },
//             ChangePassgerType:function(){
//             	this.setState({
//             		showPassengerType: true
//             	});
//             },
//             ChangePassgerTypeCallBack:function(data){
// 				this.setState({
//             		showPassengerType: false,
//             		passengerData: data
//             	});
//             },
//             showConfirm: function (confirmtxt) {
//                 this.setState({
//                     confirm: true,
//                     confirmtxt: confirmtxt
//                 });
//             },
//             confirmCallback: function (data) {
//                 this.setState({
//                     confirm: false
//                 });
//             },
//             CityDataValide: function (data) {
//                 if (data) {
//                     return data.CityCode && data.CityENname;
//                 }
//                 var fromCityData = this.state.fromCityData,
//                     toCityData = this.state.toCityData;
//                 if (toCityData.CityCode && toCityData.CityENname) {
//                     if (fromCityData.CityCode && fromCityData.CityENname
//                         && toCityData.CityCode !== fromCityData.CityCode) {
//                         return true;
//                     }
//                     return false;
//                 } else {
//                     return fromCityData.CityCode && fromCityData.CityENname;
//                 }
//             },
//             goToNewPage:function(newUrl){
//                 this.setState({
//                     openLoading:true
//                 },function(){
//                 var _self = this;
//                     setTimeout(function(){
//                         _self.setState({
//                             openLoading:false
//                         });
//                         window.location.href = newUrl;
//                     },300)
//                 });
//             },
//             searchFilghts: function () {
//                 var fromCityData = this.state.fromCityData,
//                     toCityData = this.state.toCityData,
//                     flightType = 'chinaflights',
//                     departDate = this.state.checkInDateText,
//                     returnDate = this.state.checkOutDateText;

//                 if (!this.CityDataValide(fromCityData)) {
//                     this.showConfirm(I18n.c_3037);
//                     return false;
//                 }
//                 if (!this.CityDataValide(toCityData)) {
//                     this.showConfirm(I18n.c_3038);
//                     return false;
//                 }
//                 if (!this.CityDataValide()) {
//                     this.showConfirm(I18n.f_mn_sh_3014);
//                     return false;
//                 }
//                 if (fromCityData.IsInternatinal === 1 || toCityData.IsInternatinal === 1) {
//                     flightType = 'flights';
//                 }
//                 if(departDate==""||departDate=="NaN-NaN-NaN"){
//                     this.showConfirm(I18n.f_mn_sh_3023);
//                     return false;
//                 }
//                 if((returnDate==""||returnDate=="NaN-NaN-NaN") && this.state.roundTrip){
//                     this.showConfirm(I18n.f_mn_sh_3024);
//                     return false;
//                 }

//                 Store.setItem(KEYS.flights.last_from_city, this.state.fromCityData);
//                 Store.setItem(KEYS.flights.last_to_city, this.state.toCityData);

//                 Store.setItem(KEYS.chinaflights.added_adult, this.state.passengerData.Adult);
//                 Store.setItem(KEYS.chinaflights.added_child, this.state.passengerData.Child);
//                 Store.setItem(KEYS.chinaflights.added_infant, this.state.passengerData.Infant);
//                 Store.setItem(KEYS.flights.added_adult, this.state.passengerData.Adult);
//                 Store.setItem(KEYS.flights.added_child, this.state.passengerData.Child);
//                 Store.setItem(KEYS.flights.added_infant, this.state.passengerData.Infant);

//                 this.goToNewPage(Utility.format('/m/{0}/{1}-to-{2}/{3}-{4}/?ddate={5}' +
//                         '&dcitycode={6}&adate={7}&acitycode={8}' +
//                         '&classtype={9}&triptype={10}&dcity={11}&acity={12}&dairportcode={13}&aairportcode={14}'
//                         +'&Adult={15}&Child={16}&Infant={17}',
//                     flightType,
//                     fromCityData.CityENname.toLowerCase(),
//                     toCityData.CityENname.toLowerCase(),
//                     fromCityData.CityCode.toLowerCase(),
//                     toCityData.CityCode.toLowerCase(),
//                     this.state.checkInDateText,
//                     this.state.fromCityData.CityCode,
//                     this.state.checkOutDateText,
//                     this.state.toCityData.CityCode,
//                     this.state.selectClassData.value,
//                     this.state.roundTrip ? 1 : 0,
//                     fromCityData.CityName,
//                     toCityData.CityName,
//                     (fromCityData.AirportCode ? fromCityData.AirportCode : 'all').toLowerCase(),
//                     (toCityData.AirportCode ? toCityData.AirportCode : 'all').toLowerCase(),
//                     this.state.passengerData.Adult,
//                     this.state.passengerData.Child,
//                     this.state.passengerData.Infant)
//                 );

//                 Store.saveSearchedFlights({
//                     flightType: flightType,
//                     fromCityENname: fromCityData.CityENname,
//                     toCityENname: toCityData.CityENname,
//                     checkInDateText: this.state.checkInDateText,
//                     checkOutDateText: this.state.checkOutDateText,
//                     fromCityCode: fromCityData.CityCode,
//                     toCityCode: toCityData.CityCode,
//                     classCode: this.state.selectClassData.value,
//                     fromCityName: fromCityData.CityName,
//                     toCityName: toCityData.CityName,
//                     roundTrip: this.state.roundTrip ? 1 : 0,
//                     dAirportCode: (fromCityData.AirportCode ? fromCityData.AirportCode : 'all').toLowerCase(),
//                     aAirportCode: (toCityData.AirportCode ? toCityData.AirportCode : 'all').toLowerCase()
//                 });


//                 if(!this.state.roundTrip){
//                     //增加机票搜索埋点 （单程）
//                     window['__bfi'].push(['_tracklog', '100212', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0016+"&sCity="+fromCityData.CityENname]);
//                     window['__bfi'].push(['_tracklog', '100213', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0016+"&eCity="+toCityData.CityENname]);
//                     window['__bfi'].push(['_tracklog', '100214', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0016+"&sCity="+this.state.checkInDateText]);
//                     window['__bfi'].push(['_tracklog', '100216', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0016+"&class="+this.state.selectClassData.text]);
//                 }else{
//                     //增加机票搜索埋点 （往程
//                     window['__bfi'].push(['_tracklog', '100212', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0017+"&sCity="+fromCityData.CityENname]);
//                     window['__bfi'].push(['_tracklog', '100213', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0017+"&eCity="+toCityData.CityENname]);
//                     window['__bfi'].push(['_tracklog', '100214', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0017+"&sCity="+this.state.checkInDateText]);
//                     window['__bfi'].push(['_tracklog', '100215', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0017+"&eCity="+this.state.checkOutDateText]);
//                     window['__bfi'].push(['_tracklog', '100216', "c_language="+restfulApi.APPLANGSFFX+"&c_uid="+restfulApi.UID+"&c_device_type="+browserInfor+"&c_pageid="+I18n.Page_ID_0017+"&class="+this.state.selectClassData.text]);
//                 }
//             },
//             onHide: function () {
//                 this.setState({
//                     confirm: false,
//                     showCalendar: false,
//                     showAddress: false
//                 });
//             },
//             onShow: function () {
//                 this.setState({
//                     openLoading: false
//                 });
//                 Analytics.gaPush();
//             },
//             clickPassengerMinus:function(){
//                 var _passengerData = this.state.passengerData;
//                 _passengerData.Adult-=1;
//                 if(_passengerData.Adult<1){
//                     _passengerData.Adult=1;
//                 }
//                 this.setState({
//                     passengerData:_passengerData
//                 });
//             },
//             clickPassengerPlus:function(){
//                 var _passengerData = this.state.passengerData;
//                 _passengerData.Adult+=1;
//                 if(_passengerData.Adult>=9){
//                     _passengerData.Adult=9;
//                 }
//                 this.setState({
//                     passengerData:_passengerData
//                 });
//             },
// 			render:function(){
//                 if(Store.getFlightRoundType){
//                     var index = Store.getFlightRoundType();

//                 }
// 				return(<div className="srh-shadow"><div className="srh-con srh-flight" style={{'overflow-x':'hidden'}}>
// 						<div className="srh-box">
// 							<div className="m-tab"  style={{position: 'relative',height:'35px'}}>
//                                 <i id="tabtransition" className={this.state.tabhandleclick||~~index==1||~~index==0?(this.state.roundTrip?"tab-left-active":"tab-right-active"):''}
//                                    style={{
//                                     'position':'absolute',
//                                     'z-index': 1,
//                                     'height':'35px',
//                                     'width':'50%',
//                                     'border-radius':'3px',
//                                     'background':'#0288d1'
//                                 }}></i>
// 								<div onClick={this.pageTabChange.bind(null,0)}
//                                      className="tab-cell tab-cell-left"
//                                      style={{position:'absolute',
//                                         'left': 0,
//                                         'z-index': 3,
//                                         'color': this.state.roundTrip?'rgba(255,255,255,1)':''}} >
//                                     {I18n.f_mn_sh_3001}</div>
// 								<div onClick={this.pageTabChange.bind(null,1)}
//                                      className="tab-cell tab-cell-right"
//                                      style={{position:'absolute',
//                                         'right': 0,
//                                         'z-index': 3,
//                                         'color': !this.state.roundTrip?'rgba(255,255,255,1)':''}} >
//                                     {I18n.f_mn_sh_3002}</div>
// 							</div>

//               <div className="srh-item">
//                   <div className={this.state.fromCityData.CityName?"srh-opt selected":"srh-opt"}
//                       style={{'position':'relative'}}
//                       onClick={this.selectFromCity}>
//                       <span className="tit">{I18n.f_mn_sh_3015}</span>
//                       <div className="dcityInfo-animate" style={{
//                           'position': 'absolute',
//                           'top':'29px',
//                           'display': 'inline-block',
//                           'width': '100%',
//                           'overflow': 'hidden',
//                           'white-space': 'nowrap',
//                           'text-overflow':' ellipsis'
//                       }}></div>
//                       <div className="dcityInfo">
//                           <div className="city">
//                               {this.state.fromCityData.CityName || I18n.c_3030}
//                               {this.state.fromCityData.AirportCode && this.state.fromCityData.AirportCode.toUpperCase()!="ALL" ? ' (' + this.state.fromCityData.AirportCode +')' : ''}
//                           </div>
//                           {this.state.fromCityData.AirportName &&
//                             <span className="code">{this.state.fromCityData.AirportName}</span>}
//                       </div>
//                   </div>
//                   <div className={this.state.toCityData.CityName?"srh-opt selected":"srh-opt"}
//                        style={{'position':'relative'}}
//                        onClick={this.selectToCity}>
//                       <span className="tit">{I18n.f_mn_sh_3016}</span>
//                       <div className="acityInfo-animate" style={{
//                           'position': 'absolute',
//                           'top':'29px',
//                           'display': 'inline-block',
//                           'width': '100%',
//                           'overflow': 'hidden',
//                           'white-space': 'nowrap',
//                           'text-overflow':' ellipsis'
//                       }}></div>
//                       <div className="acityInfo">
//                           <div className="city">
//                               {this.state.toCityData.CityName || I18n.c_3030}
//                               {this.state.toCityData.AirportCode && this.state.toCityData.AirportCode.toUpperCase()!="ALL"  ? ' (' + this.state.toCityData.AirportCode +')' : ''}
//                           </div>
//                           {this.state.toCityData.AirportName &&
//                             <span className="code">{this.state.toCityData.AirportName}</span>}
//                       </div>
//                   </div>
//                   <div className="toggle-box" onClick={this.switchCity}>
//                       <div className="ic-toggle"></div>
//                   </div>
//               </div>

// 							<div className="srh-item srh-flex">
//                                 {!this.state.checkOutState&&<i style={{
//                                     'position':'absolute',
//                                     'border-bottom': '1px solid rgba(0,0,0,.12)',
//                                     'width': '100%',
//                                     'bottom': '0px',
//                                 }}></i>}
// 								<div className={"srh-opt"+((this.state.checkInDate && !!this.state.checkInDate.date)?" selected":"")}
//                                      style={{'border-bottom':!this.state.checkOutState?'none':''
//                                             ,'position':'relative'}} onClick={this.clickDepartDate}>
// 									<span className="tit">{I18n.f_mn_sh_3007}</span>
//                                     <div className="date">
//                                         <span className="month">{(this.state.checkInDate && !!this.state.checkInDate.monthText)?this.state.checkInDate.monthText:I18n.f_mn_sh_3026}</span>
//                                         <span className="day">{Utility.formatDay(this.state.checkInDate.date)}</span>
//                                         <span className={this.state.checkInDate.isToday?"week today":"week"}>
//                                         {this.state.checkInDate.isToday ? I18n.f_mn_sh_3009 : this.state.checkInDate.dayText}
//                                         </span>
//                                     </div>
// 								</div>
//                                 <div id="tabchengetransition" className ={(this.state.tabhandleclick||~~index==1||~~index==0?(this.state.checkOutState?"srh-opt right-to-left":"srh-opt left-to-right"):'srh-opt')
//                                                     +((this.state.checkOutDate && !!this.state.checkOutDate.date)?" selected":"")}
//                                      style={{'position':'relative'}}
//                                      onClick={this.clickReturnDate} >
// 									<span className="tit">{I18n.f_mn_sh_3008}</span>
//                                     <div className="date">
//                                         <span className="month">{(this.state.checkOutDate && !!this.state.checkOutDate.monthText)?this.state.checkOutDate.monthText:I18n.f_mn_sh_3026}</span>
//                                         <span className="day">{Utility.formatDay(this.state.checkOutDate.date)}</span>
//                                         <span className={this.state.checkOutDate.isToday?"week today":"week"}>
//                                         {this.state.checkOutDate.isToday ? I18n.f_mn_sh_3009 : this.state.checkOutDate.dayText}
//                                         </span>
//                                     </div>
// 								</div>
// 							</div>
// 							<div className="srh-item srh-flex">
// 								<div className="srh-opt">
// 									<span className="tit">{I18n.f_mn_sh_3012} ({I18n.f_mn_sh_3019})</span>
// 									{/*<div className="passenger" onClick={this.ChangePassgerType}>
// 										<span className={this.state.passengerData.Adult?"people select":"people"}>
// 											<i className="i-icon ic-adult"></i>{this.state.passengerData.Adult}
// 										</span>
// 										<span className={this.state.passengerData.Child?"people select":"people"}>
// 											<i className="i-icon ic-child"></i>{this.state.passengerData.Child}
// 										</span>
// 										<span className={this.state.passengerData.Infant?"people select":"people"}>
// 											<i className="i-icon ic-baby"></i>{this.state.passengerData.Infant}
// 										</span>
// 									</div>*/}
//                     <div className="passenger-con">
//                         <div className={!!this.state.passengerData.Adult?"pass-list selected":"pass-list"}>
//                             <div className="pass-flex">
//                                 <i className="i-icon ic-adult"></i>
//                             </div>
//                             <div className="pass-flex">
//                                 <span className={"minus " + (this.state.passengerData.Adult<=1?"disabled":"")}
//                                     onClick={this.clickPassengerMinus}>
//                                     <i className="ic-remove"></i>
//                                 </span>
//                                 <span className="num">{this.state.passengerData.Adult}</span>
//                                 <span className={"plus "+(this.state.passengerData.Adult<9?"":"disabled")}
//                                     onClick={this.clickPassengerPlus}>
//                                     <i className="ic-add"></i>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
// 								</div>
// 								<div className="srh-opt">
// 									<span className="tit">{I18n.f_mn_sh_3006}</span>
// 									<div className="seat" onClick={this.classChange}>
// 										<i className="i-icon ic-seat"></i>
//                                         <div style={{'width':'70%',position: 'relative',display:'inline-block',height:"18px"}}>
//                                             <spa className="upscroll" style={{position:'absolute','z-index':1}}></spa>
//                                             <span className="class activescroll" style={{
//                                                 position: 'absolute',
//                                                 'z-index': 0
//                                             }}>{this.state.selectClassData.text}</span>
//                                             <spa className="downscroll" style={{position:'absolute','z-index': 2}}></spa>
//                                         </div>

//                                     </div>
// 								</div>
// 							</div>
// 							<ClickBox style={{"overflow":"hidden","position":"relative"}} className="srh-item" onClick={this.searchFilghts}>
// 								<button className="c-btn btn-warn">{I18n.f_mn_sh_3013}</button>
// 							</ClickBox>
// 						</div>
// 						{this.state.openLoading && <Loading needoverlay={1} />}
//                         {this.state.showCalendar && <Calendar
// 								//当前选择的日期
// 								checkInDateText={this.state.checkInDateText}
// 								checkOutDateText={this.state.checkOutDateText}
// 								inputCheckIn={this.state.isDepartDate?true:false}
// 								inputCheckOut={this.state.isDepartDate?false:true}
// 								checkInState={this.state.checkInState}
// 								checkOutState={this.state.checkOutState}
// 								cancelCalendar={this.cancelCalendar}
//                 cancelSelectDate={this.cancelCalendar}
// 								displayMonthNum={12}
// 								selectedDate={this.selectedDate}
// 								rangeState={false}
// 								title={I18n.c_2006}

// 								inTitle={I18n.f_mn_sh_3007}
// 								outTitle={I18n.f_mn_sh_3008}
// 								isFlights={true}
// 								isAround={this.state.roundTrip}
// 								callbackParent = {this.onCalendarChanged}
// 								fromCityCode={this.state.fromCityData.CityCode}
// 								toCityCode={this.state.toCityData.CityCode}

// 						/>}
// 						{this.state.showAddress && <Selectflightaddress show={this.state.showAddress}
//                                                               topType={this.state.selectTopType}
//                                                               searchTitle={this.state.searchTitle}
//                                                               searchText={this.state.selectTopType?this.state.fromCityData.CityName:this.state.toCityData.CityName}
//                                                               cancelSelect={this.cancelSelectCity}
//                                                               selectedData={this.selectedDataCallback} />}
//                         {this.state.confirm && <Popalert clickBtn={this.confirmCallback}
//                                                        content={this.state.confirmtxt}
//                                                        btns={[{text: "OK"}]} />}
//                         {this.state.showPassengerType &&　<Selectpassengertype cancelSelect={this.CancelSelectPassenger}
//                         										passengerData={this.state.passengerData}
//                         										changeCallBack={this.ChangePassgerTypeCallBack} />}
// 					</div></div>);
// 		}
// 	});
// })
