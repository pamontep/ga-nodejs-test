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
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');
const status = require('../nodejs-express-api-init/src/classes/Status');

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-express-api-init running on PORT: ${ PORT }`))
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
    .get('/ga-testing', function (req, res) {
        const client_id = '799046279734-6s7ri4otdg79huugohgasm04d1435nfq.apps.googleusercontent.com';
        const client_secret = 'GUuoimiBmKaLKiX8eweFgbAY';
        const callback_uri = 'http://localhost:9999/ga-callback';
        const auth = require('google-auth-library');
        const oauth2client = new auth.OAuth2Client(client_id, client_secret, callback_uri);
        const authUrl = oauth2client.generateAuthUrl({
          access_type: 'offline',
          scope: [    // scopes for Dialogflow
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/dialogflow'
          ]
        });
        // redirect user to authUrl and wait for them coming back to callback_uri
        
        // in callback_uri handler, get the auth code from query string and obtain a token:
        const tokenResponse = '';//await oauth2client.getToken(code);
        oauth2client.getToken(code, function (result) {
            tokenResponse = result;
        })
        oauth2client.setCredentials(tokenResponse.tokens);
        
        // now use this oauth2client!
        const sessionClient = new dialogflow.SessionsClient({ auth: oauth2client }); // <-- auth passed here
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));