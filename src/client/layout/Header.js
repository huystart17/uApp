const m = require('mithril');
const app = require('../app.js');

const Header = {
    view: () =>
        m(
            '.columns.header.bg-white',
            m(
                'header.navbar.column.col-10.col-md-12.col-mx-auto.py-2.my-header',
                m(
                    '.column.navbar-section.hide-md',
                    m('img.nav-logo', {src: app.logo.src}),
                    m(
                        '.btn-group',
                        m(
                            '.dropdown.d-inline-block.mx-2',
                            m('.btn-group', [
                                m("a.btn-wide.btn[href='#']", 'Hà nội'),
                                m("a.btn.dropdown-toggle[href='#'][tabindex='0']", m('i.icon.icon-caret')),
                                m('ul.menu', '...'),
                            ]),
                        ),
                        m(
                            '.dropdown.d-inline-block.mx-2',
                            m('.btn-group', [
                                m('a.btn-wide.btn[]', 'Làm đầu'),
                                m('a.btn.dropdown-toggle[tabindex=0]', m('i.icon.icon-caret')),
                                m('ul.menu', '...'),
                            ]),
                        ),
                    ),
                ),
                m(
                    '.column.navbar-center',
                    m(
                        '.input-group',
                        m(
                            '.form-group',
                            m(
                                '.has-icon-left',
                                m('input.form-input.header-search[name=search][type=search]', {
                                    placeholder: 'Thợ làm đầu, salon, mỹ phẩm...',
                                }),
                                m('.form-icon fa fa-shower'),
                            ),
                        ),
                        m('button.btn', m('i.fas.fa-search'), 'Tìm kiếm '),
                    ),
                ),
                m(
                    '.column.navbar-section',
                    m(
                        '.btn-group',

                        m('a.btn.form-group', m('i.fas.fa-bell')),
                        m(
                            'a.btn.btn-wide',
                            {
                                href: app.links.login_modal.href,
                                //                                oncreate: m.route_modal.link,
                            },
                            app.links.login_modal.text,
                        ),
                    ),
                ),
            ),
        ),
};

module.exports = Header;
