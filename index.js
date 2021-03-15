/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-01 01:07:04
 * @modify date 2018-06-01 01:07:04
 * @desc This file used to be a Main file of NodeJS API
*/
const moment = require('moment');
const server = require('express');
const path = require('path');
const PORT = process.env.PORT || 443;
const request = require('request');
const bodyParser = require('body-parser');
// const status = require('../ga-nodejs-test/src/classes/Status');


function getGA4Report() {
    const { google } = require('googleapis')
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const email = "analytic-test@analytictest-28911.iam.gserviceaccount.com"
    const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBd8vPcpE2Q4pW\nTDCIAglsXFsJPc4isqgLpMdiRq+eEe3PJ41ALD11N7x6zkpB1QVodKJ8R88VnufL\nrFw5n4ye32RefjOZkHwwfk9nJIzfOTzwY8ZJl4pKbYOolY5SEf+1ULxNSBom4OwK\nw/QXJQZpBXW5pZgYB/QAc5rML+LEYK7hKYR6+5s29qo075xgMAokPkn/BF1mQqrG\n9AZzOGHIdPAsDSBz7QWvCAWP7DJa3MBmRDj6U/20jUDpkWSGBd8stOKHmdPIQk02\nsITipAGy/OZ/yGbDFgZ3lISS6F8rR9Ceq0spKFSx11khGccvKocmjIh0iV2E4B+L\n/VUvSp8hAgMBAAECggEALOB+9FXc/TtZgX8W2tWuHeamb1RY1o+ej2TfoxpGbmI2\nSZEhILuiXehZ3hqv+ulQ4dP8RNvbW2aK2iHXGr65vbiP7aNUkNCFHjKOdJxz2OvM\nCO779eIi//S7T4Wxh7QJHqPlqf+JoW8XEcA2hI/gFshfcHrK9vgRT3GBfM+2yFpF\nZbXK85OXnojilgYmoPNneUvAAwppYKvwjgqUKaDJQqmIXFBbdOCoggRvbcWFL/ye\nGDLwRYUFUC7KboDmhAuP4lPoQimAyqRz9a+ab0NRWoZ7Z5dhJub4m8yIFpm5JxYm\ny6TFFesTI7GZSHgnIXDzVz7v8rzd5PV7W7+bu4fEiQKBgQDwwSma4ismV1tc+JE8\nEbcTiYWAvIWGcYZpj4pAljNh5iMRXJ5OJ9roWgs7CIeCvgqpMb09J8moZmJny6Qr\nHx93yGP41CGLlK0Jd7Zn4eIMlXAmq8ZjJ0SxEKPvHKcmE6XYLio9FvBHDXFsElRw\n3t/8JUWlWnJqCnATPeYgJQdDJwKBgQDNuBPW+43imZyQCos6BxrA+XFDEPIEeQqB\ngvAVnRRPExMkMXZv3THrK+HbTETxiD7f/YLECn6QoPv0nIpKH/gWQlYw1OJbdsDW\nDHKmtHokTa5USZIeCuQ8d1KYCUUq7uRSVZFPXVsYm91fKeR/aOjkY0fGv78rwpcc\ne/rbiKNYdwKBgGhMxqF66gaqQcJ9TS4g3pdwNI4ZHh+ofvqsXNCuQYRgF0EmRs7F\nJWkT2Vmx0EMr4aJ7Eei0nACAmpEs/+pOiWtzPRxHimDWAEDhw/wtN6kL9JJMSJ4c\nHP44n0yvtRoh2O9W0KW2klG12TVgm4Rqic7Ktulzza1y6Crt3gx+/i5xAoGADeyr\nyx1z2Sa0pjtQeTkJ4o3/0J5RA2R+BY4rWgsr2L5dyVFfxuqd+mEaBJIBCKhEOT0b\noNFlB70d0MzXv3Sygi8zTlLaj35WRybIi+gjbFmltybTsRzjngQlnwzhlapd4gTQ\ntSKIi/3g2hQn10fum6bssNNByWB+gfsSW9G/3LkCgYBg6/G0BqEl0l7+pAFBSjbj\n/9j2X9K/4J1WhZsJzxMewCL38QMDh4BxthgzsOnxmRgl7M9BqffgAKyoZfkd7CB4\n1t7ndAAGTx2DJuBHHzE6aOHSZh7UN/KzShXyRtmMY4ZS+ayCwmu92dmryYgkbNh9\nThzG58rD5vp8FCGqgSCbcg==\n-----END PRIVATE KEY-----\n".replace(new RegExp('\\\\n'), '\n')
    const jwt = new google.auth.JWT(email, null, private_key, scopes)
    const view_id = 'NHB7W9LVF6'

    async function getData() {
        try {
            const response = await jwt.authorize()
            console.log("auth response", response);
            const result = await google.analytics('v3').data.ga.get({
                'auth': jwt,
                'ids': 'ga:' + view_id,
                'start-date': '30daysAgo',
                'end-date': 'today',
                'metrics': 'ga:pageviews'
            })

            console.dir(result)
        }
        catch (err) {
            console.log(err);
        }
    }

    getData()
}


server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a ga-nodejs-test running on PORT: 443`))
    .get('/ga-callback', function (req, res) {
        console.log(1234);
        /*status.getStatusFromFile().then(function (rs) {
            if (typeof rs.result === 'boolean' && rs.result === true) {
                res.json({
                    result: true,
                    status: 200,
                    message: `Successful! Latest status is ${ rs.data }`
                });
            }
            else {
                res.json({
                    result: false,
                    status: 500,
                    message: 'Error! Internal Server Error'
                });
            }
        });*/
    })
    .get('/ga-report', function (req, res) {
        getGA4Report()
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));