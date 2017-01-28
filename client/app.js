import React , { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import { render } from 'react-dom';

import routes from './Routes';

import './app.scss'

render(routes, document.getElementById('app'));
