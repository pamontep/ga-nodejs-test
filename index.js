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
        const { google } = require('googleapis')
        const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
        const email = "nodejs-ga-test@hotplay-redemption-app.iam.gserviceaccount.com"
        const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDmgz3eaVj3HSkK\nlAcAjhkpKb1WTou9VWqNvSSh09OUdJwK1S6BDhcvUcdn9woaEqaXT0sE0UwZ5xIk\nzEjbw7aT296lpWZLwtvhuPuW7diTk+btCbzYQ0YWOjMNaTT5gzK0ClkOSJgd2rd/\n5PPXtFjtB6mQyOkLegimSOBXV9VT4v3JJV68kSUqQfWXHZFTlAiXudMfXpvKtWlO\nZCoF7cqYIxqmsVDu87mh98DdvP6isL9Z1iqRttpEt3tEqQgdqQVeY/f9dd8epFxV\niF8BRiSIkopGVxpYEo1r4yjkwqwFITHkhWapxxmGf5pCHVXasa4hxXLH7wIhQKe4\n+OeZS8uxAgMBAAECggEAR1LYc9b41g1Jw6IlwIA3PMtTcD8BceXaAF1D1maqksa5\n+YgYyYnIlrWhE4QWthaLQUohli4EdAdRT919tbIK7hkb/Pj+e/ag/mi0P/D8ED21\nOCbJLckzCHGdlkq1P3be22JQR+EiYCpqmMIIyPdehIjYaJohsZFi18C42Y2tzjRZ\npT2x5LHfbgbXy6sUsm/fkA1cHioLZCJl/LAO3m0JqmVMR/qku3NIWyVOxXs6tlx8\nc7jOl9wjo11AD6/b22gQLIrl18vUlT2HDvsBClIPuopT8zpfNDgGpPSlRYsN0Ekz\nVHHvyiOxb07u4/LTeHhJAo3IZ1ujID/CHpnXI9kbmQKBgQD2yv4i3FRTrtEGr3OX\nH7CmodqnkPEkWNHUaS1HiW5il7dyjsQC4vA4sr3AU7KwSq8HzvF+8HU6wUYFQjXh\njXOjGD7dKclaVbmSGOxeyISoLSpQUSI56J9IaOB+2DIo/FpCpFyPvilFs9SjLAyN\nW+bj3CoMlpVXAUzv/RAr8Xnc9wKBgQDvHMNvdG1YahD9NvXLrL+HblLCEmb7snQU\nkOhDyj2bKdEZRM7e7LrdVy5dBDhoiD4Tv9mOj1H9pewT2s9QvQ1EuZhjFLG9jnBg\n/gqd3CdW+xtJUJqf95Pa7ZuyIFsK4efwnlkDARWwo2wXsmLMpR+OxkqXFfRc+wBj\nWOIFIlm6lwKBgHJst9wN8ANEwKGq45skFFGOJcUfjM7fZ5pmkZnjfIy171ZsHzF/\nawW+yf/MTsMyPWkPaCUE9DWjuwVhJ35GiWELMsp0P2lk6b91UtK3gdo/5qiKlaXn\n10JJbh0hvFAIgQj5D/mNn7Ezqdll6QP5olnvkId5ohBPCA8VdFQLiAcNAoGAOtfZ\nQJRmVFvF0oqz8muQtsNvmlLtBQPljSob/pLGlmi0DIPiZPndAptxzXI8b30XycRs\nxah/hOxQLJKscjIUEdWaqsds9jkXbscV1cNX6w/gpyou4y8KM9ZFepB71zHA4nYV\ncafSrqWI9EvyBGqeWYRy1ruQZ1FdxxUYiirp6gECgYAnd2XI16LyRSj3ZMaoVrAL\nDQ7AUnZ2cr6HJAwb3h0D9rE0W7NEMeGn1zvP7pD3lEUkJH4TuciclwcpOaR5PHks\n03t36FTPf4JQ5revfdrOvUfeAWxhjzSRSaUmuUeWBgajetntSPSHDMGc4pini7GM\nvv25xua+A+cCBHzRJVod8w==\n-----END PRIVATE KEY-----\n"
        const jwt = new google.auth.JWT(email, null, private_key, scopes)
        const view_id = '1'

        async function getData() {
            try {
                const response = await jwt.authorize()
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
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));