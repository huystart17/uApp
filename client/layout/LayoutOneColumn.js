import is from 'is_js';
import m from 'mithril';
import s from 'mithril-stream';
import app from '../app.js';
const TopBar = {
    oninit: v => {},
    view: v =>
        m(
            '.columns.header',
            m('header.navbar.column.col-10.col-mx-auto', [
                //m('section', m('img', {src: app.ads[0].src})),

                m('section.navbar-section.', [
                    Object.values(app.topbar).map(item =>
                        m(
                            'a.px-2',
                            {
                                key: item.href,
                                href: item.href,
                                class: item.href === m.route.get() ? 'text-bold bg-white' : 'text-secondary',
                                oncreate: m.route.link,
                            },
                            item.text,
                        ),
                    ),
                ]),
            ]),
        ),
};
const Header = {
    view: () =>
        m(
            '.columns.header.bg-white',
            m(
                'header.navbar.column.col-10.col-mx-auto.py-2',
                m(
                    '.navbar-section',
                    m('img.nav-logo', {src: app.logo.src}),
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
                m(
                    '.navbar-center',
                    m(
                        '.form-group',
                        m(
                            '.has-icon-right',
                            m('input.form-input.header-search', {placeholder: 'Tìm kiếm'}),
                            m('.form-icon fa fa-search'),
                        ),
                    ),
                ),
                m('.navbar-section.text-left'),
            ),
        ),
};
const LayoutOneColumn = {
    oninit: v => {
        v.state.text = s('');
    },
    view: v => m('.container', [m(TopBar), m(Header), m('div', v.state.text, v.children)]),
};
export default LayoutOneColumn;
