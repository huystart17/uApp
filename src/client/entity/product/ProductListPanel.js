const m = require('mithril');
const s = require('mithril-stream');
const app = require('../../app.js');
const b = require('bss');
const ProductListPanel = {
    oninit: v => {
        v.state.text = s('');
    },
    view: v =>
        m(
            'div.panel',
            m('.panel-header.bg-white', m('.panel-title.text-large', m('i.fas.fa-warehouse'), ' Các tiệm gần bạn ')),
            m(
                '.panel-body',
                m(
                    '.columns',
                    app.product.list.map(item =>
                        m(
                            '.column.col-3.my-3',

                            m(
                                '.card',
                                m('.card-image', m('img.img-responsive', {src: app.slides[0].src})),
                                m(
                                    '.card-header',
                                    m('.card-title', '30 Shine'),
                                    m('.card-subtitle.text-gray', 'Cắt tóc nhanh, đẹp'),
                                ),
                                m(
                                    '.card-footer.text-right',
                                    m(
                                        '.btn-group',
                                        m('button.btn.btn-sm', 'Đặt lịch'),
                                        m('button.btn.btn-sm', m('i.fas.fa-heart')),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
            v.state.text,
            v.children,
        ),
};
module.exports = ProductListPanel;
