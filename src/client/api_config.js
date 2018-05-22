const CONFIG = require('./config.js');
const api = route => `${CONFIG.API_DOMAIN}${route}`;

const API_CONFIG = {
    USER: {
        LOGIN: api('/user/login'),
        REGISTER: api('/user/register'),
    },
    SALON: {
        update: api('/salon/update'),
    },
};

module.exports = API_CONFIG;
