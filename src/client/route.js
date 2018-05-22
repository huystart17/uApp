const m = require('mithril');
const config = require('./config.js');

const iLayout = require('./layout/iLayout.js');
const DEFAULT_ROUTE = config.DEFAULT_ROUTE;
const userComponent = require('./entity/member/member_index.js').Component;

let defaultLayout = iLayout;
let LogoHeaderLayout = require('./layout/LogoHeaderLayout.js');

let view = (component, attrs) => {
    attrs = attrs || {};
    component = component || {view: () => 'Thiếu nội dung '};
    return {view: () => m(defaultLayout, attrs, m(component))};
};

let simpleView = (component, attrs) => {
    attrs = attrs || {};
    component = component || {view: () => 'Thiếu nội dung '};
    return {view: () => m(LogoHeaderLayout, attrs, m(component))};
};

module.exports = {
    default_route: {
        title: 'Trang chủ',
        component: view(),
        route: DEFAULT_ROUTE,
    },
    home: {
        title: 'Trang nha',
        component: view({view: () => 'hello'}),
        route: '/hello',
    },
    lending: {
        title: 'Thuê thợ ',
        component: view({view: () => 'hello'}),
        route: '/lend',
    },
    /*route group cho member*/
    register: {
        title: 'Đăng ký tài khoản',
        component: simpleView(userComponent.Register),
        route: '/register',
    },
};
