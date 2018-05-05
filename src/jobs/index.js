const g = require('got');
const fs = require('fs');
const cheerio = require('cheerio');

let target_url = 'huyhuy17.xyz';
g
    .get(target_url)
    .then(response => {
        let $ = cheerio.load(response.body);

        return $;
    })
    .then($ => $('h4').text())
    .then(console.log)
    .catch(console.log);
