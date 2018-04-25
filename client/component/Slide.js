import m from 'mithril';
import s from 'mithril-stream';
const Slide = {
    oninit: v => {
        v.state.text = s('Slide');
    },
    view: v => m('div', v.state.text, v.children),
};
export default Slide;
