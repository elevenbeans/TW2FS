import {Component} from 'react';
import { Link, IndexLink} from 'react-router';
//import Store from 'store';

class APPBanner extends Component {
    constructor(props){
        super(props);
        this._loadTimes = 0;
        this.state = {
            open: true,
            height: 0,
            bannerConfig: {
                imageUrl: '//pages.english.ctrip.com/images/wap-top-banner/en-1080x225-06.png',
                turnUrl: '//english.ctrip.com/m/downapp/index/?utm_medium=wap&utm_source=ctripintl&utm_campaign=en_wappopup_20141017&lang=en'
            }
        };
    }

    allowShowAds(){
        // 是否关闭值为否且次数小于4
        //return !Store.getAdClick() && (Store.getAdClickTimes() <= 3);
        return true
    }
    componentWillMount(){
        if (!this.allowShowAds()) {  //判断打开的条件
            this.setState({
                open: false
            });
        } else {
            this.loadScript();
        }
    }
    componentDidMount(){
        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.resize.bind(this), false);
    }

    loadScript(){
        var date = new Date(),
            script = document.createElement('script');
        script.src = '//pages.english.ctrip.com/config/wap-top-banner.js?releaseno=' + (date.getFullYear() + date.getMonth() + date.getDate());
        script.onload = this.loadedScript.bind(this);
        if (this._loadTimes < 3) {
            this._loadTimes += 1;
            script.onerror = this.loadScript;
        }
        document.head.appendChild(script);
    }
    loadedScript(){
        var lang = restfulApi.APPLANGALIAS.slice(0, 2);
        if (lang && window.ctrip_wap_top_banner_config && window.ctrip_wap_top_banner_config[lang]) {
            this.setState({
                loaded: true,
                bannerConfig: ctrip_wap_top_banner_config[lang]
            });
        }
    }
    resize() {
        this.setState({
            height: document.body.clientWidth / 1080 * 225
        });
    }
    close(){
        //Store.saveAdClick();
        this.setState({
            open: false
        });
    }
    gotoDownload() {
      var _self = this;
      ga('send', 'event', 'outbound', 'click', this.state.bannerConfig.turnUrl, {'hitCallback':
        function () {
          console.log('Downapp action sended!', _self.state.bannerConfig.turnUrl);
        }
      });
      this.close().bind(this);
    }
    render() {
        return (
            <div className="ts_margin" style={{width: '100%',height: this.state.height + 'px',
                marginTop: 0,
                display: (this.state.open && this.state.loaded) ? 'block' : 'none',
                backgroundImage: 'url(' + this.state.bannerConfig.imageUrl + ')',
                backgroundSize: 'cover'}}>
                <a style={{width: '30%', height: '100%', float: 'right'}}
                   href={this.state.bannerConfig.turnUrl}
                   target="_blank" onClick={this.gotoDownload}></a>
                <a style={{width: '10%',height: '100%', float: 'left'}} onClick={this.close.bind(this)}></a>
            </div>);
    }
}

export default APPBanner;



// define(['react', 'store'], function (React, Store) {
//     return React.createClass({
//         getInitialState: function () {
//             return {
//                 open: true,
//                 height: 0,
//                 bannerConfig: {
//                     imageUrl: '//pages.english.ctrip.com/images/wap-top-banner/en-1080x225-06.png',
//                     turnUrl: '//english.ctrip.com/m/downapp/index/?utm_medium=wap&utm_source=ctripintl&utm_campaign=en_wappopup_20141017&lang=en'
//                 }
//             };
//         },
//         allowShowAds: function () {
//             // 是否关闭值为否且次数小于4
//             return !Store.getAdClick() && (Store.getAdClickTimes() <= 3);
//         },
//         componentWillMount: function () {
//             if (!this.allowShowAds()) {  //判断打开的条件
//                 this.setState({
//                     open: false
//                 });
//             } else {
//                 this.loadScript();
//             }
//         },
//         componentDidMount: function () {
//             this.resize();
//             window.addEventListener('resize', this.resize, false);
//         },
//         componentWillUnmount: function () {
//             window.removeEventListener('resize', this.resize, false);
//         },
//         _loadTimes: 0,
//         loadScript: function () {
//             var date = new Date(),
//                 script = document.createElement('script');
//             script.src = '//pages.english.ctrip.com/config/wap-top-banner.js?releaseno=' + (date.getFullYear() + date.getMonth() + date.getDate());
//             script.onload = this.loadedScript;
//             if (this._loadTimes < 3) {
//                 this._loadTimes += 1;
//                 script.onerror = this.loadScript;
//             }
//             document.head.appendChild(script);
//         },
//         loadedScript: function () {
//             var lang = restfulApi.APPLANGALIAS.slice(0, 2);
//             if (lang && window.ctrip_wap_top_banner_config && window.ctrip_wap_top_banner_config[lang]) {
//                 this.setState({
//                     loaded: true,
//                     bannerConfig: ctrip_wap_top_banner_config[lang]
//                 });
//             }
//         },
//         resize: function () {
//             this.setState({
//                 height: document.body.clientWidth / 1080 * 225
//             });
//         },
//         close: function () {
//             Store.saveAdClick();
//             this.setState({
//                 open: false
//             });
//         },
//         gotoDownload: function() {
//           var _self = this;
//           ga('send', 'event', 'outbound', 'click', this.state.bannerConfig.turnUrl, {'hitCallback':
//             function () {
//               console.log('Downapp action sended!', _self.state.bannerConfig.turnUrl);
//             }
//           });
//           this.close();
//         },
//         render: function () {
//             return (
//                 <div className="ts_margin" style={{width: '100%',height: this.state.height + 'px',
//                     marginTop: 0,
//                     display: (this.state.open && this.state.loaded) ? 'block' : 'none',
//                     backgroundImage: 'url(' + this.state.bannerConfig.imageUrl + ')',
//                     backgroundSize: 'cover'}}>
//                     <a style={{width: '30%', height: '100%', float: 'right'}}
//                        href={this.state.bannerConfig.turnUrl}
//                        target="_blank" onClick={this.gotoDownload}></a>
//                     <a style={{width: '10%',height: '100%', float: 'left'}} onClick={this.close}></a>
//                 </div>);
//         }
//     })
// });
