webpackJsonp([1],{0:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}l(118),l(117);var a=l(241),u=n(a),r=l(7),c=n(r),d=l(76),o=l(109);console.log((0,u.default)("body"));var i={color:"red"},f=function(e){var t=e.children;return c.default.createElement("div",null,c.default.createElement("h1",null,"APP!"),c.default.createElement("ul",null,c.default.createElement("li",null,c.default.createElement(o.Link,{to:"/",activeStyle:i},"/")),c.default.createElement("li",null,c.default.createElement(o.IndexLink,{to:"/",activeStyle:i},"/ IndexLink")),c.default.createElement("li",null,c.default.createElement(o.Link,{to:"/users",activeStyle:i},"/users")),c.default.createElement("li",null,c.default.createElement(o.IndexLink,{to:"/users",activeStyle:i},"/users IndexLink")),c.default.createElement("li",null,c.default.createElement(o.Link,{to:"/users/lbin",activeStyle:i},"/users/lbin")),c.default.createElement("li",null,c.default.createElement(o.Link,{to:{pathname:"/users/lbin",query:{foo:"bar"}},activeStyle:i},"/users/lbin?foo=bar"))),t)},m=function(){return c.default.createElement("div",null,c.default.createElement("h2",null,"Index!"))},s=function(e){var t=e.children;return c.default.createElement("div",null,c.default.createElement("h2",null,"Users"),t)},E=function(){return c.default.createElement("div",null,c.default.createElement("h3",null,"UsersIndex"))},v=function(e){var t=e.params.name;return c.default.createElement("div",null,c.default.createElement("h3",null,"User : ",t))};(0,d.render)(c.default.createElement(o.Router,{key:Math.random(),history:o.browserHistory},c.default.createElement(o.Route,{path:"/",component:f},c.default.createElement(o.IndexRoute,{component:m}),c.default.createElement(o.Route,{path:"users",component:s},c.default.createElement(o.IndexRoute,{component:E}),c.default.createElement(o.Route,{path:":name",component:v})))),document.getElementById("app"))},117:function(e,t){},118:function(e,t){},241:function(e,t){e.exports=window.$}});