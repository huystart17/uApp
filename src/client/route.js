const m = require('mithril');
const config = require('./config.js');

const iLayout = require('./layout/iLayout.js');
const DEFAULT_ROUTE = config.DEFAULT_ROUTE;
const userComponent = require('./entity/user/user_index.js').Component;
const profileComponent = require('./entity/profile/profile_index.js').Component;

let defaultLayout = iLayout;
let LogoHeaderLayout = require('./layout/LogoHeaderLayout.js');
const components = require('./component/index_component.js');

let view = (component, attrs, children) => {
    attrs = attrs || {};
    component = component || {view: () => 'Thiếu nội dung '};
    return {view: () => m(defaultLayout, attrs, m(component, children))};
};

let simpleView = (component, attrs) => {
    attrs = attrs || {};
    component = component || {view: () => 'Thiếu nội dung '};
    return {view: () => m(LogoHeaderLayout, attrs, m(component))};
};

module.exports = {
    default_route: {
        title: 'Trang chủ',
        component: view(profileComponent.ProfileHome),
        route: DEFAULT_ROUTE,
    },
    home: {
        title: 'Trang nhà',
        component: view({view: () => 'hello'}),
        route: '/hello',
    },
    map: {
        title: 'Tra theo bản đồ',
        component: view(components.Map),
        route: '/map',
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
    /*profile -  route */
    profile_list: {
        title: 'Danh sách các tiệm cắt tóc',
        component: simpleView(profileComponent.ProfileHome),
        route: '/profile',
    },
    profile: {
        title: 'Trang cửa hàng',
        component: view(profileComponent.ProfileDetail, m(profileComponent.ProfileDetailSaleCampaign)),
        route: '/profile/:profile_id',
    },
    profile: {
        title: 'Bình luận - Trang cửa hàng',
        component: view(profileComponent.ProfileDetail),
        route: '/profile/:profile_id/comment',
    },
};
