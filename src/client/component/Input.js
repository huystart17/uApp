const m = require('mithril');
const s = require('mithril-stream');
const Input = {
    oninit: v => {
        v.state.text = s('Input');
        v.attrs = v.attrs || {};

        v.attrs.class = v.attrs.class || '';

        if (v.attrs.isBlock == true) {
            v.attrs.class = v.attrs.class + ' db w-100 f6 ';
        }
    },
    view: v => m('input.ph2.pv2.b--black-30.br2', v.attrs, v.children),
};
module.exports = Input;
