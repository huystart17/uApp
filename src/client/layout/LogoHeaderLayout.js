const m = require('mithril');
const s = require('mithril-stream');
const app = require('../app.js');
const HeadlessLayout = {
    oninit: v => {
        v.state.text = s('HeadlessLayout');
    },
    view: v => [
        m('div.bg-black-10.h-100', m('.db.bg-white.tc.pv3', m('img.h2', {src: app.logo.src})), v.children),
        m(
            '.db.bg-white.fixed.bottom-0.w-100.pv1.tc',
            'Được tài trợ bởi abc',
            m('.db.pv1', m('small', 'Địa chỉ: 30 khuất duy tiến ')),
        ),
    ],
};
module.exports = HeadlessLayout;
