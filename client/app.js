import s from 'mithril-stream';
import {assetLink, link} from '../shared/helper/lib.js';
const APP = {
    site_name: s('Latona'),
    logo: {src: assetLink('/img/logo/logo.png')},
    ads: [{src: assetLink('/img/banner/ads1.jpg')}],
    title: s('LaToNa - Cắt tóc nhanh'),
    topbar: {
        home: link('Trang chủ', '/'),
        lend: link('Thuê thợ', '/lend'),
        book: link('Đặt chỗ', '/book'),
        discount: link('Giảm giá', 'discount'),
    },
    header: {},
    state: {
        current: {
            route: '/',
        },
    },
};
export default APP;
