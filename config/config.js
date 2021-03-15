/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-01 01:06:53
 * @modify date 2018-06-01 01:06:53
 * @desc This file used to be a Main Configuration file which will collect all configuration
 * Example. Database Configuration etc.
*/
const fs = require('fs-extra'),
    path = require('path'),
    devConf = fs.readJSONSync(path.resolve(__dirname, 'config.development.json'), { throws: false }),
    prdConf = fs.readJSONSync(path.resolve(__dirname, 'config.production.json'), { throws: false });

module.exports = {
    devConf: (devConf && devConf.database) ? devConf.database : null,
    prdConf: (prdConf && prdConf.database) ? prdConf.database : null
};