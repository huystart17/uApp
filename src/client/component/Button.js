const m = require('mithril');
const s = require('mithril-stream');
const Button = {
    oninit: v => {
        v.state.text = s('Button');
        v.attrs = v.attrs || {
            class: 'b--black-30',
        };
    },
    view: v => m('button.ph2.pv1', v.attrs, v.children),
    primary: {
        oninit: v => {
            v.state.text = s('Button');
            v.attrs = v.attrs || {
                class: 'b--black-30 white bg-blue',
            };
        },
        view: v => m('button.pv2.ph2', v.attrs, v.children),
    },
    secondary : {
        oninit: v => {
            v.state.text = s('Button');
            v.attrs = v.attrs || {
                class: 'b--black-30 white bg-blue',
            };
        },
        view: v => m('button.pv2.ph2', v.attrs, v.children),
        
    }
};

module.exports = Button;
