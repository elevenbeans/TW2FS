define(['react','store','changeLanguage2','changeCurrency2','loading2','zepto','zeptomodules','popalert2','ClickBox',
	'searchflightpanel','searchhotelpanel','searchtrainpanel','pagetabportal','i18n2','utility','loginpanel','registerpanel', 'forgetpanel'],
	function (React,Store,ChangeLanguage,ChangeCurrency, Loading,$,$fx,Popalert,ClickBox,
		Searchflightpanel,Searchhotelpanel,Searchtrainpanel,Pagetabportal,I18N,Utility,LoginPanel,RegisterPanel, ForgetPanel) {

	var SmallLoading = React.createClass({
		render:function(){
			return(
				<div className="loader-box loader-box-blue">
					<svg className="circular" viewBox="0 0 50 50">
						<circle cx="25" cy="25" r="20" fill="none" stroke-linecap="round"></circle>
					</svg>
				</div>
			);
		}
	});

	return React.createClass({
		getDefaultProps:function(){
			return {
				pageType: 0,//0=none, 1=all,2=flight,3=hotel,4=train,
				isSimple: 0, //1=simple,0=normal
				isToHome: 0,//0=goback,1=gohome
				canGuest: 0,//1=login with guest,0=login without guest
				accounturl: restfulApi.accouts.index,
				mybookingurl: restfulApi.order.index,
				couponurl: restfulApi.coupon.mycoupons,
                CurrencyChangeCallback: function(){},//切换币种时调用
                LoginOrOutCallback:function(){},//切换登录态时调用
                SearchBtnCallback:function(){},//Search回调
                openSearch: 0,
                showLogin: false,
                showRegister: false,
				showForget: false,
                goToUrl:''
			};
		},
		getInitialState:function(){
			return {
				pageType: this.props.pageType,
				pageID: (new Date()).getTime(),
				isSimple: this.props.isSimple,
				isLogin: restfulApi.UID!=""?1:0,
				isLogining: false,
				userid: restfulApi.UID,
        		username: restfulApi.UNAME,
				bookingVal: -1,
				promocodeVal:-1,
				cmoneyVal:-1,
				ctripPointVal:-1,
				openMenu: false,
				openAccount: false,
				openLang: false,
                openCurrency: false,
                openLoading: false,
                openSearch: this.props.openSearch,
                curCurrency: restfulApi.CURRENCY,
                curLang: restfulApi.APPLANG,
                curLangAlia: restfulApi.APPLANGALIAS,
                logoURL: Lizard.webresourceBaseUrl+"res2/images/wap-logo.png",
                SvrTelst: [],
                showcoupontip:false,
                showpointstip:false,
                tipcontent:'',
                showLogin: this.props.showLogin,
                showRegister: this.props.showRegister,
				showForget: this.props.showForget,
                goToUrl: this.props.goToUrl,
                showCorsLogin: false
			};
		},
		componentWillMount:function(){
			this.getCustomerInfo();
			this.getLogoConfig();
			this.getSvrTel();
		},
		getLogoConfig:function(){
			var _self=this;
            $.ajax({
                type: "POST",
                url: restfulApi.curr.getlogo,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: '',
                success: function (data) {
                    if (data) {
                        this.setState({
                            logoURL: data
                        });
                    }
                }.bind(_self)
            });
		},
		componentDidMount:function(){},
		componentWillReceiveProps:function(nextProps){
			if(nextProps.showLogin!=this.state.showLogin){
				this.setState({
					showLogin:nextProps.showLogin,
					goToUrl:nextProps.goToUrl
				});
			}
			if(nextProps.openSearch!=this.state.openSearch){
				this.setState({
					openSearch:nextProps.openSearch
				});
			}
		},
		shouldComponentUpdate:function(nextProps,nextState){
			//console.log(nextProps);
			//console.log(nextState);
		},
		getCustomerInfo:function(){
			if(!this.state.isLogin||this.state.isLogining){
				return false;
			}
			this.setState({
        		isLogining:true
        	});
			var _self=this;
			$.ajax({
                type: "POST",
                url: restfulApi.accouts.GetCustomerCommInfo,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: '',
                dataType: 'json',
                success: function (data) {
                    if (data && data.CustomerCommonInfo) {
                    	this.setState({
                    		bookingVal: data.CustomerCommonInfo.MyBookings,
                    		promocodeVal: data.CustomerCommonInfo.PromotionCodes,
                    		cmoneyVal: data.CustomerCommonInfo.CMoney,
                    		ctripPointVal: data.CustomerCommonInfo.CPoints,
                    		isLogining: false
                    	});
                    }
                }.bind(_self)
            });
		},
		getSvrTel:function(){
			var _self=this;
			$.ajax({
                type: "POST",
                url: restfulApi.curr.getSvrTel,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: '',
                dataType: 'json',
                success: function (data) {
                    if(data){
	                    this.setState({
	                    	SvrTelst: data
	                    });
					}
                }.bind(_self)
            });
		},
		showSearch:function(e){
			e.preventDefault();
			this.setState({
				openSearch: this.state.pageType
			});
		},
		hideSearch:function(){
			this.setState({
				openSearch: 0
			},function(){
				this.props.SearchBtnCallback&&this.props.SearchBtnCallback();
			});
		},
		showAccount:function(e){
			e.preventDefault();
			if(this.state.openMenu){
				$('#homemenu'+this.state.pageID).slideUp1(this.props.isSimple?200:300);
			}
			this.setState({
				openAccount: !this.state.openAccount,
				openMenu: false,
				isLogin: restfulApi.UID!=""?1:0,
				userid: restfulApi.UID,
                username: restfulApi.UNAME
			},function(){
				if(this.state.openAccount){
					$('#accountmenu'+this.state.pageID).slideDown1(this.props.isSimple?150:300)
				}
				else {
					$('#accountmenu'+this.state.pageID).slideUp1(this.props.isSimple?150:300);
				}
				if(this.state.bookingVal==-1){
					this.getCustomerInfo();
				}
			});
		},
		showMenu:function(e){
			e.preventDefault();
			if(this.state.openAccount){
				$('#accountmenu'+this.state.pageID).slideUp1(this.props.isSimple?150:300);
			}
			this.setState({
				openMenu: !this.state.openMenu,
				openAccount: false
			},function(){
				if(this.state.openMenu){
					$('#homemenu'+this.state.pageID).slideDown1(this.props.isSimple?200:300);
				}
				else{
					$('#homemenu'+this.state.pageID).slideUp1(this.props.isSimple?200:300);
				}
			});
		},
		showLang:function(){
			this.setState({
				openLang:true
			});
		},
		hideLang:function(){
			this.setState({
				openLang:false
			});
		},
		showCurrency:function(){
			this.setState({
				openCurrency:true
			});
		},
		hideCurrency:function(){
			this.setState({
				openCurrency:false
			});
		},
		changeCurrencyCallback: function (data) {
            restfulApi.CURRENCY = data.Key;
            this.setState({
            	openCurrency: false,
            	curCurrency: data.Key
            },function(){
            	this.props.CurrencyChangeCallback && this.props.CurrencyChangeCallback.call();
            });
        },
        goToNewPage:function(newUrl){
        	this.setState({
        		openLoading:true
        	},function(){
        		setTimeout(function(){
        			window.location.href = newUrl;
        		},800)
        	});
        },
		goToLogin:function(){
			this.setState({
				showLogin: true
			});
		},
		goToRegister:function(){
			this.setState({
				showRegister: true
			});
		},
		// 打开忘记密码层
		goToForget: function(){
			this.setState({
				showForget: true
			})
		},
		goToLogout:function(){
            if(this.props.isSimple){
            	this.setState({
					showLogin: true
				});
				return;
            }
            this.setState({
            	openLoading:true
            });
            $.ajax({
                type: "POST",
                url: restfulApi.accouts.logoutAPI,
                async: true,
                contentType: "application/json;charset=utf-8",
                data: '',
                success: function (data) {
                    if (data) {
                        restfulApi.UID="";
                        restfulApi.UNAME="";
                        restfulApi.TICKET="";
                        this.setState({
                            showLogin: true,
                            bookingVal: -1,
							promocodeVal:-1,
							cmoneyVal:-1,
							ctripPointVal:-1,
                            openLoading: false,
                            isLogin: restfulApi.UID!=""?1:0,
							userid: restfulApi.UID,
			                username: restfulApi.UNAME
                        });
                    }
                }.bind(this)
            });
		},
		hideLoginOrReg:function(){
			this.setState({
				showLogin: false,
				showRegister: false,
				showForget: false,
				isLogin: restfulApi.UID!=""?1:0,
				userid: restfulApi.UID,
                username: restfulApi.UNAME,
                showCorsLogin: restfulApi.UID!=""?true:false //登录跨域
			},function(){
				this.getCustomerInfo();
				document.getElementById('main').style.display="block";
                document.body.style.overflow="";
				this.props.LoginOrOutCallback && this.props.LoginOrOutCallback.call();
			});
		},
		goToGuestBooking:function(){
			var _language=restfulApi.APPLANGALIAS||'english';
			var _toURL="https://accounts.ctrip.com/global/english/guestorderlist/searchguestbooking/";
			switch(_language){
				case "en":
				case "english":
					_toURL = "https://accounts.ctrip.com/global/english/guestorderlist/searchguestbooking/";
					break;
				case "hk":
				case "tc":
					_toURL = "https://accounts.ctrip.com/global/hk/guestorderlist/searchguestbooking/";
					break;
				case "de":
					_toURL = "https://accounts.ctrip.com/global/de/guestorderlist/searchguestbooking/";
					break;
				case "es":
					_toURL = "https://accounts.ctrip.com/global/es/guestorderlist/searchguestbooking/";
					break;
				case "fr":
					_toURL = "https://accounts.ctrip.com/global/fr/guestorderlist/searchguestbooking/";
					break;
				case "jp":
					_toURL = "https://accounts.ctrip.com/global/jp/guestorderlist/searchguestbooking/";
					break;
				case "kr":
					_toURL = "https://accounts.ctrip.com/global/kr/guestorderlist/searchguestbooking/";
					break;
				case "ru":
					_toURL = "https://accounts.ctrip.com/global/ru/guestorderlist/searchguestbooking/";
					break;
			}
			window.open(_toURL,"_blank");
		},
		goToMybooking:function(){
			this.goToNewPage(this.props.mybookingurl);
		},
		goToMyCoupons:function(){
			this.goToNewPage(this.props.couponurl);
		},
		goToHome:function(){
			this.goToNewPage('/m/');
		},
		goToHotels:function(){
			this.goToNewPage('/m/?tab=h');
		},
		goToFlights:function(){
			this.goToNewPage('/m/?tab=f');
		},
		goToTrains:function(){
			this.goToNewPage('/m/?tab=t');
		},
		goToFaqs:function(){
			var _language=restfulApi.APPLANGALIAS||'english';
			var _faqsURL="//pages.english.ctrip.com/faq/m/english/index.html";
			switch(_language){
				case "en":
				case "english":
					_faqsURL = "//pages.english.ctrip.com/faq/m/english/index.html";
					break;
				case "hk":
				case "tc":
					_faqsURL = "//pages.english.ctrip.com/faq/m/tc/index.html";
					break;
				case "de":
					_faqsURL = "//pages.english.ctrip.com/faq/m/de/index.html";
					break;
				case "es":
					_faqsURL = "//pages.english.ctrip.com/faq/m/es/index.html";
					break;
				case "fr":
					_faqsURL = "//pages.english.ctrip.com/faq/m/fr/index.html";
					break;
				case "jp":
					_faqsURL = "//pages.english.ctrip.com/faq/m/jp/index.html";
					break;
				case "kr":
					_faqsURL = "//pages.english.ctrip.com/faq/m/kr/index.html";
					break;
				case "ru":
					_faqsURL = "//pages.english.ctrip.com/faq/m/ru/index.html";
					break;
			}
			window.open(_faqsURL,"_blank");
		},
		goToOnlineChat:function(){
            var _language=restfulApi.APPLANGSFFX||'';
            var _uid=restfulApi.UID||'';
            var _url=restfulApi.onlinechat.index+'?channel=&language='+_language+'&uid='+_uid+'&browserVersions=H5';
            window.open(_url,"_blank");
    	},
    	handleCmoneyClick:function(){
    		this.setState({
    			showpointstip:false,
    			showcoupontip:true,
    			tipcontent: I18N.c_3046
    		});
    	},
    	handlePointsClick:function(){
			this.setState({
    			showpointstip:true,
    			showcoupontip:false,
    			tipcontent: I18N.c_3045
    		});
    	},
    	confirmCallback:function(){
    		this.setState({
    			showpointstip:false,
    			showcoupontip:false,
    			tipcontent:''
    		});
    	},
    	CallService:function(tel){
    		window.location.href="tel:"+tel;
    	},
		render:function(){
			var _self=this;
			var _language=restfulApi.APPLANGALIAS||'english';
			var _downLoadURL="//english.ctrip.com/m/downapp?utm_medium=wap&utm_source=menu&utm_campaign=enbutton";
			switch(_language){
				case "en":
				case "english":
					_downLoadURL = "//english.ctrip.com/m/downapp?utm_medium=wap&utm_source=menu&utm_campaign=enbutton";
					break;
				case "hk":
				case "tc":
					_downLoadURL = "//www.ctrip.com.hk/m/downapp?utm_medium=wap&utm_source=menu&utm_campaign=hkbutton";
					break;
				case "jp":
					_downLoadURL = "//jp.ctrip.com/m/downapp?utm_medium=wap&utm_source=menu&utm_campaign=jpbutton";
					break;
				case "kr":
					_downLoadURL = "//www.ctrip.co.kr/m/downapp?utm_medium=wap&utm_source=menu&utm_campaign=krbutton";
					break;
			}
			return(
			<header className="m-header">
				<ClickBox className="hd-inner clearfix">
					<h1 className="hd-logo"
						style={{"background-image": "url("+this.state.logoURL+")"}}
						onClick={this.goToHome}><a alt="Ctrip"></a>
					</h1>
					<div className="hd-nav" style={{'position':'absolute','right':'20px'}}>
						<div className="nav-box" onClick={this.showSearch} style={{display: ~~this.state.pageType?"inline-block":"none"}}>
							<span className="nav-item">
								<i className="i-icon ic-search"></i>
							</span>
						</div>
						<div className="nav-box" onClick={this.showAccount}>
							<span className={this.state.openAccount?"nav-item active":"nav-item"}>
								<i className={"i-icon "+(this.state.isLogin?"ic-account-circle":"ic-account")}></i>
							</span>
						</div>
						<div className="nav-box" onClick={this.showMenu}>
							<span className={this.state.openMenu?"nav-item active":"nav-item"}>
								<i className="i-icon ic-menu"></i>
							</span>
						</div>
					</div>
				</ClickBox>
				<div className="hd-menu" id={"accountmenu"+this.state.pageID}  style={{display:'none'}}>
					<div className="not-login" style={{display:!this.state.isLogin?'block':'none'}}>
						<ul className="menu-item">
							<li onClick={this.goToLogin}>
							 	<ClickBox className="layout">{I18N.c_3001}</ClickBox>
							</li>
							{!this.state.isSimple && <li onClick={this.goToRegister}>
								<ClickBox className="layout">{I18N.c_3002}</ClickBox>
							</li>}
							{!this.state.isSimple && <li onClick={this.goToGuestBooking}>
								<div className="layout">{I18N.c_3003}</div>
							</li>}
						</ul>
					</div>
					<div className="login" style={{display:this.state.isLogin?'block':'none'}}>
						<ul className="menu-item">
							<li>
								<ClickBox className="layout">
									{this.state.username||this.state.userid}
									<a className="sign-out" onClick={this.goToLogout}>{this.state.isSimple?"Change":I18N.c_3004}</a>
								</ClickBox>
							</li>
						</ul>
						{!this.state.isSimple &&
							<ul className="menu-item">
								<li>
									<ClickBox className="layout" onClick={this.goToMybooking}>
										{I18N.c_3005}
										{this.state.bookingVal<0?
											<SmallLoading />
											:<a className="val">{this.state.bookingVal}</a>
										}
									</ClickBox>
								</li>
								<li>
									<ClickBox className="layout" onClick={this.goToMyCoupons}>
										{I18N.c_3006}
										{this.state.promocodeVal<0?
											<SmallLoading />
											:<a className="val">{this.state.promocodeVal}</a>
										}
									</ClickBox>
								</li>
								<li>
									<ClickBox className="layout" onClick={this.handleCmoneyClick}>
										{I18N.c_3007}
										{this.state.cmoneyVal<0?
											<SmallLoading />
											: <a className="val">CNY {Utility.formatNum(~~this.state.cmoneyVal)}</a>
										}
									</ClickBox>
								</li>
								<li>
									<ClickBox className="layout" onClick={this.handlePointsClick}>
										{I18N.c_3008}
										{this.state.ctripPointVal<0?
											<SmallLoading />
											: <a className="val">{Utility.formatNum(~~this.state.ctripPointVal)}</a>
										}
									</ClickBox>
								</li>
							</ul>}
					</div>
				</div>
				<div className="hd-menu" id={"homemenu"+this.state.pageID} style={{display:'none'}}>
					{!this.state.isSimple &&
						<ul className="menu-item menu-lang">
							<li onClick={this.showLang}>
								<ClickBox className="layout">
									{I18N.c_3009}
									<a className="lang" href="javascript:;">{this.state.curLang}
										<i className={"f-icon f-"+(this.state.curLangAlia.slice(0, 2) === 'hk' ? 'cn' : this.state.curLangAlia.slice(0, 2))}></i>
									</a>
								</ClickBox>
							</li>
							<li onClick={this.showCurrency}>
								<ClickBox className="layout">
									{I18N.c_3010}
									<a className="currency" href="javascript:;">{this.state.curCurrency}</a>
								</ClickBox>
							</li>
						</ul>}
					{!this.state.isSimple &&
						<ul className="menu-item menu-nav">
							<li onClick={this.goToHotels}>
								<div className="layout">
									<i className="i-icon ic-hotel"></i>{I18N.c_3011}
								</div>
							</li>
							<li onClick={this.goToFlights}>
								<div className="layout">
									<i className="i-icon ic-flight"></i>{I18N.c_3012}
								</div>
							</li>
							<li onClick={this.goToTrains}>
								<div className="layout">
									<i className="i-icon ic-train"></i>{I18N.c_3013}
								</div>
							</li>
						</ul>}
					<ul className="menu-item menu-service">
						<li>
							<div className="layout" onClick={this.goToFaqs}>
								<a href="javascript:;">{I18N.c_3014}</a>
							</div>
						</li>
						{!this.state.isSimple && this.state.pageType==0 &&
							<li onClick={this.goToOnlineChat}>
								<div className="layout">
									{I18N.c_3015}
									<span className="info">7:00 - 23:00 (GMT+8)</span>
								</div>
							</li>}
						{this.state.SvrTelst && this.state.SvrTelst.map(function(item){
							return (
								<li onClick={_self.CallService.bind(null,item.Tel.replace(/\(+/g,'').replace(/\)+/g,'').replace(/\s+/g,''))}>
									<div className="layout">
										<span className="info">{item.Zone}</span>
										<a>{item.Tel}</a>
										{(item.StartTime !== '0:00' ||　item.EndTime !== '0:00') &&
											<span className="info">{item.StartTime+" - "+item.EndTime} {item.TimeZone&&("("+item.TimeZone+")")}</span>}
										{item.StartTime == '0:00' &&　item.EndTime == '0:00' &&
											<span className="info">{item.Workday}</span>}
										<i className="ic-phone"></i>
									</div>
								</li>);
						})}
					</ul>
					<div className="app-box">
						<a target="_blank" href={_downLoadURL} className="c-btn btn-info">
							<i className="i-icon ic-download"></i>{I18N.c_3018}
						</a>
					</div>
				</div>
				{this.state.openLoading && <Loading needoverlay={1} />}
				{(this.state.showpointstip||this.state.showcoupontip) && <Popalert clickBtn={this.confirmCallback}
                                                       content={this.state.tipcontent}
                                                       btns={[{text: "OK"}]} />}
				{this.state.openLang && <ChangeLanguage close={this.hideLang} title={I18N.c_3009} />}
				{this.state.openCurrency && <ChangeCurrency close={this.hideCurrency} title={I18N.c_3010} changeCurrency={this.changeCurrencyCallback} />}
				{this.state.openSearch==1 && <Pagetabportal close={this.hideSearch} title={I18N.c_3019} />}
				{this.state.openSearch==2 && <Searchflightpanel close={this.hideSearch} title={I18N.c_3019} />}
				{this.state.openSearch==3 && <Searchhotelpanel close={this.hideSearch} title={I18N.c_3019} />}
				{this.state.openSearch==4 && <Searchtrainpanel close={this.hideSearch} title={I18N.c_3019} />}
				{this.state.showLogin && <LoginPanel close={this.hideLoginOrReg}
													 goToUrl={this.state.goToUrl}
													 openRegister={this.goToRegister}
													 openForgetPass={this.goToForget}
													 canGuest={this.props.canGuest} />}
				{this.state.showRegister && <RegisterPanel close={this.hideLoginOrReg} goToUrl={this.state.goToUrl} />}
				{this.state.showForget && <ForgetPanel close={this.hideLoginOrReg} goToUrl={this.state.goToUrl} />}
				{this.state.showCorsLogin && <div style={{display:'none'}}>
									<iframe src={"/m/Account/TurnAccountIn/?ticket="+restfulApi.TICKET}></iframe>
								</div>}
			</header>);
		}
	});
})
