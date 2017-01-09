define(['zepto'], function($){
	
	var GA = {
		init:function(){
			this.gaInit();
			this.gtmInit();
		},

		//GA
    getUID : function(doMain) {
    	var doMain = location.host.replace(/^www./i, "");
        if (/^english./i.test(doMain)) return "UA-2871753-7";
        else if (/.hk$/i.test(doMain)) return "UA-2871753-32";
        else if (/^jp./i.test(doMain)) return "UA-2871753-18";
        else if (/ctrip\.co\.kr/i.test(doMain)) return "UA-2871753-19";
        else if (/^de./i.test(doMain)) return "UA-2871753-20";
        else if (/^fr./i.test(doMain)) return "UA-2871753-21";
        else if (/^es./i.test(doMain)) return "UA-2871753-23";
        else if (/^ru./i.test(doMain)) return "UA-2871753-22";
        else if (/^vn./i.test(doMain)) return "UA-2871753-30";
    },

		gaInit:function(){
		  	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		    var uid = this.getUID();
		    //uid = 'UA-39612541-2';
		    ga('create', uid, 'auto');
		    ga('send', 'pageview', {'sessionControl': 'start'});

		},

		gaPush:function(data){
			try{
				if(data){
					ga('send','pageview',data.page);
				}else{
					ga('send','pageview');
				}
			}
			catch(e){}
		},

		gaEcPush:function(transdata,itemsdata){
			try{
				ga('require', 'ecommerce');
				ga('ecommerce:addTransaction', transdata);
				for (var i = itemsdata.length - 1; i >= 0; i--) {
					ga('ecommerce:addItem', itemsdata[i]);
				}
				ga('ecommerce:send');
			}
			catch(e){}
		},

		//GTM
		gtmInit:function(){
			window.dataLayer = [];

	        (function(w,d,s,l,i){
	        	w[l]=w[l]||[];
	        	w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
	        	var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
	        	j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window, document, 'script', 'dataLayer', 'GTM-W5446B');

		},

		gtmPush:function(data){
			if(!data){
				return;
			}
			data['event'] = 'virtualPageView';
			window.dataLayer.push(data);
		}

	}

	return GA;

});
