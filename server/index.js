import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
//Technique 1
//import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  /* 
  Task1 - Using renderToString
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
  */
  /* 
  Task1 - Using renderToNodeStream. Useful for long run HTTP request. Faster.
  */
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);
  //Pipe and send res to user and dont end once done
  stream.pipe(res, { end: false });
  //Once finish write other bit of HTML
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
