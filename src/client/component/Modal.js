const m = require('mithril');
const s = require('mithril-stream');
const a = require('animejs');
const is = require('is_js');
const Modal = {
    oninit: v => {
        v.attrs = v.attrs || {};
        if (is.undefined(v.attrs.is_show)) {
            v.attrs.is_show = true;
        }
        let doToggle = v.attrs.doToggle;
    },

    view: v => {
        let is_show = is.not.undefined(v.attrs.is_show) ? v.attrs.is_show : v.state.is_show;
        return m(
            '.my-modal',
            {
                style: {
                    top: 0,
                    justifyContent: 'center',
                    paddingTop: '100px',
                    display: v.attrs.toggle ? 'flex' : 'none',
                    background: 'rgba(192,192,192,0.8)',
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    zIndex: 9999,
                },
                onclick: v.attrs.doToggle,
            },
            m('', {}),
            m(
                '',
                {
                    style: {
                        minWidth: '20%',
                        minHeight: '20%',
                        position: 'absolute',
                        backgroundColor: 'white',
                        zIndex: 9999,
                    },
                    onclick: e => {
                        e.stopPropagation();
                    },
                },
                m('i.far.fa-times-circle.f4.pa1', {
                    style: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    },
                    onclick: v.attrs.doToggle,
                }),
                v.children,
            ),
        );
    },
};
module.exports = Modal;
