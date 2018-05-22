const is = require('is_js');
const m = require('mithril');
const s = require('mithril-stream');
const app = require('../../app.js');
const b = require('bss');
const ProductListPanel = {
    oninit: v => {
        v.state.text = s('');
        v.attrs = v.attrs || {};
        v.attrs.cols = is.not.number(v.attrs.cols) ? 2 : v.attrs.cols;
        v.attrs.rows = is.not.number(v.attrs.rows) ? 5 : v.attrs.rows;

        v.state.list = s(
            Array.from(Array(v.attrs.rows * v.attrs.cols)).map(
                (item, index) => (index < app.product.list.length ? app.product.list[index] : {}),
            ),
        );
        v.state.rows = s(
            Array.from(Array(v.attrs.rows).keys()).map((item, index) =>
                v.state.list().slice(index * v.attrs.cols, v.attrs.cols * (index + 1)),
            ),
        );
    },

    formatRow: item =>
        m(
            '.column.col.my-3',
            is.not.empty(item) &&
                m(
                    '.card',
                    m('.card-image', m('img.img-responsive', {src: app.slides[0].src})),
                    m(
                        '.card-header',
                        m('.card-title', '30 Shine'),
                        m('.card-subtitle.text-gray', 'Cắt tóc nhanh, đẹp', item.name),
                    ),
                    is.not.empty(item.subtitle) &&
                        m('small.card-footer.text-left.primary', m('i.fas.fa-heart'), ' ', item.subtitle),
                ),
        ),
    view: v =>
        m(
            'div.panel',
            m(
                '.panel-header.bg-white',
                m(
                    '.panel-title.text-large',
                    {
                        onclick: e => {
                            console.log(v.state.rows());
                        },
                    },
                    m('i.fas.fa-warehouse'),
                    ' Các tiệm gần bạn ',
                ),
            ),
            m('.panel-body', v.state.rows().map(list => m('.columns', list.map(v.state.formatRow)))),
            v.state.text,
            v.children,
        ),
};
module.exports = ProductListPanel;
