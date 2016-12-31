'use strict'

import '../../stylesheets/global.less';
import '../../stylesheets/flight.less';

import $ from 'zepto';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

if(module.hot) module.hot.accept();

const ACTIVE = { color: 'red'};

const App = ({ children }) => (
  <div>
    <h1>APP!</h1>
    <ul>
      <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
      <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

      <li><Link      to="/users"      activeStyle={ACTIVE}>/users</Link></li>
      <li><IndexLink to="/users"      activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

      <li><Link      to="/users/lbin" activeStyle={ACTIVE}>/users/lbin</Link></li>
      <li><Link      to={{ pathname: '/users/lbin', query: { foo: 'bar' } }}
                                      activeStyle={ACTIVE}>/users/lbin?foo=bar</Link></li>
    </ul>

    {children}

  </div>
)

const Index = () => (
  <div>
    <h2>Index!</h2>
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

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="users" component={Users}>
        <IndexRoute component={UsersIndex}/>
        <Route path=":name" component={User}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
