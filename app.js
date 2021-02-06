const express = require ('express');
const app = express();
const port = 9191;
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cors = require('cors');
const urlParse = require('url-parse');
const queryParse = require('query-string');
//const axios = require('axios');
require ('dotenv/config');


//600743198704-il0aik24cpm78a28glu8c3n8r48f6g3f.apps.googleusercontent.com
//jy1EiQpJg5e0K5G6dYifdcte


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getURLSearch", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        //Client ID
        "600743198704-il0aik24cpm78a28glu8c3n8r48f6g3f.apps.googleusercontent.com",
        //Client Secret
        "jy1EiQpJg5e0K5G6dYifdcte",
        //link to redirect to
        "http://localhost:9191/search"
    );
        const scopes = ["https://www.googleapis.com/customsearch/v1/siterestrict?"];

        const url = oauth2Client.generateAuthUrl({
            access_type: "Offline",
            scope: scopes,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userID
            })
        });
console.log(this);
 /*      request(url, (err, response, body) => {
            console.log("Error:", err);
            console.log("statusCode: ", response && response.statusCode);
            res.send({ url });
        });
*/
});




//Import Routes

//const searchResultRoute = require('./routes/searchResult');
//const { json } = require('body-parser');
//const { request } = require('express');

//app.use('/routes/searchResult', searchResultRoute);


//Routes


//app.get('/searchResult', (req, res) => {
//    res.send('Here we go!');
//});


//Connect to the DB

//mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

//Listening to the server

app.listen(port, () => console.log(`GOOGLE SEARCH IS LISTENING ON PORT ${port}`));
