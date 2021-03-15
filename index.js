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
    const email = "ga-test-nodejs@ga-test-nodejs.iam.gserviceaccount.com"
    const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDb9UxvghEtibsp\nx4NKRBj738PPgGcjVSsOLlzOanigNeWa63ibsYwrQUQAYibezOkZ/IPw/s4Bth4J\nMM43UjKxzCpuJASAc9pz+oAosWDB3eSUSa4jIijtKHJlqRR9bQt1oNVEUx/gDE2q\n/3Bvk1AsV3t250T3lP4p08zLVCse3K4F/UIrFi2J8XDB3gD2J2oc15cy3Ev8Bast\n49i2a+NkwTfphGDufKFmJnwnoLUTThiFBlZvlkRjaykK4viIv2yV9u3I25BvS0JD\nD8uijlsHWQl/Ly96hJ+BbTHi2aXSmqdI/o1D1Az2gYvCzJyjRKmjmjSzCrCoRZuN\ndEymVtztAgMBAAECggEAMpAKrFZsrvhqkSHXLScGzD2lxEkqzF07asTfGicxB/kj\nyQ9ImBfCFj5oTKNDdrOJgSsCRI+6WPvdnzS8LszjMOpzNYLrkwCuzrreo5wU1zP0\nI99lG5fyawQBehuaRXPf7sAUTmLCYM1LPFwAY3GsfCj3DX//4175ZzGUMghs6iiY\nt1cFJGm3IB3bWA/sGVScA1v/RXt136GBgpqgIkc+HtAQ/Xe33sZgyuc2+LE15L2G\nq2G8Eu9YkTiLgCGbsk+J7X6LUlj9g5rUNVP45H6uY0HzsdWcfnYd0KV7AN3QmK6l\n9X2YRtDmJyidUWmA0KS+GNJV1GTq3JXzg/RWIzmAIQKBgQD9O/3z/wCf7D3E1XBI\nFgZB/sQXJo9++XobeLwYRAzG+0lfrCRemOaj2O/dDtCciFWbYzuICpYci+Vq/azo\nEDOYkftKmDNbY/9M6viWkKAelT/iaCCYR2SiS5bw6mZayYSnFIQ2c4CIZu+NTUWo\nGqbj6+OkUAXLBfIIyyqw6kuF4QKBgQDeXEVml4ghYRsjCAZI2cvSYHmkMSUUFsxe\nip/W9rrqgNsBRbx1/t4gtG/O9nwDqNunVK/nOOj4D7ct1MbDx50cKXYASWOSVBVk\nwjYn5aAA5UlMV4BEOzudV1vNLzzyWbMa18+vVbMHw918EsKGD7HmgQkvNtAC39J4\nGmkCZkIgjQKBgEuWXqU4Fo2lzII2W3+I43FLhGiMoAR8nxAYJ7zugwnZ8/rUvT5n\nUWDS3jYTt/0hTLxHEHv4/PmkYGRhN/1E6MG/wUxwxdOfs5LYCD+ZB9JZJmqEPkZ1\n+PngqjtbHBY5VJkyrIw8Sb9tSk/ZItOcsPgTby2anUAOlEI/soyAQu7BAoGBAMjG\nWefLdSBmlOEpsrr+5Rn9AHiv40HjX/8RfkfUGmv5k0Xv2L5WNe0j3zzptIp9YnAR\neI74BOtPDWA1mo9WYtb13NVfbqfGglarQcj+fl2wqmFjNK7nKOnl4j8/ovFU6vKW\n4LD5WaDuSsNoEPqJm2F9K3TVMjcWL+1AM4b2HElVAoGAGGBJGNTljV/w16b9/huG\nkPgMqSVr1BfkF4UCTNiqo3ygajki/XXV0HAaHAue90VVKr3PkQ3asgSDMoEK3zAq\nRYj55qybHy9QWDxY6oUYVL/LiD9HVOeOfiQuAyoJ9WzFtZmFkRgkN2hKdkHbksW7\nNt9klYofryAKfseOWoGfM3Q=\n-----END PRIVATE KEY-----\n".replace(new RegExp('\\\\n'), '\n')
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