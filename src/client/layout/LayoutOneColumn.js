const m = require('mithril');
const s = require('mithril-stream');
const Header = require('./Header.js');
const Topbar = require('./Topbar.js');
const Modal = require('../component/Modal.js');
const Login = require('../entity/member/Login.js');
const Slide = require('../component/Slide.js');
const LayoutOneColumn = {
    oninit: v => {
        v.state.text = s('Hello');
        v.state.show_login = s(false);
    },
    view: v =>
        m(
            '.container',
            m(Topbar),
            m(Header),
            m(Slide),
            v.children,

            /*Các module global cài cắm*/
            m(
                Modal,
                {
                    header: ' ',
                    show: v.state.show_login(),
                },
                m(Login),
            ),
        ),
};
module.exports = LayoutOneColumn;
