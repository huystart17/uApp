const m = require('mithril');
const s = require('mithril-stream');
const Modal = {
    oninit: v => {
        v.state.show = s(v.attrs.show);
        v.state.header = v.attrs.header || 'Modal header';
    },

    onbeforeremove: v => {
        v.dom.classList.add('exit');
        return new Promise(function(resolve) {
            setTimeout(resolve, 500);
        });
    },
    view: v =>
        m(".modal[id='login'].modal-overlay" + (v.state.show() ? '.active' : ''), [
            m("a.modal-overlay[aria-label='Close'][href='#close']"),
            m('.modal-container', [
                m('.modal-header', [
                    m("a.btn.btn-clear.float-right[aria-label='Close'][href='#close']"),
                    m('.modal-title.h5', v.state.header),
                ]),
                m('.modal-body', m('.content', v.children)),
                //                m('.modal-footer', '...'),
            ]),
        ]),
};
module.exports = Modal;
