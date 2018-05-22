const toHTML = require('mithril-node-render');
const m = require('mithril');
const s = require('mithril-stream');
const topbar = {
    view: v => m('h1', 'topbar'),
};
const header = {
    view: v => m('h1', 'layout', v.children),
};
const layout = {
    oninit: v => {
        v.state.text = s('1');
    },
    view: v => m('div', [m(topbar), m(header, v.state.text(), v.children)]),
};

const body = {
    view: v => m('div', 'body'),
};
module.exports = function(options = {}) {
    return function mydemo(req, res, next) {
        console.log('mydemo middleware is running');
        toHTML(m(layout, m(body)))
            .then(html => res.send(html))
            .catch(next);
    };
};
