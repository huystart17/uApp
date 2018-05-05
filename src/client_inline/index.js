const m = require('mithril');
const b = require('bss');
const s = require('mithril-stream');

let root = document.body;
let Home = {
    view: v => m('h1', 'text'),
};
m.mount(root, Home);
