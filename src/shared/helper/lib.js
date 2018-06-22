const is = require('is_js');
function assetLink(srcPath) {
    // let ASSET_DIR = '//huyhuy17.mysite/asset';
    let ASSET_DIR = '/asset';
    return ASSET_DIR + srcPath;
}

function link(text, href) {
    return {
        text: text,
        href: href,
    };
}
const get = {
    object: function(item) {
        if (is.object(item)) {
            return item;
        } else {
            return {};
        }
    },
};

module.exports = {
    assetLink: assetLink,
    link: link,
    get: get,
};
