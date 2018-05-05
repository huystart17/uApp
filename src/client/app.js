const s = require('mithril-stream');
const lib = require('../shared/helper/lib.js');
const link = lib.link;
const assetLink = lib.assetLink;
const APP = {
    site_name: s('Latona'),
    logo: {src: assetLink('/img/logo/logo.png')},
    ads: [{src: assetLink('/img/banner/ads1.jpg')}],
    title: s('LaToNa - Cắt tóc nhanh'),
    links: {
        home: link('Trang chủ - Latona', '/'),
        lend: link('Thuê thợ', '/lend'),
        book: link('Đặt chỗ', '/book'),
        discount: link('Giảm giá mạnh', '/discount'),
        login_page: link('Đăng nhập', '/login'),
        login_modal: link('Đăng nhập', '#login'),
    },

    header: {},
    slides: [
        {src: assetLink('/img/slide/1.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/2.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/3.png'), text: 'Khuyến mãi 30%'},
    ],
    product: {
        list: [1, 2, 3, 4, 5, 6],
        options: {
            page: 1,
            total: 10,
            skip: 10,
        },
        filter: {},
    },
    state: {
        current: {
            route: '/',
        },
    },
};
module.exports = APP;
