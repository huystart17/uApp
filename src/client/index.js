const m = require('mithril');
const {routes} = require('./route.js');
const CONFIG = require('./config.js');
let root = document.body;
m.route(root, CONFIG.DEFAULT_ROUTE, routes);
