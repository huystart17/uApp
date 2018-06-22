const m = require('mithril');
const s = require('mithril-stream');
const c = require('../component/index_component.js');
const iHeader = require('../component/iHeader.js');

const Footer = require('../layout/Footer.js');
const iLayout = {
    oninit: v => {
        v.state.text = s('iLayout');
    },
    view: v => [m(iHeader), m('.bg-light-gray.pv3', m('.center.w-100-ns.w-80-m.w-70-l.db', v.children)), m(Footer)],
};
module.exports = iLayout;
