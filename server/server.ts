import bodyParser from "body-parser";
import express from "express";
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "../.env" });
}

app.get("/hello", function (req, res) {
  res.status(200).json({ text: "Hello World!" });
});

async function getSpotifyAPIToken() {
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  const base64 = Buffer.from(
    `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const auth = `Basic ${base64}`;
  const redirect: "follow" | "error" | "manual" | "undefined" = "follow";
  const spotifyResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
      body: urlencoded,
      redirect,
    }
  );
  const jsonRes = await spotifyResponse.json();
  return jsonRes;
}

app.get("/spotifyToken", async function (req, res) {
  const response = await getSpotifyAPIToken();
  if (response.error) {
    res.status(401).send(response);
    return;
  }
  res.status(200).json(response);
});

app.get("/deezerTrack", async function (req, res) {
  const response = await fetch(
    `https://api.deezer.com/search?q=${req.query.q}`
  );
  //   if (response.status !== 200) {
  //     console.log("error");
  //     res.status(404).send(response);
  //     return;
  //   }
  const data = await response.json();
  res.status(200).json(data);
});
