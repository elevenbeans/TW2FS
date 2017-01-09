/**
 * Created by kjmao on 2016/5/23.
 */
import $ from 'zepto';
import 'autoEvokeApp';

var lastTime = 0;

var Utility = {
        getJsonKeyValue: function(json, keyStr) {
            var result = {
                key: "",
                value: ""
            };
            for (key in json) {
                if (keyStr == key) {
                    result = {
                        key: key,
                        value: json[key]
                    };
                    break;
                }
            }
            return result;
        },
        // imgToDimg: function(url) {
        //     if (url.indexOf('images4.c-ctrip.com/target/') > 0) {
        //         return url.replace('images4.c-ctrip.com/target/', 'dimg04.c-ctrip.com/images/').replace(/(_)([0-9]+_[0-9]+)/g, "$1R_$2");
        //     }
        //     return url;
        // },

        detectLocalStorage: function(msg) {
            try {
                window.localStorage.detect = "detect";
            } catch (e) {
                return false;
            }
            return true;
        },

        disableScroll: function(n,id) { // disableScroll && touchmove; n=true is disable
          if (document.addEventListener) {
              document.addEventListener('DOMMouseScroll', scrollFunc, true);
          }//W3C
          window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
          if(n){
              document.getElementById(id).addEventListener('touchmove', bodyScroll, false);
          }else{
              document.getElementById(id).removeEventListener('touchmove',bodyScroll,false);
          }
          function bodyScroll(e){
              e.preventDefault()
          }
          function scrollFunc(evt) {
              return !n;
          }
        },

        /**
         * @method autoEvokeApp
         * 现在改为不去主动唤起 app，而是弹出一个 toast，让用户选择
         *
         * @param {Object} cfg 配置信息
         */
        autoEvokeApp: function(cfg) {
            return false //又TM不要弹框了
            if (restfulApi && !~~restfulApi.APPWAKEUP) return; //后端总开关
            if (!this.detectLocalStorage()) return;

            var urlParam = ctripGlobal.getURLParam(window.location.href);
            if (urlParam && urlParam.disableEvoke) return; //特殊屏蔽字段

            var currTime = +new Date();
            // 限流
            if (currTime - lastTime > 800) {
                if (ctripGlobal.detector.device().mobile && !ctripGlobal.detector.inCtripApp()) {
                    var deeplink = ctripGlobal.convertor.convertToNative()
                    // 手动关闭则一天内不再出现
                    if (window.localStorage.hasDownLoadPop !== 'true' + new Date().getDate()) {
                        ctripGlobal.toast({
                                title: cfg.title,
                                // posText: cfg.posText,
                                posText: 'Go',
                                negText: cfg.negText,
                                timeout: 6000
                            },
                            function(e) { //肯定选择的回调函数, 去下载页
                                var lang = ctripGlobal.detector.lang();
                                var map = {
                                    'zh-hk': 'hk',
                                    'ja': 'jp',
                                    'ko': 'kr'
                                }
                                var url = ''
                                if (map[lang] !== undefined) {
                                    url = '/m/downapp?utm_medium=wap&utm_source=popup&utm_campaign=' + map[lang]
                                } else {
                                    url = '/m/downapp?utm_medium=wap&utm_source=popup&utm_campaign=en'
                                }
                                url += '&deeplink=' + window.btoa(encodeURIComponent(deeplink))
                                    // console.log(location.origin + url)
                                window.open(url, '_blank');
                                window.localStorage.hasDownLoadPop = 'true' + new Date().getDate();
                            },
                            function(e) { //否定选择的回调函数，自定义
                                window.localStorage.hasDownLoadPop = 'true' + new Date().getDate();
                            }
                        );
                    }
                }

                lastTime = currTime;
            }
        },

        getRmsToken: function() {
            var _rmsToken = '';
            window.__rmsbfi = window.__rmsbfi || [];
            window.__rmsbfi.push(['_getRmsToken', function(rmsToken) {
                _rmsToken = rmsToken;
            }]);
            return _rmsToken;
        },
        pageReload: function(starttime, interval) {
            if (starttime) {
                if (interval == null || interval <= 0) {
                    interval = 30;
                }
                var timenow = (new Date()).getTime();
                if (timenow - interval * 60 * 1000 > starttime) {
                    window.location.reload();
                }
            }
        },
        getUTCSeconds: function(str) {
            var data = new Date();
            if (str) {
                data = new Date(str.replace(/-/g, "/"));
            }
            return data.getTime() / 1000 - data.getTimezoneOffset() * 60;
        },
        getUTCDate: function(str) {
            var data = new Date(str * 1000);
            return new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
        },
        newDateStr: function(str) {
            return new Date(str.replace(/-/g, "/"));
        },
        htmlEncodeByRegExp: function(str) {
            if (str == null || str == undefined) {
                return "";
            }
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            return s;
        },
        toDate: function(value, defaultValue) {
            var a = value.match(/^(19[0-9]{2}|2[0-9]{3})[-,/.](0?[1-9]|1[012])[-,/.]([123]0|[012]?[1-9]|31)$/) || value.match(/^(0?[1-9]|1[012])[-,/.]([123]0|[012]?[1-9]|31)[-,/.](19[0-9]{2}|2[0-9]{3})$/);
            if (a) {
                var m,
                    d,
                    y,
                    r;
                if (a.length == 4) {
                    if (a[1].length == 4) {
                        y = a[1];
                        m = a[2];
                        d = a[3];
                    } else if (a[3].length == 4) {
                        y = a[3];
                        m = a[1];
                        d = a[2];
                    }
                }
                if ($.type(~~y) == "number" && $.type(~~m) == "number" && $.type(~~d) == "number") {
                    y = y - 0;
                    m = m - 0;
                    d = d - 0;
                    r = new Date(y, m - 1, d);
                    if (r.getFullYear() == y && r.getMonth() == m - 1 && r.getDate() == d) {
                        return r;
                    }
                    return null;
                } else {
                    return null;
                }
            }
            return $.type(defaultValue) === "date" ? defaultValue : null;
        },
        regExpTest: function(value, rep) {
            if (!value && rep) {
                return false;
            }
            return (rep).test(value);
        },
        format: function() {
            var args = arguments;
            if (args[0]) {
                return args[0].replace(/\{(\d+)\}/g,
                    function(m, i) {
                        return args[i - 0 + 1];
                    });
            }
            return "";
        },
        formatTime: function(s) { //格式化秒数到时间格式
            var days = new Date(parseInt(s) * 1000).toLocaleString().substr(0, 17);
            days = new Date(days.split(" ")[0]);
            var _Date = days.getDate();
            var _mouth = days.getMonth();
            var year = days.getFullYear()
            var upperCase = function(mouth) {
                var arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return arr[mouth];
            };
            return _Date + ' ' + upperCase(_mouth) + ' ' + year;
        },
        formatNum: function(num, n) { //update lcm
            if (num && typeof num == "number") {
                num = String(num.toFixed(n || 0));
                var _newnum = num && num.split(".")[1];
                num = num.split(".")[0];
                var reg = /(?=(?!\b)(\d{3})+$)/g;
                if (_newnum && _newnum != "") {
                    _newnum = _newnum.substring(0, n);
                    num = num.replace(reg, ',') + "." + _newnum;
                } else {
                    num = num.replace(reg, ',');
                }
                return num;
            }
            return num;
        },
        unifyYMD: function(str){ //09-09-2019 => 2019-09-09
          if(str.match(/(\d{2})-(\d{2})-(\d{4})/)){
            return tempArr = str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2");
          }
          return str;
        },
        formatNumInCalendar: function(num, n) {
            if (typeof num == "number") {
                num = String(num.toFixed(n || 0));
                var reg = new RegExp(/^(-?\d+)(\d{3})(\d{3})|(-?\d{1,3})(\d{3})$/);
                var res = reg.exec(num);
                while (reg.test(num)) {
                    if (!res[3]) {
                        num = num.replace(reg, '$4,$5');
                    } else {
                        num = num.replace(reg, "$1,$2K");
                    }
                }
                return num;
            }
            return num;
        },
        formatMouth: function(str, num) {
            if (!num) return '';
            var _mouth = (num.split("-")[1]) * 1
            var _day = (num.split("-")[2]) * 1
            var months = str.split(",");
            var t = '';
            if (restfulApi.APPLANGSFFX == 'ko') {
                t = months[_mouth] + ' ' + _day + '일';
            } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
                t = months[_mouth] + ' ' + _day + '日';
            } else {
                t = _day + '  ' + months[_mouth]
            }
            return t;
        },
        formatDay: function(num) {
            if (!num) return '';
            //var _mouth = (num.split("-")[1]) * 1
            var _day = num * 1;
            //console.log(_day);
            //var months = str.split(",");
            var t = '';
            if (restfulApi.APPLANGSFFX == 'ko') {
                t = _day + '일';
            } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
                t = _day + '日';
            } else {
                t = _day;
            }
            return t;
        },
        formatYear: function(num) {
            if (!num) return '';
            //var _mouth = (num.split("-")[1]) * 1
            var formatYear = num * 1;
            var t = '';
            if (restfulApi.APPLANGSFFX == 'ko') {
                t = formatYear + '년';
            } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
                t = formatYear + '年';
            } else {
                t = formatYear;
            }
            return t;
        },
        checkLikePassoport: function(text) {
            return /^[A-Za-z0-9]+$/i.test(text);
        },
        chechCHNCardId: function(sNo) {
            if (!this.regExpTest(sNo, /^[0-9]{17}[X0-9]$/)) {
                return false;
            }
            sNo = sNo.toString();
            var a, b, c;
            a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10;
            a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4;
            a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6;
            a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9;
            a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8;
            a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2;
            b = a % 11;

            if (b == 2) {
                c = sNo.substr(17, 1).toUpperCase();
            } else {
                c = parseInt(sNo.substr(17, 1));
            }

            switch (b) {
                case 0:
                    if (c != 1) {
                        return false;
                    }
                    break;
                case 1:
                    if (c != 0) {
                        return false;
                    }
                    break;
                case 2:
                    if (c != "X") {
                        return false;
                    }
                    break;
                case 3:
                    if (c != 9) {
                        return false;
                    }
                    break;
                case 4:
                    if (c != 8) {
                        return false;
                    }
                    break;
                case 5:
                    if (c != 7) {
                        return false;
                    }
                    break;
                case 6:
                    if (c != 6) {
                        return false;
                    }
                    break;
                case 7:
                    if (c != 5) {
                        return false;
                    }
                    break;
                case 8:
                    if (c != 4) {
                        return false;
                    }
                    break;
                case 9:
                    if (c != 3) {
                        return false;
                    }
                    break;
                case 10:
                    if (c != 2) {
                        return false;
                    };
            }
            return true;
        },
        addYears: function(value, addValue) {
            if ($.type(value) === "date" && $.type(addValue) === "number") {
                var b = new Date(+value);
                b.setYear(b.getFullYear() + addValue);
                return b
            }
            return null;
        },
        toShortDate: function(value) {
            if ($.type(value) === "date") {
                return new Date(value.getFullYear(), value.getMonth(), value.getDate());
            }
            return null;
        },
        addMonth: function(value, addValue) {
            if ($.type(value) === "date" && $.type(addValue) === "number") {
                var b = new Date(+value);
                b.setMonth(b.getMonth() + addValue);
                return b
            }
            return null;
        },
        isTraditional: function(text) {
            var sTraditional = '萬與醜專業叢東絲兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壟壚壘墾堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒儘臟拚';
            for (var i = 0; i < text.length; i++) {
                var tmp = text.charAt(i);
                if (sTraditional.indexOf(tmp) > -1) {
                    return true;
                }
            }
            return false;
        },
        isENorCH: function(text) {
            return this.isEnglish(text) || this.isChinese(text) && !this.isTraditional(text);
        },
        isNum: function(text) {
            var reg = /^\d+$/;
            return reg.test(text);
        },
        isPhoneNum: function(text) {
            return /^[0-9]{5,18}$/.test(text);
        },
        hasEnCall: function(text) {
            return /^Mr$|^Miss$|^Mrs$|^Ms$/i.test(text);
        },
        isPassport: function(text) {
            if (text.replace(/(^\s*)|(\s*$)/g, "") == "") return false;
            return /^[a-z\s]{1,30}$/i.test(text);
        },
        isOneLetter: function(text) {
            return /^[A-Za-z]{1}$/.test(text);
        },
        isContainSpace: function(text) {
            return /\s/.test(text);
        },
        hasNum: function(text) {
            var reg = /\d+/;
            return reg.test(text);
        },
        isEmail: function(text) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text);
        },
        isChinese: function(text) {
            var reg = /^[\u4e00-\u9fff]+$/;
            return reg.test(text);
        },
        hasChinese: function(text) {
            var reg = /[\u4e00-\u9fff]{1,}/;
            return reg.test(text);
        },
        isEnglish: function(text) {
            var reg = /^[A-Za-z\s]+$/;
            return reg.test(text);
        },
        hasEnglish: function(text) {
            var reg = /[A-Za-z]+/;
            return reg.test(text);
        },
        serializeUrl: function(url) {
            var result = {};
            url = (url || '').split("?");
            if (url.length > 1) {
                var map = url[1].split("&");
                for (var i = 0, len = map.length; i < len; i++) {
                    var strList = map[i].split("=");
                    if (strList.length > 1) result[strList[0]] = strList[1];
                }
            }
            return result;
        },
        getCookie: function getCookie(name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(name + "=")
                if (c_start != -1) {
                    c_start = c_start + name.length + 1
                    var c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) c_end = document.cookie.length
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return ""
        },
        setCookie: function setCookie(name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
        },

        convertImageToBase64: function(file) {
            if (window.btoa == undefined || file == undefined) {
                return "";
            }
            return window.btoa(file);
        },
        convertFileToImage: function(file, width, height, fnImgLoad) {
            var $img = document.createElement("img");
            if (width > 0 && height > 0) {
                $img.width = width;
                $img.height = height;
            }
            if (typeof fnImgLoad == "function") {
                $img.onload = fnImgLoad;
            }
            if (typeof window.URL != "undefined") {
                $img.src = window.URL.createObjectURL(file)
            } else {
                $img.src = window.webkitURL.createObjectURL(file)
            }

            return $img;
        },
        zipImage: function(file, width, height) {
            var img = this.convertFileToImage(file, width, height);
            if (img != "undefined") {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                return canvas.toDataURL("image/jpeg");
            }

            return "";
        },

        timeToStr: function(timeStamp, fmt) {
            if (!timeStamp) {
                return '';
            }

            var data = new Date(timeStamp * 1000);
            data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
            var monthStrList = ['Jan', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var weekStrList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var o = {
                "m+": data.getMonth() + 1, //月份
                "d+": data.getDate(), //日
                "h+": data.getHours(), //小时
                "i+": data.getMinutes(), //分
                "s+": data.getSeconds(), //秒
                "q+": Math.floor((data.getMonth() + 3) / 3), //季度
                "S": data.getMilliseconds(), //毫秒
                "M": monthStrList[data.getMonth() + 1].trim(), //月字符串
                'W': weekStrList[data.getDay()] //星期
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },

        timeStampToStr: function(timeStamp, i18n, hasOffset) {
            //时间格式组合
            var formatStr = {};
            if (restfulApi.APPLANGSFFX == "ja" || restfulApi.APPLANGSFFX == "ko") {
                if (restfulApi.APPLANGSFFX == "ko") {
                    var yearStr = "년";
                    var dayStr = "일";
                } else {
                    yearStr = '年';
                    dayStr = '日';
                }
                formatStr['Y_M_D'] = 'yyyy' + yearStr + 'Md' + dayStr;
                formatStr['H_I_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' hh:ii';
                formatStr['W_D_M'] = 'Md' + dayStr + ',W';
                formatStr['H_I'] = 'hh:ii';
                formatStr['W_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' , W';
                formatStr['D_M'] = 'Md' + dayStr;
                formatStr['M_D_W'] = 'Mdd' + dayStr + ' W';
                formatStr['H_I_D_M'] = 'Md' + dayStr + ', hh:ii';
                formatStr['H_I_DD_M'] = 'Mdd, hh:ii';
            } else if (restfulApi.APPLANGSFFX == "zh-hk") {
                yearStr = '年';
                dayStr = '日';
                formatStr['Y_M_D'] = 'yyyy' + yearStr + 'Md' + dayStr;
                formatStr['H_I_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' hh:ii';
                formatStr['W_D_M'] = 'W,' + 'Md' + dayStr;
                formatStr['H_I'] = 'hh:ii';
                formatStr['W_D_M_Y'] = 'W,' + 'yyyy' + yearStr + 'Md' + dayStr;
                formatStr['D_M'] = 'Md' + dayStr;
                formatStr['M_D_W'] = 'W,' + 'Mdd' + dayStr;
                formatStr['H_I_D_M'] = 'Md' + dayStr + ', hh:ii';
                formatStr['H_I_DD_M'] = 'Mdd, hh:ii';
            } else if (restfulApi.APPLANGSFFX == "en-us" || restfulApi.APPLANGSFFX == "ms-MY" || restfulApi.APPLANGSFFX == "ru") {
                formatStr['Y_M_D'] = 'M d, yyyy';
                formatStr['H_I_D_M_Y'] = 'M d, yyyy, hh:ii';
                formatStr['W_D_M'] = 'W, M d';
                formatStr['H_I'] = 'hh:ii';
                formatStr['W_D_M_Y'] = 'W, M d, yyyy';
                formatStr['D_M'] = 'M d';
                formatStr['M_D_W'] = 'W,M d';
                formatStr['H_I_D_M'] = 'hh:ii, M d';
                formatStr['H_I_DD_M'] = 'hh:ii, M dd';
            } else {
                formatStr['Y_M_D'] = 'd M yyyy';
                formatStr['H_I_D_M_Y'] = 'hh:ii, d M yyyy';
                formatStr['W_D_M'] = 'W, d M';
                formatStr['H_I'] = 'hh:ii';
                formatStr['W_D_M_Y'] = 'W, d M yyyy';
                formatStr['D_M'] = 'd M';
                formatStr['M_D_W'] = 'M,d W';
                formatStr['H_I_D_M'] = 'hh:ii, d M';
                formatStr['H_I_DD_M'] = 'hh:ii, dd M';
            }
            if (!timeStamp) {
                return formatStr;
            }
            var data = new Date(timeStamp * 1000);
            if (!hasOffset) {
                data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
            }
            var monthStrList = (i18n.Common_Month || i18n.c_2001).split(',') || ['Jan', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var weekStrList = (i18n.Common_Week || i18n.c_2002).split(',') || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


            var o = {
                "m+": data.getMonth() + 1, //月份
                "d+": data.getDate(), //日
                "h+": data.getHours(), //小时
                "i+": data.getMinutes(), //分
                "s+": data.getSeconds(), //秒
                "q+": Math.floor((data.getMonth() + 3) / 3), //季度
                "S": data.getMilliseconds(), //毫秒
                "M": $.trim(monthStrList[data.getMonth() + 1]), //月字符串
                'W': weekStrList[data.getDay()] //星期
            };

            for (var key in formatStr) {
                var fmt = formatStr[key];
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }

                formatStr[key] = fmt;
            }
            return formatStr;
        },
        getbBrowserInfor: function() {
            var sUserAgent = navigator.userAgent;
            if (sUserAgent.indexOf("Opera") > -1) {
                return "Opera"; //Opera浏览器
            }
            var OsObject = "";
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                    return "ie6";
                }
                if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                    return "ie7";
                }
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
                    return "IE8";
                }

                if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
                    return "IE9"; //1
                }

                if (navigator.userAgent.indexOf("MSIE 10.0") > 0) {
                    return "IE10"; //1
                }
                if (navigator.userAgent.indexOf("MSIE 11.0") > 0) {
                    return "IE11";
                }
                return "IE";
            }
            if (isSamsungBrowser = navigator.userAgent.indexOf("SamsungBrowser") > 0) {
                return "Samsung"; //三星原生浏览器
            }
            if (isMozilla = navigator.userAgent.indexOf("360se") > 0) {
                return "+"; //360浏览器   360se
            }
            if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
                return "Firefox"; //火狐浏览器 1
            }
            if (isCamino = navigator.userAgent.indexOf("Chrome") > 0) {
                return "chrome"; //谷歌浏览器   1
            }
            if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
                return "Gecko"; //Gecko浏览器
            }
            if (navigator.userAgent.indexOf("TheWorld ") > 0) {
                return "TheWorld"; //世界之窗浏览器
            }
            if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
                return "Safari"; //苹果浏览器
            }
        },
        dayplusformat: function(DDate, ADate) {
            var _dayplusformat = '';
            if (this.getUTCDate(DDate).getDate() != this.getUTCDate(ADate).getDate()) {
                if (((ADate - DDate) / 86400) > 0) {
                    _dayplusformat = ' +' + Math.ceil((ADate - DDate) / 86400) + 'D';
                } else {
                    _dayplusformat = Math.floor((ADate - DDate) / 86400) + 'D';
                }
            }
            return _dayplusformat;
        },
        pushUbtAbResult:function(pageid,abresult){
            if(abresult==""||pageid=="") return;
            if(typeof window['__bfi'] == 'undefined'){
                window['__bfi'] = [];
            }
            window.__bfi.push([
                "_asynRefresh",
                {
                    ab_testing_tracker: abresult,
                    page_id: pageid,
                    url: window.location.href
                },
                function(){}
            ]);
        },
        pushUbtOrderID:function(pageid,orderid){
            if(abresult==""||pageid=="") return;
            if(typeof window['__bfi'] == 'undefined'){
                window['__bfi'] = [];
            }
            window.__bfi.push([
                "_asynRefresh",
                {
                    orderid: orderid,
                    page_id: pageid,
                    url: window.location.href
                },
                function(){}
            ]);
        },
}

export default Utility;

// define(['zepto', 'lizard/ctripGlobal'], function($) {
//     var lastTime = 0;
//     var getJsonKeyValue = function(json, keyStr) {
//         var result = {
//             key: "",
//             value: ""
//         };
//         for (key in json) {
//             if (keyStr == key) {
//                 result = {
//                     key: key,
//                     value: json[key]
//                 };
//                 break;
//             }
//         }
//         return result;
//     };
//     return {
//         getJsonKeyValue: getJsonKeyValue,
//         imgToDimg: function(url) {
//             if (url.indexOf('images4.c-ctrip.com/target/') > 0) {
//                 return url.replace('images4.c-ctrip.com/target/', 'dimg04.c-ctrip.com/images/').replace(/(_)([0-9]+_[0-9]+)/g, "$1R_$2");
//             }
//             return url;
//         },

//         detectLocalStorage: function(msg) {
//             try {
//                 window.localStorage.detect = "detect";
//             } catch (e) {
//                 return false;
//             }
//             return true;
//         },

//         disableScroll: function(n,id) { // disableScroll && touchmove; n=true is disable
//           if (document.addEventListener) {
//               document.addEventListener('DOMMouseScroll', scrollFunc, true);
//           }//W3C
//           window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
//           if(n){
//               document.getElementById(id).addEventListener('touchmove', bodyScroll, false);
//           }else{
//               document.getElementById(id).removeEventListener('touchmove',bodyScroll,false);
//           }
//           function bodyScroll(e){
//               e.preventDefault()
//           }
//           function scrollFunc(evt) {
//               return !n;
//           }
//         },

//         /**
//          * @method autoEvokeApp
//          * 现在改为不去主动唤起 app，而是弹出一个 toast，让用户选择
//          *
//          * @param {Object} cfg 配置信息
//          */
//         autoEvokeApp: function(cfg) {
//             return false //又TM不要弹框了
//             if (restfulApi && !~~restfulApi.APPWAKEUP) return; //后端总开关
//             if (!this.detectLocalStorage()) return;

//             var urlParam = ctripGlobal.getURLParam(window.location.href);
//             if (urlParam && urlParam.disableEvoke) return; //特殊屏蔽字段

//             var currTime = +new Date();
//             // 限流
//             if (currTime - lastTime > 800) {
//                 if (ctripGlobal.detector.device().mobile && !ctripGlobal.detector.inCtripApp()) {
//                     var deeplink = ctripGlobal.convertor.convertToNative()
//                     // 手动关闭则一天内不再出现
//                     if (window.localStorage.hasDownLoadPop !== 'true' + new Date().getDate()) {
//                         ctripGlobal.toast({
//                                 title: cfg.title,
//                                 // posText: cfg.posText,
//                                 posText: 'Go',
//                                 negText: cfg.negText,
//                                 timeout: 6000
//                             },
//                             function(e) { //肯定选择的回调函数, 去下载页
//                                 var lang = ctripGlobal.detector.lang();
//                                 var map = {
//                                     'zh-hk': 'hk',
//                                     'ja': 'jp',
//                                     'ko': 'kr'
//                                 }
//                                 var url = ''
//                                 if (map[lang] !== undefined) {
//                                     url = '/m/downapp?utm_medium=wap&utm_source=popup&utm_campaign=' + map[lang]
//                                 } else {
//                                     url = '/m/downapp?utm_medium=wap&utm_source=popup&utm_campaign=en'
//                                 }
//                                 url += '&deeplink=' + window.btoa(encodeURIComponent(deeplink))
//                                     // console.log(location.origin + url)
//                                 window.open(url, '_blank');
//                                 window.localStorage.hasDownLoadPop = 'true' + new Date().getDate();
//                             },
//                             function(e) { //否定选择的回调函数，自定义
//                                 window.localStorage.hasDownLoadPop = 'true' + new Date().getDate();
//                             }
//                         );
//                     }
//                 }

//                 lastTime = currTime;
//             }
//         },

//         getRmsToken: function() {
//             var _rmsToken = '';
//             window.__rmsbfi = window.__rmsbfi || [];
//             window.__rmsbfi.push(['_getRmsToken', function(rmsToken) {
//                 _rmsToken = rmsToken;
//             }]);
//             return _rmsToken;
//         },
//         pageReload: function(starttime, interval) {
//             if (starttime) {
//                 if (interval == null || interval <= 0) {
//                     interval = 30;
//                 }
//                 var timenow = (new Date()).getTime();
//                 if (timenow - interval * 60 * 1000 > starttime) {
//                     window.location.reload();
//                 }
//             }
//         },
//         getUTCSeconds: function(str) {
//             var data = new Date();
//             if (str) {
//                 data = new Date(str.replace(/-/g, "/"));
//             }
//             return data.getTime() / 1000 - data.getTimezoneOffset() * 60;
//         },
//         getUTCDate: function(str) {
//             var data = new Date(str * 1000);
//             return new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
//         },
//         newDateStr: function(str) {
//             return new Date(str.replace(/-/g, "/"));
//         },
//         htmlEncodeByRegExp: function(str) {
//             if (str == null || str == undefined) {
//                 return "";
//             }
//             var s = "";
//             if (str.length == 0) return "";
//             s = str.replace(/&/g, "&amp;");
//             s = s.replace(/</g, "&lt;");
//             s = s.replace(/>/g, "&gt;");
//             s = s.replace(/ /g, "&nbsp;");
//             s = s.replace(/\'/g, "&#39;");
//             s = s.replace(/\"/g, "&quot;");
//             return s;
//         },
//         toDate: function(value, defaultValue) {
//             var a = value.match(/^(19[0-9]{2}|2[0-9]{3})[-,/.](0?[1-9]|1[012])[-,/.]([123]0|[012]?[1-9]|31)$/) || value.match(/^(0?[1-9]|1[012])[-,/.]([123]0|[012]?[1-9]|31)[-,/.](19[0-9]{2}|2[0-9]{3})$/);
//             if (a) {
//                 var m,
//                     d,
//                     y,
//                     r;
//                 if (a.length == 4) {
//                     if (a[1].length == 4) {
//                         y = a[1];
//                         m = a[2];
//                         d = a[3];
//                     } else if (a[3].length == 4) {
//                         y = a[3];
//                         m = a[1];
//                         d = a[2];
//                     }
//                 }
//                 if ($.type(~~y) == "number" && $.type(~~m) == "number" && $.type(~~d) == "number") {
//                     y = y - 0;
//                     m = m - 0;
//                     d = d - 0;
//                     r = new Date(y, m - 1, d);
//                     if (r.getFullYear() == y && r.getMonth() == m - 1 && r.getDate() == d) {
//                         return r;
//                     }
//                     return null;
//                 } else {
//                     return null;
//                 }
//             }
//             return $.type(defaultValue) === "date" ? defaultValue : null;
//         },
//         regExpTest: function(value, rep) {
//             if (!value && rep) {
//                 return false;
//             }
//             return (rep).test(value);
//         },
//         format: function() {
//             var args = arguments;
//             if (args[0]) {
//                 return args[0].replace(/\{(\d+)\}/g,
//                     function(m, i) {
//                         return args[i - 0 + 1];
//                     });
//             }
//             return "";
//         },
//         formatTime: function(s) { //格式化秒数到时间格式
//             var days = new Date(parseInt(s) * 1000).toLocaleString().substr(0, 17);
//             days = new Date(days.split(" ")[0]);
//             var _Date = days.getDate();
//             var _mouth = days.getMonth();
//             var year = days.getFullYear()
//             var upperCase = function(mouth) {
//                 var arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//                 return arr[mouth];
//             };
//             return _Date + ' ' + upperCase(_mouth) + ' ' + year;
//         },
//         formatNum: function(num, n) { //update lcm
//             if (num && typeof num == "number") {
//                 num = String(num.toFixed(n || 0));
//                 var _newnum = num && num.split(".")[1];
//                 num = num.split(".")[0];
//                 var reg = /(?=(?!\b)(\d{3})+$)/g;
//                 if (_newnum && _newnum != "") {
//                     _newnum = _newnum.substring(0, n);
//                     num = num.replace(reg, ',') + "." + _newnum;
//                 } else {
//                     num = num.replace(reg, ',');
//                 }
//                 return num;
//             }
//             return num;
//         },
//         unifyYMD: function(str){ //09-09-2019 => 2019-09-09
//           if(str.match(/(\d{2})-(\d{2})-(\d{4})/)){
//             return tempArr = str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2");
//           }
//           return str;
//         },
//         formatNumInCalendar: function(num, n) {
//             if (typeof num == "number") {
//                 num = String(num.toFixed(n || 0));
//                 var reg = new RegExp(/^(-?\d+)(\d{3})(\d{3})|(-?\d{1,3})(\d{3})$/);
//                 var res = reg.exec(num);
//                 while (reg.test(num)) {
//                     if (!res[3]) {
//                         num = num.replace(reg, '$4,$5');
//                     } else {
//                         num = num.replace(reg, "$1,$2K");
//                     }
//                 }
//                 return num;
//             }
//             return num;
//         },
//         formatMouth: function(str, num) {
//             if (!num) return '';
//             var _mouth = (num.split("-")[1]) * 1
//             var _day = (num.split("-")[2]) * 1
//             var months = str.split(",");
//             var t = '';
//             if (restfulApi.APPLANGSFFX == 'ko') {
//                 t = months[_mouth] + ' ' + _day + '일';
//             } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
//                 t = months[_mouth] + ' ' + _day + '日';
//             } else {
//                 t = _day + '  ' + months[_mouth]
//             }
//             return t;
//         },
//         formatDay: function(num) {
//             if (!num) return '';
//             //var _mouth = (num.split("-")[1]) * 1
//             var _day = num * 1;
//             //console.log(_day);
//             //var months = str.split(",");
//             var t = '';
//             if (restfulApi.APPLANGSFFX == 'ko') {
//                 t = _day + '일';
//             } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
//                 t = _day + '日';
//             } else {
//                 t = _day;
//             }
//             return t;
//         },
//         formatYear: function(num) {
//             if (!num) return '';
//             //var _mouth = (num.split("-")[1]) * 1
//             var formatYear = num * 1;
//             var t = '';
//             if (restfulApi.APPLANGSFFX == 'ko') {
//                 t = formatYear + '년';
//             } else if (restfulApi.APPLANGSFFX == 'zh-hk' || restfulApi.APPLANGSFFX == 'ja') {
//                 t = formatYear + '年';
//             } else {
//                 t = formatYear;
//             }
//             return t;
//         },
//         checkLikePassoport: function(text) {
//             return /^[A-Za-z0-9]+$/i.test(text);
//         },
//         chechCHNCardId: function(sNo) {
//             if (!this.regExpTest(sNo, /^[0-9]{17}[X0-9]$/)) {
//                 return false;
//             }
//             sNo = sNo.toString();
//             var a, b, c;
//             a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10;
//             a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4;
//             a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6;
//             a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9;
//             a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8;
//             a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2;
//             b = a % 11;

//             if (b == 2) {
//                 c = sNo.substr(17, 1).toUpperCase();
//             } else {
//                 c = parseInt(sNo.substr(17, 1));
//             }

//             switch (b) {
//                 case 0:
//                     if (c != 1) {
//                         return false;
//                     }
//                     break;
//                 case 1:
//                     if (c != 0) {
//                         return false;
//                     }
//                     break;
//                 case 2:
//                     if (c != "X") {
//                         return false;
//                     }
//                     break;
//                 case 3:
//                     if (c != 9) {
//                         return false;
//                     }
//                     break;
//                 case 4:
//                     if (c != 8) {
//                         return false;
//                     }
//                     break;
//                 case 5:
//                     if (c != 7) {
//                         return false;
//                     }
//                     break;
//                 case 6:
//                     if (c != 6) {
//                         return false;
//                     }
//                     break;
//                 case 7:
//                     if (c != 5) {
//                         return false;
//                     }
//                     break;
//                 case 8:
//                     if (c != 4) {
//                         return false;
//                     }
//                     break;
//                 case 9:
//                     if (c != 3) {
//                         return false;
//                     }
//                     break;
//                 case 10:
//                     if (c != 2) {
//                         return false;
//                     };
//             }
//             return true;
//         },
//         addYears: function(value, addValue) {
//             if ($.type(value) === "date" && $.type(addValue) === "number") {
//                 var b = new Date(+value);
//                 b.setYear(b.getFullYear() + addValue);
//                 return b
//             }
//             return null;
//         },
//         toShortDate: function(value) {
//             if ($.type(value) === "date") {
//                 return new Date(value.getFullYear(), value.getMonth(), value.getDate());
//             }
//             return null;
//         },
//         addMonth: function(value, addValue) {
//             if ($.type(value) === "date" && $.type(addValue) === "number") {
//                 var b = new Date(+value);
//                 b.setMonth(b.getMonth() + addValue);
//                 return b
//             }
//             return null;
//         },
//         isTraditional: function(text) {
//             var sTraditional = '萬與醜專業叢東絲兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壟壚壘墾堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒儘臟拚';
//             for (var i = 0; i < text.length; i++) {
//                 var tmp = text.charAt(i);
//                 if (sTraditional.indexOf(tmp) > -1) {
//                     return true;
//                 }
//             }
//             return false;
//         },
//         isENorCH: function(text) {
//             return this.isEnglish(text) || this.isChinese(text) && !this.isTraditional(text);
//         },
//         isNum: function(text) {
//             var reg = /^\d+$/;
//             return reg.test(text);
//         },
//         isPhoneNum: function(text) {
//             return /^[0-9]{5,18}$/.test(text);
//         },
//         hasEnCall: function(text) {
//             return /^Mr$|^Miss$|^Mrs$|^Ms$/i.test(text);
//         },
//         isPassport: function(text) {
//             if (text.replace(/(^\s*)|(\s*$)/g, "") == "") return false;
//             return /^[a-z\s]{1,30}$/i.test(text);
//         },
//         isOneLetter: function(text) {
//             return /^[A-Za-z]{1}$/.test(text);
//         },
//         isContainSpace: function(text) {
//             return /\s/.test(text);
//         },
//         hasNum: function(text) {
//             var reg = /\d+/;
//             return reg.test(text);
//         },
//         isEmail: function(text) {
//             return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text);
//         },
//         isChinese: function(text) {
//             var reg = /^[\u4e00-\u9fff]+$/;
//             return reg.test(text);
//         },
//         hasChinese: function(text) {
//             var reg = /[\u4e00-\u9fff]{1,}/;
//             return reg.test(text);
//         },
//         isEnglish: function(text) {
//             var reg = /^[A-Za-z\s]+$/;
//             return reg.test(text);
//         },
//         hasEnglish: function(text) {
//             var reg = /[A-Za-z]+/;
//             return reg.test(text);
//         },
//         serializeUrl: function(url) {
//             var result = {};
//             url = (url || '').split("?");
//             if (url.length > 1) {
//                 var map = url[1].split("&");
//                 for (var i = 0, len = map.length; i < len; i++) {
//                     var strList = map[i].split("=");
//                     if (strList.length > 1) result[strList[0]] = strList[1];
//                 }
//             }
//             return result;
//         },
//         getCookie: function getCookie(name) {
//             if (document.cookie.length > 0) {
//                 var c_start = document.cookie.indexOf(name + "=")
//                 if (c_start != -1) {
//                     c_start = c_start + name.length + 1
//                     var c_end = document.cookie.indexOf(";", c_start)
//                     if (c_end == -1) c_end = document.cookie.length
//                     return unescape(document.cookie.substring(c_start, c_end));
//                 }
//             }
//             return ""
//         },
//         setCookie: function setCookie(name, value, expiredays) {
//             var exdate = new Date();
//             exdate.setDate(exdate.getDate() + expiredays);
//             document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
//         },

//         convertImageToBase64: function(file) {
//             if (window.btoa == undefined || file == undefined) {
//                 return "";
//             }
//             return window.btoa(file);
//         },
//         convertFileToImage: function(file, width, height, fnImgLoad) {
//             var $img = document.createElement("img");
//             if (width > 0 && height > 0) {
//                 $img.width = width;
//                 $img.height = height;
//             }
//             if (typeof fnImgLoad == "function") {
//                 $img.onload = fnImgLoad;
//             }
//             if (typeof window.URL != "undefined") {
//                 $img.src = window.URL.createObjectURL(file)
//             } else {
//                 $img.src = window.webkitURL.createObjectURL(file)
//             }

//             return $img;
//         },
//         zipImage: function(file, width, height) {
//             var img = this.convertFileToImage(file, width, height);
//             if (img != "undefined") {
//                 var canvas = document.createElement("canvas");
//                 var ctx = canvas.getContext("2d");
//                 ctx.drawImage(img, 0, 0, img.width, img.height);
//                 return canvas.toDataURL("image/jpeg");
//             }

//             return "";
//         },

//         timeToStr: function(timeStamp, fmt) {
//             if (!timeStamp) {
//                 return '';
//             }

//             var data = new Date(timeStamp * 1000);
//             data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
//             var monthStrList = ['Jan', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//             var weekStrList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//             var o = {
//                 "m+": data.getMonth() + 1, //月份
//                 "d+": data.getDate(), //日
//                 "h+": data.getHours(), //小时
//                 "i+": data.getMinutes(), //分
//                 "s+": data.getSeconds(), //秒
//                 "q+": Math.floor((data.getMonth() + 3) / 3), //季度
//                 "S": data.getMilliseconds(), //毫秒
//                 "M": monthStrList[data.getMonth() + 1].trim(), //月字符串
//                 'W': weekStrList[data.getDay()] //星期
//             };
//             if (/(y+)/.test(fmt)) {
//                 fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
//             }

//             for (var k in o) {
//                 if (new RegExp("(" + k + ")").test(fmt)) {
//                     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//                 }
//             }
//             return fmt;
//         },

//         timeStampToStr: function(timeStamp, i18n, hasOffset) {
//             //时间格式组合
//             var formatStr = {};
//             if (restfulApi.APPLANGSFFX == "ja" || restfulApi.APPLANGSFFX == "ko") {
//                 if (restfulApi.APPLANGSFFX == "ko") {
//                     var yearStr = "년";
//                     var dayStr = "일";
//                 } else {
//                     yearStr = '年';
//                     dayStr = '日';
//                 }
//                 formatStr['Y_M_D'] = 'yyyy' + yearStr + 'Md' + dayStr;
//                 formatStr['H_I_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' hh:ii';
//                 formatStr['W_D_M'] = 'Md' + dayStr + ',W';
//                 formatStr['H_I'] = 'hh:ii';
//                 formatStr['W_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' , W';
//                 formatStr['D_M'] = 'Md' + dayStr;
//                 formatStr['M_D_W'] = 'Mdd' + dayStr + ' W';
//                 formatStr['H_I_D_M'] = 'Md' + dayStr + ', hh:ii';
//                 formatStr['H_I_DD_M'] = 'Mdd, hh:ii';
//             } else if (restfulApi.APPLANGSFFX == "zh-hk") {
//                 yearStr = '年';
//                 dayStr = '日';
//                 formatStr['Y_M_D'] = 'yyyy' + yearStr + 'Md' + dayStr;
//                 formatStr['H_I_D_M_Y'] = 'yyyy' + yearStr + 'Md' + dayStr + ' hh:ii';
//                 formatStr['W_D_M'] = 'W,' + 'Md' + dayStr;
//                 formatStr['H_I'] = 'hh:ii';
//                 formatStr['W_D_M_Y'] = 'W,' + 'yyyy' + yearStr + 'Md' + dayStr;
//                 formatStr['D_M'] = 'Md' + dayStr;
//                 formatStr['M_D_W'] = 'W,' + 'Mdd' + dayStr;
//                 formatStr['H_I_D_M'] = 'Md' + dayStr + ', hh:ii';
//                 formatStr['H_I_DD_M'] = 'Mdd, hh:ii';
//             } else if (restfulApi.APPLANGSFFX == "en-us" || restfulApi.APPLANGSFFX == "ms-MY" || restfulApi.APPLANGSFFX == "ru") {
//                 formatStr['Y_M_D'] = 'M d, yyyy';
//                 formatStr['H_I_D_M_Y'] = 'M d, yyyy, hh:ii';
//                 formatStr['W_D_M'] = 'W, M d';
//                 formatStr['H_I'] = 'hh:ii';
//                 formatStr['W_D_M_Y'] = 'W, M d, yyyy';
//                 formatStr['D_M'] = 'M d';
//                 formatStr['M_D_W'] = 'W,M d';
//                 formatStr['H_I_D_M'] = 'hh:ii, M d';
//                 formatStr['H_I_DD_M'] = 'hh:ii, M dd';
//             } else {
//                 formatStr['Y_M_D'] = 'd M yyyy';
//                 formatStr['H_I_D_M_Y'] = 'hh:ii, d M yyyy';
//                 formatStr['W_D_M'] = 'W, d M';
//                 formatStr['H_I'] = 'hh:ii';
//                 formatStr['W_D_M_Y'] = 'W, d M yyyy';
//                 formatStr['D_M'] = 'd M';
//                 formatStr['M_D_W'] = 'M,d W';
//                 formatStr['H_I_D_M'] = 'hh:ii, d M';
//                 formatStr['H_I_DD_M'] = 'hh:ii, dd M';
//             }
//             if (!timeStamp) {
//                 return formatStr;
//             }
//             var data = new Date(timeStamp * 1000);
//             if (!hasOffset) {
//                 data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
//             }
//             var monthStrList = (i18n.Common_Month || i18n.c_2001).split(',') || ['Jan', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//             var weekStrList = (i18n.Common_Week || i18n.c_2002).split(',') || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


//             var o = {
//                 "m+": data.getMonth() + 1, //月份
//                 "d+": data.getDate(), //日
//                 "h+": data.getHours(), //小时
//                 "i+": data.getMinutes(), //分
//                 "s+": data.getSeconds(), //秒
//                 "q+": Math.floor((data.getMonth() + 3) / 3), //季度
//                 "S": data.getMilliseconds(), //毫秒
//                 "M": $.trim(monthStrList[data.getMonth() + 1]), //月字符串
//                 'W': weekStrList[data.getDay()] //星期
//             };

//             for (var key in formatStr) {
//                 var fmt = formatStr[key];
//                 if (/(y+)/.test(fmt)) {
//                     fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
//                 }
//                 for (var k in o) {
//                     if (new RegExp("(" + k + ")").test(fmt)) {
//                         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//                     }
//                 }

//                 formatStr[key] = fmt;
//             }
//             return formatStr;
//         },
//         getbBrowserInfor: function() {
//             var sUserAgent = navigator.userAgent;
//             if (sUserAgent.indexOf("Opera") > -1) {
//                 return "Opera"; //Opera浏览器
//             }
//             var OsObject = "";
//             if (navigator.userAgent.indexOf("MSIE") > 0) {
//                 if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
//                     return "ie6";
//                 }
//                 if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
//                     return "ie7";
//                 }
//                 if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
//                     return "IE8";
//                 }

//                 if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
//                     return "IE9"; //1
//                 }

//                 if (navigator.userAgent.indexOf("MSIE 10.0") > 0) {
//                     return "IE10"; //1
//                 }
//                 if (navigator.userAgent.indexOf("MSIE 11.0") > 0) {
//                     return "IE11";
//                 }
//                 return "IE";
//             }
//             if (isSamsungBrowser = navigator.userAgent.indexOf("SamsungBrowser") > 0) {
//                 return "Samsung"; //三星原生浏览器
//             }
//             if (isMozilla = navigator.userAgent.indexOf("360se") > 0) {
//                 return "+"; //360浏览器   360se
//             }
//             if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
//                 return "Firefox"; //火狐浏览器 1
//             }
//             if (isCamino = navigator.userAgent.indexOf("Chrome") > 0) {
//                 return "chrome"; //谷歌浏览器   1
//             }
//             if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
//                 return "Gecko"; //Gecko浏览器
//             }
//             if (navigator.userAgent.indexOf("TheWorld ") > 0) {
//                 return "TheWorld"; //世界之窗浏览器
//             }
//             if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
//                 return "Safari"; //苹果浏览器
//             }
//         },
//         dayplusformat: function(DDate, ADate) {
//             var _dayplusformat = '';
//             if (this.getUTCDate(DDate).getDate() != this.getUTCDate(ADate).getDate()) {
//                 if (((ADate - DDate) / 86400) > 0) {
//                     _dayplusformat = ' +' + Math.ceil((ADate - DDate) / 86400) + 'D';
//                 } else {
//                     _dayplusformat = Math.floor((ADate - DDate) / 86400) + 'D';
//                 }
//             }
//             return _dayplusformat;
//         },
//         pushUbtAbResult:function(pageid,abresult){
//             if(abresult==""||pageid=="") return;
//             if(typeof window['__bfi'] == 'undefined'){
//                 window['__bfi'] = [];
//             }
//             window.__bfi.push([
//                 "_asynRefresh",
//                 {
//                     ab_testing_tracker: abresult,
//                     page_id: pageid,
//                     url: window.location.href
//                 },
//                 function(){}
//             ]);
//         },
//         pushUbtOrderID:function(pageid,orderid){
//             if(abresult==""||pageid=="") return;
//             if(typeof window['__bfi'] == 'undefined'){
//                 window['__bfi'] = [];
//             }
//             window.__bfi.push([
//                 "_asynRefresh",
//                 {
//                     orderid: orderid,
//                     page_id: pageid,
//                     url: window.location.href
//                 },
//                 function(){}
//             ]);
//         },
//     };
// });
