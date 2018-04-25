import m from 'mithril';
import {routes} from './route.js';
import {DEFAULT_ROUTE} from './config.js';
let root = document.body;
m.route(root, DEFAULT_ROUTE, routes);
