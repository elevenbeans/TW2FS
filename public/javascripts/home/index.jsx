'use strict'

import '../../stylesheets/global.less';
import '../../stylesheets/flight.less';

import $ from 'zepto';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

import Home from 'home';
import Flight from 'flight';
import Train from 'train';
import Hotel from 'hotel';

if(module.hot && process.env.NODE_ENV === 'dev-HMR') module.hot.accept();

console.log('process.env.NODE_ENV in Front-end:',process.env.NODE_ENV);

console.log($('body'));

console.log('flight:',Flight);
console.log('train:',Train)
console.log('hotel:',Hotel)

const ACTIVE = { color: 'red'};

const App = ({ children }) => (
  <div>
    <h1>APP!</h1>

    {children}

  </div>
)

render((<Router key={Math.random()} history={browserHistory} >
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="flight" component={Flight}></Route>
          </Route>
        </Router>
  ), document.getElementById('app')
)
