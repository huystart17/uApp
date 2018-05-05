const m = require('mithril');
const s = require('mithril-stream');
const app = require('../app.js');
const Slide = {
    oninit: v => {
        v.state.text = s('Slide');
        v.state.index = s(0);
    },
    view: v =>
        m(
            'div.bg-dark',
            m('div.columns.py-2', app.slides.map(item => m('img.column.col-4 ', {src: item.src}))),
            m(
                'div.text-center',
                m(
                    'h5',
                    m('i.fas.fa-arrow-circle-left'),
                    ` ${app.slides[v.state.index()].text}  `,
                    m('i.fas.fa-arrow-circle-right'),
                ),
            ),
        ),
};
module.exports = Slide;
