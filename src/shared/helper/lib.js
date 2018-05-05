function assetLink(srcPath) {
    let ASSET_DIR = '//huyhuy17.mysite/asset';
    return ASSET_DIR + srcPath;
}

function link(text, href) {
    return {
        text: text,
        href: href,
    };
}

module.exports = {
    assetLink: assetLink,
    link: link,
};
