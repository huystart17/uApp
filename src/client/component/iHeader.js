const m = require('mithril');
const s = require('mithril-stream');
const app = require('../app.js');

const iHeader = {
    oninit: v => {
        v.state.text = s('iHeader');
    },
    view: v =>
        m(
            '.flex.bg-black',
            Object.values(app.links).map(item =>
                m(
                    'a.mh1.ph2.pv2.link',
                    {
                        href: item.href,
                        oncreate: m.route.link,
                        class: m.route.get() === item.href ? 'bg-white black' : 'white',
                    },
                    item.text,
                ),
            ),
        ),
};
module.exports = iHeader;
