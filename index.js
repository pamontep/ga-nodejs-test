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
    const email = "analytictest-28911@appspot.gserviceaccount.com"
    const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCjBQjdVmZFoU2/\nBZDErZKA++NIGjLBP75BiPKX5vDYpfhnJOs7TkuZeys/Kah41sETwxrA33aBf9bo\ngQXzMw3ndqXiv5Uj2BeSHYfgtui3QUYcWnfsfxS53HH9vcNxlwoZtiZAFQHRgMG+\nIU+dabJVk9P0RD+Yxnhia25S8YqSQKP6bhJbUub5U16edlQlceDcANAPZTaDcxCG\nQ1Sl//ibTv4QVxelZoZXP43v73LLrxy9Oa3KKsCCcAFZXZmsuZwJ0PzI9S1PQWyd\nas/8aCHf7vyIksPoOkREOMuM4r12A/NEPgdp5vXClFBS5B3jQgFQc5x1VCEYiXId\nlnSBRVetAgMBAAECgf8c0IcAmIT7Sce0PAeavBNpORyzYe4Wum2mp845i1iG8s81\nbBEoKm6yclLylypwMYVvOM1Byj3oJfCWqDelBSEwCIjJy5NRAqEn8pBR6AK6YY9C\n87q+0reXIqADecdSDKB8avXX3d60aU3VjY3FBSnAdqDATE/xcSNWQib+AjO8Jegt\nE+K+guueVW0N2PTul0z7VzG65H8X+e6ZrF/URO6EK64WuW8jFtMZTpZn2YUvWmsv\n/N3tysx9oTrhcIO2TFBn8BgS7zi0cv8WDvg/alULcNVM+EIbqe3JkmFk4d2fTUlv\nWshrCFwLBIDYA89/6P0aJ6fqBuC5jCT7ZEH7EhkCgYEA5CqOybCly4gnttGfYEQz\nO+AxXP2ZylkvhxxrteOdnfXy3fXsOnYR+0piIPVgYWRyZfUpCSZSZMvvTwqSsu8u\nr7OwdfLt09sN4cTlEodUcFH9aNo/KuhjUCEuN8YaTNEp61S3zvCQ8qlCJrMs93oj\n0ui2iipu6sbHZ0KZOHefx5kCgYEAtugA4QLy5PYZBF5i6dAAgqB91aziL2zkoQY9\nmRZvBZU5EegKjsO079IhrNYj/tIHy8RZ4e3oCuho0V1kPvzVvIH2GHLcqUjN+8t7\nhfqtaDvH1jRkPKAaomFFB/KOZU2gjl/fgeR0+MUneDK03MgL3E13uMv7mrrX/1+8\nO1hoTTUCgYEAzJGXmh/GVrjJmrFRatda9DkrKQu7QmA6K7KApADjBYhJa1adqUDJ\nGHv1hUVbV5betqlbVHfGcdcixcReCQ5H1oKOGQJo14TUanLFS5qIS3hHcyYScp8O\nw/4r2RfF5s+1/OflMSYhX2AADoChNXWN/wBlAXXQIrF8gQmGJMmkOSkCgYAidBde\nS0jnujfCK+lj86t077hkXJmKp291qZBG2wP0wEQszFHYzKKznhh7zyaepH+VcZog\nxci07Ux5S6dLeiLkzHJH7rMELFOov464ER1DCie9gMb06I+70KjJM3aBPJsm1oZq\nmFc0WSbzLFIHWKNrTyhjJgFyBwoS77ysTR3wlQKBgAbgQCa9ml0u4nsf+JjSHwFL\ntMt15x5FCz/v2OVQveA1ahOD7M6rOCtdXGzTpaNa7mbWPK4fr0mg7AI4KnGpiYFi\nI413oVcERdEru0nn8fWgrtZH2REHGiLaxI4eipRYr0t7RvoiYc/JtVlx12vmzyHs\nOSrm+E5Z+zUGeA/QJKKU\n-----END PRIVATE KEY-----\n".replace(new RegExp('\\\\n'), '\n')
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