const m = require('mithril');
const s = require('mithril-stream');
const app = require('../app.js');
const t = require('../theme/theme.js');
const b = require('bss/bss');
const Slide = {
    oninit: v => {
        v.state.text = s('Slide');
        v.state.index = s(0);
    },
    view: v =>
        m(
            'div.bg-dark.w-100',

            m(
                'div.pv2.w-100.overflow-hidden.flex',
                app.slides.map(item =>
                    m('img.w-third.myslide' + b.border('2px solid gray').height('300px'), {src: item.src}),
                ),
            ),
            m(
                'div.tc',
                m(
                    'h4' + b.marginTop(3).marginBottom(6),
                    m('i.fas.fa-arrow-circle-left'),
                    ` ${app.slides[v.state.index()].text}  `,
                    m('i.fas.fa-arrow-circle-right'),
                ),
            ),
        ),
};
module.exports = Slide;
