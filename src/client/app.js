const s = require('mithril-stream');
const lib = require('../shared/helper/lib.js');
const link = lib.link;
const assetLink = lib.assetLink;
const f = require('faker/locale/vi');
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
        login_page: link('Đăng ký', '/register'),
        map: link('Bản đồ', '/map'),
    },

    header: {},
    slides: [
        {src: assetLink('/img/slide/1.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/2.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/2.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/2.png'), text: 'Khuyến mãi 30%'},
        {src: assetLink('/img/slide/3.png'), text: 'Khuyến mãi 30%'},
    ],
    default_avatar: {
        src: assetLink('/img/avatar/1.png'),
        text: '',
    },
    shop_detail_menu: {
        home: {
            href: '/profile/home',
            text: 'Trang chủ',
            active: true,
        },
        comment: {
            href: 'prfofile/comment/',
            text: 'Bình luận',
        },

        product: {
            href: 'prfofile/product/',
            text: 'Sản phẩm dịch vụ',
        },
        galery: {
            href: 'profile/galery/:id',
            text: 'Video và hình ảnh',
        },
        map: {
            href: 'profile/map/:id',
            text: 'Bản đồ',
        },
        people: {
            href: 'prfofile/people/',
            text: 'Đội ngũ',
        },
    },
    current_shop: {
        cate: [],

        title: 'Tên cửa hàng cắt tóc',
        subtitle: 'Chúng tôi tự hào vì có thể phục vụ bạn tận tình nhất có thể. Dịch vụ giá rẻ nhưng hiệu quả cao',
        address: {
            text: '30 Phố Huế - Đại La - Hà Nội',
        },
        description: 'Giới thiệu ngắn',
        shop_data: {
            main_cate: 'Chuyên gội đầu',
            work_time: {
                start: '9:00',
                end: '18:00',
            },
            schedule: [
                {time: '8:00', max: 5, book: ['abc@gmail.com', 'nguyenvan-XXX']},
                {time: '9:00', max: 5, book: ['abc@gmail.com', 'nguyenvan-XXX']},
                {time: '10:00', max: 5, book: ['abc@gmail.com', 'nguyenvan-XXX']},
                {time: '11:00', max: 5, book: ['abc@gmail.com', 'nguyenvan-XXX']},
            ],
            products: [
                {name: 'Combo cắt tóc 5 bước', desc: 'Bước 1: ....., Bước 2 :......', price: 50000},
                {name: 'Uốn xoăn + nhuộm đỏ', desc: 'Combo chỉ có trong ngày hôm nay', price: 300000},
                {name: 'Ép tóc', desc: 'Giảm 20% duy nhất tháng 7', price: 600000},
            ],
            average_duration: 30,
            main_img: assetLink('/img/slide/1.png'),
            price_range: {
                high: 50000,
                low: 20000,
            },
        },
    },
    shop_list: [
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
        {
            title: 'Tiệm ' + f.name.firstName() + ' ' + f.name.lastName(),
            subtitle: f.lorem.words(),
            notice: f.lorem.words(),
        },
    ],
    group: {
        discount: {
            name: 'Đang giảm giá',
            type: 'cate',
            key: 'discount',
        },
        combo: {
            name: 'Khuyến mãi combo',
            type: 'cate',
            key: 'combo',
        },
        newOpen: {
            name: 'Mới khai trương',
            type: 'cate',
            key: 'newOpen',
        },
        maleHairCut: {
            name: 'Căt tóc nam ',
            type: 'cate',
            key: 'maleHairCut',
        },
    },
    product: {
        list: [
            {name: '1', subtitle: 'Giảm giá 10%'},
            {name: '2'},
            {name: '3'},
            {name: '4'},
            {name: '5'},
            {name: '6'},
            {name: '7'},
        ],
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
