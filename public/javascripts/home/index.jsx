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

const ACTIVE = { color: 'blue'};

const App = ({ children }) => (
  <div>
    <h1>APP!</h1>
    <ul>
      <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
      <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

      <li><Link      to="/flight"      activeStyle={ACTIVE}>/flight</Link></li>
      <li><IndexLink to="/flight"      activeStyle={ACTIVE}>/flight IndexLink</IndexLink></li>

      <li><Link      to="/train"      activeStyle={ACTIVE}>/train</Link></li>
      <li><IndexLink to="/train"      activeStyle={ACTIVE}>/train IndexLink</IndexLink></li>

      <li><Link      to="/hotel"      activeStyle={ACTIVE}>/hotel</Link></li>
      <li><IndexLink to="/hotel"      activeStyle={ACTIVE}>/hotel IndexLink</IndexLink></li>

      <li><Link      to="/users/lbin" activeStyle={ACTIVE}>/users/lbin</Link></li>
      <li><Link      to={{ pathname: '/users/lbin', query: { foo: 'bar' } }}
                                      activeStyle={ACTIVE}>/users/lbin?foo=bar</Link></li>
    </ul>

    {children}

  </div>
)

const Users = ({ children }) => (
  <div>
    <h2>Users</h2>
    {children}
  </div>
)

const UsersIndex = () => (
  <div>
    <h3>UsersIndex</h3>
  </div>
)

const User = ({ params: { name } }) => (
  <div>
    <h3>User : {name}</h3>
  </div>
)

render((<Router key={Math.random()} history={browserHistory} >
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="flight" component={Flight}>
              <IndexRoute component={Flight}/>
              <Route path=":name" component={User}/>
            </Route>
            <Route path="train" component={Train}>
              <IndexRoute component={Train}/>
              <Route path=":name" component={User}/>
            </Route>
            <Route path="hotel" component={Hotel}>
              <IndexRoute component={Hotel}/>
              <Route path=":name" component={User}/>
            </Route>
            <Route path="users" component={Users}>
                <IndexRoute component={UsersIndex}/>
                <Route path=":name" component={User}/>
            </Route>

          </Route>
        </Router>
  ), document.getElementById('app')
)
