const express = require("express");
const app = express();
var cors = require('cors')

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors())


// custom modules
const { checkAuth, hasRole } = require("./middleware/auth")

app.get('*', (req, res) => {
    res.sendFile('404.html', { root: './public' });
});

app.get("/", checkAuth, (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});

app.get("/hello", checkAuth, (req, res) => {
    res.send(JSON.stringify({ data: "hello world !" }))
})

app.get("/admin", checkAuth, (req, res, next) => {
    hasRole(req, res, next, "admin")
    res.send(JSON.stringify({ data: "hello admin !" }))
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

