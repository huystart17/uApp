const m = require('mithril');
const s = require('mithril-stream');

const Login = {
    oninit: v => {
        v.state.text = s('Đăng nhập tài khoản Latona');
    },
    view: v =>
        m(
            'div.container',
            m(
                '.columns',
                m(
                    '.column.col-8.col-mx-auto',
                    m('h4.text-primary', v.state.text),

                    m(
                        '.form-group',
                        m('label.form-label', 'Tài khoản'),
                        m(
                            '.has-icon-right',
                            m('input.form-input[type=text]', {
                                placeholder: 'Email hoặc số điện thoại của bạn... ',
                            }),
                            m('i.form-icon.fas.fa-envelope'),
                        ),
                    ),
                    m(
                        '.form-group',
                        m('label.form-label', 'Mật khẩu'),
                        m(
                            '.has-icon-right',
                            m('input.form-input[type=password]', {placeholder: 'Điền mật khẩu... '}),
                            m('i.form-icon.fas.fa-key'),
                        ),
                    ),
                    m(
                        '.form-group.text-center',

                        m(
                            'button.btn.btn-wide.btn-primary.mx-1',

                            m('i.fas.fa-user'),
                            ' Đăng nhập ',
                        ),
                        m(
                            'button.btn.btn-wide.mx-1',

                            m('i.fas.fa-plus'),
                            ' Đăng ký ',
                        ),
                    ),
                    m(
                        '.form-group.text-center.text-danger',

                        m('small', m('btn.btn-link', 'Quên mật khẩu')),
                    ),
                ),
            ),
        ),
};
module.exports = Login;
