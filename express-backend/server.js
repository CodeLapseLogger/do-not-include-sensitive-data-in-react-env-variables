const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send(
    "This is the response served through Express server for the GET request to server root: '/'"
  );
});

app.listen(port, () => {
  console.log("Express server listening to requests on port 3001 !");
});
