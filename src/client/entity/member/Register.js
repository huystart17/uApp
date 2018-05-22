const m = require('mithril');
const s = require('mithril-stream');
const c = require('../../component/index_component.js');
const Register = {
    oninit: v => {
        v.state.text = s('Register');
    },
    view: v =>
        m(
            '.flex.justify-center.item-center.mt4',
            m(
                'form.ph3.bg-light-gray.w-30.pb4.ba.b--black-40.br1',
                m('h4.tc', 'Đăng ký tài khoản '),
                m(c.Button.primary, 'Đăng nhập bằng facebook'),

                m('hr'),
                m(
                    'label.db.mt2',
                    m('.pa1', 'Họ tên'),
                    m(c.Input, {
                        isBlock: true,
                        placeholder: 'Nhập tên của bạn',
                        class: 'f6',
                    }),
                ),
                m(
                    'label.db.mt2',
                    m('.pa1', 'Giới tính'),
                    m(c.Input, {
                        isBlock: true,
                        placeholder: 'Nam/nữ..',
                    }),
                ),

                m(
                    'label.db.mt2',
                    m('.pa1', 'Tên đăng nhập'),
                    m(c.Input, {
                        isBlock: true,
                        placeholder: 'Tên tài khoản',
                    }),
                ),
                m(
                    'label.db.mt2',
                    m('.pa1', 'Mật khẩu'),
                    m(c.Input, {
                        isBlock: true,
                        placeholder: 'Mật khẩu',
                    }),
                ),
            ),

            v.children,
        ),
};
module.exports = Register;
