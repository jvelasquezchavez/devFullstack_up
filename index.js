const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
const users = require("./endpoints/users");
const characters = require("./endpoints/character");
const authorization = require("./endpoints/auth");

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/endp", users, characters, authorization);

app.get('/', (req, res) => {
  res.status(200).json("Hola estoy funcionando.");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

/* Manda un mail */
//MailController.sendMail();