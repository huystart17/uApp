import Home from './entity/page/Home.js';
import m from 'mithril';
import LayoutOneColumn from './layout/LayoutOneColumn.js';
import {DEFAULT_ROUTE} from './config.js';
import Login from './entity/member/Login.js';
let defaultLayout = (component, attr = {}) => ({view: () => m(LayoutOneColumn, {attr}, m(component))});

export const routes = {
    [DEFAULT_ROUTE]: defaultLayout(Home),
    '/login': defaultLayout(Login),
};
