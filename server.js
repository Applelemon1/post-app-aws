require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
// bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
};

// to redirect frontend
app.use(express.static(path.join(__dirname, "/Web/build")));
app.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/build/index.html"));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/build/index.html"));
});

// // final catch-all route to index.html defined last 
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + "/Web/build/index.html"));
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/build/index.html"));
});
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/Web/build/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(require("./routes/todoRoute.js"));
app.use(express.urlencoded({limit: '50mb'}));
const mongo = require("./db");

const connectToMongoDB = async () => {
  await mongo().then(() => {
    try {
      console.log("connect to mongodb! :) ");
    } catch (error) {
      console.log("error is", error);
    } finally {
      console.log("finally");
      //   mongoose.connection.close();
    }
  });
};



app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is running on ", PORT);
});
