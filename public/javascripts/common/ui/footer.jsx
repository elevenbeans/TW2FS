define(['react','i18n2','ClickBox','zepto','popalert2'],function(React,I18N,ClickBox,$,Popalert) {
	return React.createClass({
		getDefaultProps: function() {
            return {
                resurl: Lizard.webresourceBaseUrl,
                isSimple: 0, //1=simple,0=normal
                showfltSEO: 0, //1=show,0=hide
                showhtlSEO: 0 //1=show,0=hide
            };
        },
        getInitialState:function(){
        	return {
        		ExploreMore: false,
        		BookAtoBFligtsStr:"",
        		BookAtoBFligtsDtoList:[],
        		PopularFlightsFromAStr:'',
        		PopularFlightsFromADtoList:[],
        		PopularFlightsToBStr:'',
        		PopularFlightsToBDtoList:[],
        		AirportDeparturesAndArrivalsStr:'',
        		AirportDeparturesAndArrivalsDtoList:[],
        		CheapAirlineTicketsStr:'',
        		CheapAirlineTicketsDtoList:[],
        		FlightScheduleStr:'',
        		FlightScheduleUrl:'',
        		showwechattip:false,
        		webchattipcnt:I18N.c_3047
        	};
        },
        componentWillMount:function(){
        	this.fentchFltSEOdata();
        },
        componentDidMount:function(){},
        showExploreMore:function(){
        	this.setState({
                ExploreMore: !this.state.ExploreMore
            });
        },
        fentchFltSEOdata:function(){
        	var  _dcitycode = Lizard.P('dcitycode')||Lizard.P('cityDcode'),
                 _acitycode = Lizard.P('acitycode')||Lizard.P('cityAcode');
            if(!_dcitycode||!_acitycode) return;
            var _request={
            	aCityCode: _acitycode,
            	dCityCode: _dcitycode
            };
        	var _self=this;
			$.ajax({
                type: "POST",
                url: restfulApi.seo.SeoAirline,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(_request),
                dataType: 'json',
                success: function (data) {
                    if(data){
                    	this.setState({
                    		FlightScheduleStr: data.FlightScheduleStr,
                    		FlightScheduleUrl: data.FlightScheduleUrl,
                    		CheapAirlineTicketsStr: data.CheapAirlineTicketsStr,
                    		CheapAirlineTicketsDtoList: data.CheapAirlineTicketsDtoList
                    	});
                    }
                }.bind(_self)
            });
            $.ajax({
                type: "POST",
                url: restfulApi.seo.SeoPopularFlight,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(_request),
                dataType: 'json',
                success: function (data) {
                    if(data){
                    	this.setState({
                    		PopularFlightsToBStr: data.PopularFlightsToBStr,
                    		PopularFlightsToBDtoList: data.PopularFlightsToBDtoList,
                    		PopularFlightsFromAStr: data.PopularFlightsFromAStr,
                    		PopularFlightsFromADtoList: data.PopularFlightsFromADtoList,
                    		BookAtoBFligtsStr: data.BookAtoBFligtsStr,
                    		BookAtoBFligtsDtoList: data.BookAtoBFligtsDtoList
                    	});
                    }
                }.bind(_self)
            });
        },
        fentchHltSEOdata:function(){
        	//获取酒店SEO数据
        },
        goToAboutUs:function(){
        	var _language=restfulApi.APPLANGALIAS||'english';
					var _toURL="//pages.english.ctrip.com/about/en/company-profile.html";
					switch(_language){
						case "en":
						case "english":
							_toURL = "//pages.english.ctrip.com/about/en/company-profile.html";
							break;
						case "hk":
						case "tc":
							_toURL = "//pages.english.ctrip.com/about/hk/company-profile.html";
							break;
						case "de":
							_toURL = "//pages.english.ctrip.com/about/de/company-profile.html";
							break;
						case "es":
							_toURL = "//pages.english.ctrip.com/about/es/company-profile.html";
							break;
						case "fr":
							_toURL = "//pages.english.ctrip.com/about/fr/company-profile.html";
							break;
						case "jp":
							_toURL = "//pages.english.ctrip.com/about/jp/company-profile.html";
							break;
						case "kr":
							_toURL = "//pages.english.ctrip.com/about/kr/company-profile.html";
							break;
						case "ru":
							_toURL = "//pages.english.ctrip.com/about/ru/company-profile.html";
							break;
					}
					window.open(_toURL,"_blank");
        },
        goToContactUs:function(){
					var _language=restfulApi.APPLANGALIAS||'english';
					var _toURL="//pages.english.ctrip.com/about/en/contact.html";
					switch(_language){
						case "en":
						case "english":
							_toURL = "//pages.english.ctrip.com/about/en/contact.html";
							break;
						case "hk":
						case "tc":
							_toURL = "//pages.english.ctrip.com/about/hk/contact.html";
							break;
						case "de":
							_toURL = "//pages.english.ctrip.com/about/de/contact.html";
							break;
						case "es":
							_toURL = "//pages.english.ctrip.com/about/es/contact.html";
							break;
						case "fr":
							_toURL = "//pages.english.ctrip.com/about/fr/contact.html";
							break;
						case "jp":
							_toURL = "//pages.english.ctrip.com/about/jp/contact.html";
							break;
						case "kr":
							_toURL = "//pages.english.ctrip.com/about/kr/contact.html";
							break;
						case "ru":
							_toURL = "//pages.english.ctrip.com/about/ru/contact.html";
							break;
					}
					window.open(_toURL,"_blank");
        },
        goToPrivacyPolicy:function(){
					var _language=restfulApi.APPLANGALIAS||'english';
					var _toURL="//pages.english.ctrip.com/about/en/privacy-policy.html";
					switch(_language){
						case "en":
						case "english":
							_toURL = "//pages.english.ctrip.com/about/en/privacy-policy.html";
							break;
						case "hk":
						case "tc":
							_toURL = "//pages.english.ctrip.com/about/hk/privacy-policy.html";
							break;
						case "de":
							_toURL = "//pages.english.ctrip.com/about/de/privacy-policy.html";
							break;
						case "es":
							_toURL = "//pages.english.ctrip.com/about/es/privacy-policy.html";
							break;
						case "fr":
							_toURL = "//pages.english.ctrip.com/about/fr/privacy-policy.html";
							break;
						case "jp":
							_toURL = "//pages.english.ctrip.com/about/jp/privacy-policy.html";
							break;
						case "kr":
							_toURL = "//pages.english.ctrip.com/about/kr/privacy-policy.html";
							break;
						case "ru":
							_toURL = "//pages.english.ctrip.com/about/ru/privacy-policy.html";
							break;
					}
					window.open(_toURL,"_blank");
        },
        showWechatHandle:function(){
        	this.setState({
        		showwechattip: true
        	});
        },
        confirmCallback:function(){
        	this.setState({
        		showwechattip:false
        	});
        },
		render:function(){
			return (
				<footer className="m-footer" style={{clear:"both"}}>
					{!this.props.isSimple &&
					<div className="fot-app">
						<ClickBox className="app-flex">
							<a target="_blank" href="https://app.appsflyer.com/id681752345?pid=wap&c=appstore">
								<i className="c-icon icon-ios"></i>
								<em>iphone APP On</em>
								<span>App Store</span>
							</a>
						</ClickBox>
						<ClickBox  className="app-flex">
							<a target="_blank" href="http://app.appsflyer.com/ctrip.english?pid=wap&c=googleplay">
								<i className="c-icon icon-android"></i>
								<em>Android App On</em>
								<span>Google play</span>
							</a>
						</ClickBox>
					</div>}
					{!this.props.isSimple &&
					<div className="fot-share">
						<h3 className="share-tit">{I18N.c_3027}</h3>
						<div className="share-box">
							<div className="share-flex" onClick={this.showWechatHandle}>
								<i className="c-icon icon-wx"></i>
							</div>
							<div className="share-flex">
								<a target="_blank" href="https://www.facebook.com/ctrip.hk">
									<i className="c-icon icon-fb"></i>
								</a>
							</div>
							<div className="share-flex">
								<a target="_blank" href="http://www.twitter.com/CtripEnglish">
									<i className="c-icon icon-tw"></i>
								</a>
							</div>
							<div className="share-flex">
								<a target="_blank" href="https://www.pinterest.com/ctripenglish/">
									<i className="c-icon icon-pint"></i>
								</a>
							</div>
							<div className="share-flex">
								<a target="_blank" href="https://plus.google.com/102073553261227429974">
									<i className="c-icon icon-google"></i>
								</a>
							</div>
						</div>
					</div>}
					{!this.props.isSimple &&
					<div className="fot-item">
						<div className={this.state.ExploreMore?"exp-con active":"exp-con"} style={{display:!!this.props.showfltSEO?"":"none"}}>
							<div className="exp-tit" onClick={this.showExploreMore}>
								{I18N.c_3023}
								<i className="ic-down-arrow"></i>
							</div>
							<div className="exp-box">
								{this.state.BookAtoBFligtsDtoList.length>0 &&
									<div className="exp-item">
										<h3 className="tit">{this.state.BookAtoBFligtsStr}</h3>
										<div className="cnt">
											{this.state.BookAtoBFligtsDtoList.map(function(item){
												return (<a target="_blank" href={item.Url}>{item.Name}<span className="space">|</span></a>);
											})}
										</div>
									</div>}
								{this.state.PopularFlightsFromADtoList.length>0 &&
									<div className="exp-item">
										<h3 className="tit">{this.state.PopularFlightsFromAStr}</h3>
										<div className="cnt">
											{this.state.PopularFlightsFromADtoList.map(function(item){
												return (<a target="_blank" href={item.Url}>{item.Name}<span className="space">|</span></a>);
											})}
										</div>
									</div>
								}
								{this.state.PopularFlightsToBDtoList.length>0 &&
									<div className="exp-item">
										<h3 className="tit">{this.state.PopularFlightsToBStr}</h3>
										<div className="cnt">
											{this.state.PopularFlightsToBDtoList.map(function(item){
												return (<a target="_blank" href={item.Url}>{item.Name}<span className="space">|</span></a>);
											})}
										</div>
									</div>
								}
								{this.state.AirportDeparturesAndArrivalsDtoList.length>0 &&
									<div className="exp-item">
										<h3 className="tit">{this.state.AirportDeparturesAndArrivalsStr}</h3>
										<div className="cnt">
											{this.state.AirportDeparturesAndArrivalsDtoList.map(function(item){
												return (<a target="_blank" href={item.Url}>{item.Name}<span className="space">|</span></a>);
											})}
										</div>
									</div>
								}
								{this.state.CheapAirlineTicketsDtoList.length>0 &&
									<div className="exp-item">
										<h3 className="tit">{this.state.CheapAirlineTicketsStr}</h3>
										<div className="cnt">
											{this.state.CheapAirlineTicketsDtoList.map(function(item){
												return (<a target="_blank" href={item.Url}>{item.Name}<span className="space">|</span></a>);
											})}
										</div>
									</div>
								}
								{!!this.state.FlightScheduleUrl &&
									<div className="exp-item">
										<h3 className="tit"></h3>
										<div className="cnt">
											<a target="_blank" href={this.state.FlightScheduleUrl}>{this.state.FlightScheduleStr}</a>
										</div>
									</div>
								}
							</div>
						</div>
						<div className="fot-table">
							<div className="fot-cell" onClick={this.goToAboutUs}><a>{I18N.c_3024}</a></div>
							<div className="fot-cell" onClick={this.goToContactUs}><a>{I18N.c_3025}</a></div>
							<div className="fot-cell" onClick={this.goToPrivacyPolicy}><a>{I18N.c_3026}</a></div>
						</div>
					</div>}
					<div className="copyright">
						<p>Copyright © 1999-2017</p>
						<p>Ctrip.com International, Ltd. All right reserved.</p>
						<p>ICP证：沪B2-20050130</p>
						{/*<img src={this.props.resurl + "res2/images/sh-gsh.jpg"} alt="" />*/}
					</div>
					{this.state.showwechattip && <Popalert clickBtn={this.confirmCallback}
                                                       content={this.state.webchattipcnt}
                                                       btns={[{text: "OK"}]} />}
				</footer>
				);
		}
	})
})
