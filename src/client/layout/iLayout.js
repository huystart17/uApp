const m = require('mithril');
const s = require('mithril-stream');
const iHeader = require('../component/iHeader.js');

const iLayout = {
    oninit: v => {
        v.state.text = s('iLayout');
    },
    view: v => m('.bg-black-90.h-100', m('.center.w-100-ns.w-80-m.w-70-l.db', m(iHeader), v.children)),
};
module.exports = iLayout;
