const express = require("express");
const app = express();
var cors = require('cors')

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors())

app.get("/", (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});

app.get("/hello", (req, res) => {
    res.send(JSON.stringify({ data: "hello world !" }))
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

