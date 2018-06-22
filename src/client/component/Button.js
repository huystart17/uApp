const m = require('mithril');
const s = require('mithril-stream');
const Button = {
    oninit: v => {
        v.state.text = s('Button');
        v.attrs = v.attrs || {
            class: 'bn',
        };
    },
    view: v => m('button.ph2', v.attrs, v.children),
    primary: {
        oninit: v => {
            v.state.text = s('Button');
            v.attrs = v.attrs || {
                class: 'b--black-30 bn white bg-blue',
            };
            if (v.attrs.isBlock) {
                v.attrs.class = v.attrs.class + ' db w-100 ';
            }
        },
        view: v => m('button.pv2.ph2.white.bg-blue.b--black-30.br2.f6', v.attrs, v.children),
    },
    social: {
        facebook: {
            view: v =>
                m(
                    'button.pv2.ph2.white.bg-black.b--black-30.br2.tl.f6',
                    v.attrs,
                    m('i.fab.fa-facebook.mh2'),
                    v.children,
                ),
        },
        google: {
            view: v =>
                m(
                    'button.pv2.ph2.white.bg-black.b--black-30.br2.tl.f6',
                    v.attrs,
                    m('i.fab.fa-google.mh2'),
                    v.children,
                ),
        },
    },
    secondary: {
        oninit: v => {
            v.state.text = s('Button');
            v.attrs = v.attrs || {
                class: 'b--black-30 white bg-blue',
            };
            if (v.attrs.isBlock) {
                v.attrs.class = v.attrs.class + ' db w-100 ';
            }
        },
        view: v => m('button.pv2.ph2', v.attrs, v.children),
    },
};

module.exports = Button;
