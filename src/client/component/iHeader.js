const m = require('mithril');
const s = require('mithril-stream');
const app = require('../app.js');
const t = require('../theme/theme.js');

const b = require('bss/bss');
const Slide = require('../component/Slide.js');
const Modal = require('../component/Modal.js');
const Login = require('../entity/user/Login.js');
const iHeader = {
    oninit: v => {
        v.state.text = s('iHeader');
        v.state.is_show_login = true;
        v.state.showLogin = e => {
            v.state.is_show_login = true;
        };
        v.state.toggle = false;
        v.state.doToggle = () => {
            v.state.toggle = !v.state.toggle;
        };
    },

    onupdate: v => {
        console.log(v.state);
    },
    view: v =>
        m('.bg-white', [
            m(
                '.bg-black',
                m(
                    '.flex.center.w-100-ns.w-80-m.w-70-l',
                    Object.values(app.links).map(item =>
                        m(
                            'a.mh1.ph2.pv2.link',

                            {
                                href: item.href,
                                oncreate: m.route.link,
                                class: m.route.get() === item.href ? 'bg-white black' : 'white',
                            },
                            item.text,
                        ),
                    ),
                ),
            ),

            m(
                '.flex.center.w-100-ns.w-80-m.w-70-l.pa1.justify-between.items-center',
                m('.db', m('img' + t.btn + b.maxHeight(30), {src: app.logo.src})),

                m(
                    '.db',
                    m('button' + t.btn, 'TP.HCM', m('i.fas.fa-caret-down.ml2')),
                    m('button' + b.ml(3) + t.btn, 'Cắt tóc', m('i.fas.fa-caret-down.ml2')),
                    m('input' + t.input + b.minWidth(300).ml(3), {
                        placeholder: 'Địa điểm, thương hiệu, nhu cầu... ',
                    }),
                    m('button' + t.btn, m('i.fas.fa-book'), ' Bộ lọc'),
                    m('button' + t.btn + b.ml(3), m('i.fas.fa-bars')),
                ),
                m(
                    '.db',
                    m(
                        'button' + t.btn,
                        {
                            onclick: v.state.doToggle,
                        },
                        'Đăng nhập',
                    ),
                    m('button.ml2' + t.btn, {}, m('i.fas.fa-plus')),
                ),
            ),
            m(Modal, {toggle: v.state.toggle, doToggle: v.state.doToggle}, m('.pa2', m(Login, {compact: true}))),
        ]),
};
module.exports = iHeader;
