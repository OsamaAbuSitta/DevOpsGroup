const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongodb");
const mongoClient = require("mongodb").MongoClient;
const configuration = require("./config.json");

const port = configuration.port;
const dbConnection = configuration.databaseConnectionUrl;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To create db collectin call it just at first time 
//createCollection();

app.get("/search", (req, res) => {
  
  let query = req.query.q;

  if (!query) {
    res.send(
      "please send valid parameters like 'http://localhost:9191/search?q=Your_Search_String'"
    );
    return;
  }
  const searchUrl = configuration.googleApiUrl
    .replace("{{apiKey}}", configuration.googleApiKey)
    .replace("{{query}}", query);

  request(searchUrl, (error, response, body) => {
    console.log("statusCode: ", response && response.statusCode);
    if (error) {
      console.log(error);
    } else {
      let result = JSON.parse(body).items;
      if (result && result.length) {
        addSearchResultToDb(query,result);
        res.send({ result });
      } else res.send("no data found :P");
    }
  });
});

app.listen(port, () =>
  console.log(`GOOGLE SEARCH IS LISTENING ON PORT ${port}`)
);

function addSearchResultToDb(searchKey, result) {
  let insertedObj = { searchKey: searchKey, result: result };
  insertRow(insertedObj);
}

function createCollection() {
  mongoClient.connect(dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db(configuration.databaseName);
    dbo.createCollection(configuration.collectionName, function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}


function insertRow(obj) {
  mongoClient.connect(dbConnection, function (err, db) {
    if (err) throw err;
    let dbo = db.db(configuration.databaseName);
    dbo.collection(configuration.collectionName).insertOne(obj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}
