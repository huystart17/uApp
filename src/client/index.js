const m = require('mithril');
const routes = require('./route.js');
const CONFIG = require('./config.js');
let root = document.body;
let appRoutes = {};
Object.values(routes).forEach(item => {
    appRoutes[item.route] = item.component;
});
m.route(root, CONFIG.DEFAULT_ROUTE, appRoutes);

const client = require('./request.js');
