const m = require('mithril');
const app = require('../app.js');
const TopBar = {
    oninit: v => {
        v.state.links = [app.links.home, app.links.book, app.links.discount, app.links.lend];
    },
    view: v =>
        m(
            '.columns.header',
            m('header.navbar.column.col-10.col-mx-auto', [
                m('section.navbar-section.', [
                    v.state.links.map(item =>
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

module.exports = TopBar;
