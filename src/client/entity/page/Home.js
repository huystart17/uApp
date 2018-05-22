const m = require('mithril');

const ProductListPanel = require('../product/ProductListPanel.js');
const Home = {
    view: v =>
        m(
            '.columns.py-2',
            m(
                '.col-mx-auto.column.col-10',
                m('.mt-3', m(ProductListPanel)),
                m('.mt-3', m(ProductListPanel)),
                m('.mt-3', m(ProductListPanel)),
                m('.mt-3', m(ProductListPanel)),
            ),
        ),
};

module.exports = Home;
