// define(['react','zepto','header2','footer2','pagetab2','homehotels2',
// 	'homeflights2','hometrains2','utility','store','analytics','i18n2','appbanner2'],
// 	function (React,$,Header,Footer,Pagetab,Homehotels,
// 		Homeflights,Hometrains,Utility,Store,Analytics,I18n,Appbanner) {

import {Component} from 'react';

// import Header from 'header2';
// import Footer from 'footer2';
// import Pagetab from 'pagetab2';
// import Homehotels from 'homehotels2';
// import Homeflights from 'homeflights2';
// import Hometrains from 'hometrains2';
// import Utility from 'utility';
// import Store from 'store';
// import Analytics from 'analytics';
// import I18n from 'i18n2';
// import Appbanner from 'appbanner2';

class Home extends Component {
	render(){
		return(<div style={{'overflow-x':'hidden'}}>
			    	HOME{/*<Appbanner htmls="dasd"/>
						<Header pageType={0} isToHome={1} />
						<Pagetab onTabChange={this.pageTabChange} tabIndex={this.state.channelIndex}
                    tabData={this.state.tabData}
                    onHide={this.state.onHide} />
            <Footer />*/}
					</div>
					);
	}
}

export default Home;

	// return React.createClass({
	// 	componentWillMount: function () {
	//         //Mounting
	//         this.fetchChannel();
	//         var tab = Lizard.P('tab'),
	//             path = location.pathname,
	//             channelIndex = Store.getChannelIndex() || 0;
	//         if (tab && typeof this.state.channelEnum[tab] === 'number') {
	//             channelIndex = this.state.channelEnum[tab];
	//         } else {
	//             if (/\/m\d{0,1}\/hotels\/{0,1}/i.test(path)) {
	//                 channelIndex = 0;
	//             } else if (/\/m\d{0,1}\/(chinaflights|flights)\/{0,1}/i.test(path)) {
	//                 channelIndex = 1;
	//             } else if (/\/m\d{0,1}\/trains\/{0,1}/i.test(path)) {
	//                 channelIndex = 2;
	//             }
	//         }
	//         this.setState({
	//             display: 'none',
	//             channelIndex: channelIndex
	//         });
	//     },
	//     componentDidMount:function(){
	    	
 //        },
	// 	getInitialState: function () {
 //            return {
 //                show: true,
 //                display: 'block',
 //                channelIndex: 0,
 //                channelEnum: {
 //                    h: 0,
 //                    f: 1,
 //                    t: 2
 //                },
 //                tabData:[],
 //                pagetime: (new Date()).getTime()
 //            };
 //        },
 //        getDefaultProps: function () {
 //            return {};
 //        },
 //        pageTabChange: function (index) {
 //            Store.saveChannelIndex(index);
 //        },
 //        fetchChannel:function(){
 //            this.setState({
 //                tabData:[{
	// 				iconClass: 'i-icon ic-hotel',
	// 				text: I18n.c_3011,
	// 				view: Homehotels
	// 			},{
	// 				iconClass: 'i-icon ic-flight',
	// 				text: I18n.c_3012,
	// 				view: Homeflights
	// 			},{
	// 				iconClass: 'i-icon ic-train',
	// 				text: I18n.c_3013,
	// 				view: Hometrains
	// 			}]
 //            });
 //            return;
 //            var _self=this;
 //            $.ajax({
 //                type: "POST",
 //                url: restfulApi.curr.getchannel,
 //                async: true,
 //                contentType: "application/json;charset=utf-8",
 //                data: '',
 //                dataType: 'json',
 //                success: function (data) {
 //                    if (data) {
	// 					var _tempData = data.map(function(item){
	// 						switch(item){
	// 							case "hotels":
	// 								item ={
	// 									iconClass: 'i-icon ic-hotel',
	// 									text: I18n.c_3011,
	// 									view: Homehotels
	// 								};
	// 								break;
	// 							case "flights":
	// 								item = {
	// 									iconClass: 'i-icon ic-flight',
	// 									text: I18n.c_3012,
	// 									view: Homeflights
	// 								};
	// 								break;
	// 							case "trains":
	// 								item = {
	// 									iconClass: 'i-icon ic-train',
	// 									text: I18n.c_3013,
	// 									view: Hometrains
	// 								};
	// 								break;
	// 						}
	// 						return item;
	// 					});
 //                        this.setState({
 //                            tabData:_tempData
 //                        });
 //                    }
 //                }.bind(_self)
 //            });
 //        },
	// 	onHide: function () {
 //            this.setState({
 //                onHide: true
 //            });
 //        },
 //        onShow: function () {
 //            Analytics.gaPush();
 //            Utility.pageReload(this.state.pagetime);
 //            Utility.pushUbtAbResult(this.props.datas.PageID,this.props.datas.ABResult);
 //        },
	// 	render:function(){
	// 		return(<div style={{'overflow-x':'hidden'}}>
	// 			    <Appbanner htmls="dasd"/>
	// 				<Header pageType={0} isToHome={1} />
	// 				<Pagetab onTabChange={this.pageTabChange} tabIndex={this.state.channelIndex}
 //                        tabData={this.state.tabData}
 //                        onHide={this.state.onHide} />
 //                    <Footer />
	// 			</div>);
	// 	}
	// });
//})
