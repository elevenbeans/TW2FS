/**
 * Created by lbin on 2017/01/15.
 */

import cCoreInherit from 'cCoreInherit';
import Store from 'cStore';

var Lizard ={};

Lizard.S = function(e, t, r) {
    return this.loacaStores || (this.loacaStores = {}),
    this.loacaStores[e] || (this.loacaStores[e] = "SALES" == e ? CommonStore.SalesStore : "SALES_OBJECT" == e ? CommonStore.SalesObjectStore : "UNION" == e ? CommonStore.UnionStore : new cCoreInherit.Class(cStore,{
        __propertys__: function() {
            this.key = e
        }
    })),
    t ? this.loacaStores[e].getInstance().get() && this.loacaStores[e].getInstance().get().hasOwnProperty(t) ? this.loacaStores[e].getInstance().get()[t] : r : this.loacaStores[e].getInstance().get()
}

var IBU_H5_Store = cCoreInherit.Class(Store, {
    __propertys__: function() {
        this.key = 'ibu_h5';
        this.lifeTime = '30D';
    }
});
var _ibu_h5_store = new IBU_H5_Store();

var AdStore1D = cCoreInherit.Class(Store, {
    __propertys__: function() {
        this.key = 'ibu_h5_ad';
        this.lifeTime = '1D';
    }
});
var adStore1D = new AdStore1D();

var SessionStore = cCoreInherit.Class(Store, {
    __propertys__: function() {
        this.key = 'ibu_h5_sesion';
        this.lifeTime = '1H';
    }
});
var _sessionStore = new SessionStore();

var _lang = (restfulApi || {}).APPLANGALIAS || "";
var store = {
    _getStore: function() {
        return Lizard.S(_ibu_h5_store.key);
    },
    _getSessionStore: function() {
        return Lizard.S(_sessionStore.key);
    },
    getItem: function(key) {
        return this._getStore() && this._getStore()[key + _lang];
    },
    setItem: function(key, value) {
        var obj = this._getStore() ? this._getStore() : {};
        obj[key + _lang] = value;
        _ibu_h5_store.set(obj);
    },
    removeItem: function(key) {
        _ibu_h5_store.removeAttr(key + _lang);
    },
    getItemWithoutLang: function(key) {
        return this._getStore() && this._getStore()[key];
    },
    setItemWithoutLang: function(key, value) {
        var obj = this._getStore() ? this._getStore() : {};
        obj[key] = value;
        _ibu_h5_store.set(obj);
    },
    removeItemWithoutLang: function(key) {
        _ibu_h5_store.removeAttr(key);
    },
    getSessionItem: function(key) {
        return this._getSessionStore() && this._getSessionStore()[key + _lang];
    },
    setSessionItem: function(key, value) {
        var obj = this._getSessionStore() ? this._getSessionStore() : {};
        obj[key + _lang] = value;
        _sessionStore.set(obj);
    },
    removeSessionItem: function(key) {
        _sessionStore.removeAttr(key + _lang);
    },
    clear: function() {
        _ibu_h5_store.remove();
    },
    saveAdClick: function() {
        var obj = {};
        obj[this.keys.ads.day_click] = true;
        adStore1D.set(obj);
        this.saveAdClickTimes();
    },
    getAdClick: function() {
        var adClickStore = Lizard.S(adStore1D.key);
        return adClickStore && adClickStore[this.keys.ads.day_click];
    },
    saveAdClickTimes: function() {
        var times = this.getAdClickTimes() + 1;
        return this.setItem(this.keys.ads.click_times, times);
    },
    getAdClickTimes: function() {
        return this.getItem(this.keys.ads.click_times) || 0;
    },
    key: function() {

    },
    compareAddItem: function(list, data, key, otherKey, arrLen) {
        arrLen = arrLen || 5;
        var arr = [data];
        if (list && list.length) {
            for (var i = 0, len = list.length; i < len; i++) {
                if ((list[i][key] + list[i][otherKey]) !==
                    (data[key] + data[otherKey]) && arr.length < arrLen) {
                    arr.push(list[i]);
                }
            }
        }
        return arr;
    },
    saveSearchedHotels: function(data) {
        var list = this.getItem(this.keys.hotels.searched_hotels) || [],
            arr = this.compareAddItem(list, data, 'CityID', 'CityENname', 15);
        this.setItem(this.keys.hotels.searched_hotels, arr);
        return arr;
    },
    getSearchedHotels: function() {
        return this.getItem(this.keys.hotels.searched_hotels);
    },
    saveSearchedFlights: function(data) {
        var list = this.getItem(this.keys.flights.searched_flights) || [],
            arr = this.compareAddItem(list, data, 'fromCityENname', 'toCityENname', 15);
        this.setItem(this.keys.flights.searched_flights, arr);
        return arr;
    },
    getSearchedFlights: function() {
        return this.getItem(this.keys.flights.searched_flights);
    },
    saveViewedHotels: function(data) {
        var list = this.getItem(this.keys.hotels.viewed_hotels) || [],
            arr = this.compareAddItem(list, data, 'HotelID', 'HotelEName', 15);
        this.setItem(this.keys.hotels.viewed_hotels, arr);
        return arr;
    },
    getViewedHotels: function() {
        return this.getItem(this.keys.hotels.viewed_hotels);
    },
    saveChannelIndex: function(index) {
        return this.setItem(this.keys.home.channel_index, index);
    },
    getChannelIndex: function() {
        return this.getItem(this.keys.home.channel_index);
    },
    saveContactInfo: function(data) {
        this.setItem(this.keys.chinaflights.contact_info, data);
        return data;
    },
    getContactInfo: function() {
        return this.getItem(this.keys.chinaflights.contact_info);
    },
    saveAddedPassengers: function(data) {
        this.setItem(this.keys.flights.added_passengers, data);
        return data;
    },
    getAddedPassengers: function() {
        return this.getItem(this.keys.flights.added_passengers);
    },
    saveHotelRoomInfo: function(data) {
        this.setItem(this.keys.hotels.book_hotel_room, data);
        return data;
    },
    getHotelRoomInfo: function() {
        return this.getItem(this.keys.hotels.book_hotel_room);
    },
    saveTopHotelCity: function(data) {
        this.setItem(this.keys.hotels.top_hotel_city, data);
        return data;
    },
    getTopHotelCity: function() {
        return this.getItem(this.keys.hotels.top_hotel_city);
    },
    saveStayingInRecent: function(data) {
        this.setItem(this.keys.hotels.staying_in_recent, data);
        return data;
    },
    getStayingInRecent: function() {
        return this.getItem(this.keys.hotels.staying_in_recent);
    },
    saveAirportRecent: function(data) {
        this.setItem(this.keys.flights.airport_from_recent, data);
        return data;
    },
    getAirportRecent: function() {
        return this.getItem(this.keys.flights.airport_from_recent);
    },
    saveTopCityFrom: function(data) {
        this.setItem(this.keys.flights.top_city_from, data);
        return data;
    },
    getTopCityFrom: function() {
        return this.getItem(this.keys.flights.top_city_from);
    },
    saveTopCityTo: function(data) {
        this.setItem(this.keys.flights.top_city_to, data);
        return data;
    },
    getTopCityTo: function() {
        return this.getItem(this.keys.flights.top_city_to);
    },
    saveCurrencyData: function(data) {
        this.setItem(this.keys.home.currency_data, data);
        return data;
    },
    getCurrencyData: function() {
        return this.getItem(this.keys.home.currency_data);
    },
    saveFlightRoundType: function(data) {
        this.setItem(this.keys.home.flight_round_type, data);
        return data;
    },
    getFlightRoundType: function() {
        return this.getItem(this.keys.home.flight_round_type);
    },
    saveFlightGaInfo: function(data) {
        this.setItem(this.keys.ga.flightOrder, data);
        return data;
    },
    getFlightGaInfo: function() {
        return this.getItem(this.keys.ga.flightOrder);
    },
    saveFlightGaEcInfo: function(data) {
        this.setItem(this.keys.ga.flightEcInfo, data);
        return data;
    },
    getFlightGaEcInfo: function() {
        return this.getItem(this.keys.ga.flightEcInfo);
    },
    saveHotelGaInfo: function(data) {
        this.setItem(this.keys.ga.hotelOrder, data);
        return data;
    },
    getHotelGaInfo: function() {
        return this.getItem(this.keys.ga.hotelOrder);
    },
    saveHotelGaEcInfo: function(data) {
        this.setItem(this.keys.ga.hotelEcInfo, data);
        return data;
    },
    getHotelGaEcInfo: function() {
        return this.getItem(this.keys.ga.hotelEcInfo);
    },
    saveGuestList: function(data) {
        this.setItem(this.keys.hotels.guest_list_last, data);
        return data;
    },
    getGuestList: function() {
        return this.getItem(this.keys.hotels.guest_list_last);
    },
    saveGuestIds: function(data) {
        this.setItem(this.keys.hotels.guest_list_last_ids, data);
        return data;
    },
    getGuestIds: function() {
        return this.getItem(this.keys.hotels.guest_list_last_ids);
    },
    keys: {
        ga: {
            flightOrder: 'ga_fl_od',
            hotelOrder: 'ga_ht_od',
            flightEcInfo: 'ga_flt_ec',
            hotelEcInfo: 'ga_htl_ec'
        },
        home: {
            channel_index: 'h_cl_i',
            currency_data: 'h_cu_d',
            flight_round_type: 'h_fl_r_t',
            isIntl: 'h_is_Intl',
            service_num_data: 'h_ser_n_d',
            nearby_airport: 'h_nby_arprt'
        },
        hotels: {
            guest_list_last: 'ht_g_ls',
            guest_list_last_ids: 'ht_g_l_ids',
            staying_in_recent: 'ht_st_i_r',
            searched_hotels: 'ht_sh_hts',
            viewed_hotels: 'ht_vd_hts',
            book_hotel_room: 'ht_b_h_r',
            top_hotel_city: 'ht_t_h_c',
            last_staying_in: 'ht_last_staying_in',
            last_check_in: 'ht_last_check_in',
            last_check_out: 'ht_last_check_out'
        },
        chinaflights: {
            detail_data: 'cf_d_d',
            insurance_List: 'cf_list',
            contact_info: 'cf_ct_if',
            added_adult: 'fl_ad_ad',
            added_child: 'fl_ad_ch',
            added_infant: 'fl_ad_in',
            has_insurance: 'fl_has_insu',
            list_srch_data: 'ls_chf_searchdatas',
            list_srch_filter: 'ls_chf_searchfilter',
            list_srch_orderby: 'ls_chf_orderby',
            list_srch_sortby: 'ls_chf_sortby',
            list_f1_pkey: 'ls_chf1_ProductKeyInfo',
            list_f2_pkey: 'ls_chf2_ProductKeyInfo',
            book_cbk_url: 'book_callback_url',
            list_sh_dt_dcity: 'list_sh_dt_dcity',
            list_sh_dt_acity: 'list_sh_dt_acity',
        },
        flights: {
            top_city_from: 'fl_to_c_fr',
            top_city_to: 'fl_to_c_to',
            airport_from_recent: 'fl_a_fr_r',
            detail_data: 'fl_d_d',
            searched_flights: 'fl_vd_fls',
            added_passengers: 'fl_ad_ps',
            added_adult: 'fl_ad_ad',
            added_child: 'fl_ad_ch',
            added_infant: 'fl_ad_in',
            has_insurance: 'fl_has_insu',
            insurance_List: 'cf_list',
            last_from_city: 'fl_last_from_city',
            last_to_city: 'fl_last_to_city',
            recent_from_city: 'fl_recent_from_city',
            recent_to_city: 'fl_recent_to_city',
            last_depart_date: 'fl_last_depart_date',
            last_return_date: 'fl_last_return_date',
            last_class: 'fl_last_class',

            list_srch_data: 'ls_intlf_searchdatas',
            list_srch_filter: 'ls_intlf_searchfilter',
            list_srch_orderby: 'ls_intlf_orderby',
            list_srch_sortby: 'ls_intlf_sortby',
            list_f1_pkey: 'ls_intlf1_ProductKeyInfo',
            list_f2_pkey: 'ls_intlf2_ProductKeyInfo',
            book_cbk_url: 'book_callback_url',
            book_one_info: 'book_one_info',
            book_Next_info: 'book_Next_info',
            list_sh_dt_dcity: 'list_sh_dt_dcity',
            list_sh_dt_acity: 'list_sh_dt_acity',
            gointfirstflightinfo: 'gointfirstflightinfo',

        },
        trains: {
            recent_from_city: 'ts_recent_from_city',
            recent_to_city: 'ts_recent_to_city',
            last_from_city: 'ts_last_from_city',
            last_to_city: 'ts_last_to_city',
            last_depart_date: 'ts_last_depart_date'
        },
        accounts: {

        },
        ads: {
            day_click: 'ads_d_c',
            click_times: 'ads_c_t'
        }
    }
};

export default store;