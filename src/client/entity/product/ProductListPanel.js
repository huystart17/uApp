const is = require('is_js');
const m = require('mithril');
const s = require('mithril-stream');
const app = require('../../app.js');
const get = require('../../../shared/helper/lib.js').get;
const f = require('faker');
const b = require('bss');
const ProductListPanel = {
    oninit: v => {
        v.state.text = s('');
        v.attrs = v.attrs || {};
        v.attrs.cols = is.not.number(v.attrs.cols) ? 5 : v.attrs.cols;
        v.attrs.rows = is.not.number(v.attrs.rows) ? 2 : v.attrs.rows;

        v.state.list = s(
            Array.from(Array(v.attrs.rows * v.attrs.cols)).map(
                (item, index) => (index < app.shop_list.length ? app.shop_list[index] : {}),
            ),
        );
        v.state.rows = s(
            Array.from(Array(v.attrs.rows).keys()).map((item, index) =>
                v.state.list().slice(index * v.attrs.cols, v.attrs.cols * (index + 1)),
            ),
        );

        v.state.activeTabs = app.group.discount.key;

        v.attrs.show = is.not.object(v.attrs.show) ? {comment: false} : v.attrs.show;
    },

    formatRow: (v, item) =>
        m(
            '.mt1.w-50',

            is.empty(item) && '',
            is.not.empty(item) &&
                m(
                    '.ba.b--black-10.ma1.bg-white.br1',
                    m('', m('img', {src: app.slides[0].src})),
                    m(
                        '.f5.mv2.hover-red.pointer',
                        m(
                            'a.pl2.link.tn.black',
                            {
                                oncreate: m.route.link,
                                href: '/profile/1',
                            },
                            item.title,
                        ),
                        m('.pl2.gray.pv2', m('small', item.subtitle)),
                    ),

                    is.truthy(get.object(v.attrs.show).comment)
                        ? m(
                              '.db.pv2',
                              {
                                  style: {
                                      borderBottom: '1px solid #f8f8f8',
                                      borderTop: '1px solid #f8f8f8',
                                  },
                              },
                              m(
                                  'table',
                                  m(
                                      'tr',
                                      m(
                                          'td',
                                          m(
                                              'div',
                                              {style: {width: 40, height: 40}},
                                              m('img.br-100', {src: app.default_avatar.src}),
                                          ),
                                      ),
                                      m(
                                          'td',
                                          m('small', m('b', 'Nguyễn Văn A'), '  ', 'Các bạn ở tiệm rất nhiệt tình'),
                                      ),
                                  ),
                              ),
                          )
                        : '',
                    m(
                        'div.b.f6.pl2.pv2',
                        {
                            style: {
                                borderTop: '1px solid #f8f8f8',
                            },
                        },
                        m('i.far.fa-clock.mr2'),
                        item.notice,
                    ),
                ),
        ),

    onChangeTab: (v, item) => {
        v.state.activeTabs = item.key;
    },
    view: v =>
        m(
            'div.ba.b--black-10.bg-light-gray',
            m(
                '.bg-black',
                m(
                    '.panel-title.white.text-large.b',
                    m('i.fa.fa-user.dib.ph2.pv2'),
                    Object.values(app.group).map(item =>
                        m(
                            'span.dib.ph2.pv3.white.pointer',
                            {
                                style: {
                                    color: item.key === v.state.activeTabs ? 'black' : 'white',
                                    backgroundColor: item.key === v.state.activeTabs ? 'white' : 'black',
                                    textDecoration: item.key === v.state.activeTabs ? 'underline' : '',
                                },
                                onclick: () => v.state.onChangeTab(v, item),
                                key: item.key,
                            },
                            item.name,
                        ),
                    ),
                ),
            ),
            m('.pa2', v.state.rows().map(list => m('.flex', list.map(item => v.state.formatRow(v, item))))),
            v.state.text,
            v.children,
        ),
};
module.exports = ProductListPanel;
