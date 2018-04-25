export function assetLink(srcPath) {
    let ASSET_DIR = '//huyhuy17.mysite/asset';
    return ASSET_DIR + srcPath;
}

export function link(text, href) {
    return {
        text: text,
        href: href,
    };
}
