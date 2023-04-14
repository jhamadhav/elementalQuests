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

app.get("/", checkAuth, (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});

app.get("/hello", checkAuth, (req, res) => {
    res.send(JSON.stringify({ data: "hello world !" }))
})

app.get("/admin", checkAuth, (req, res, next) => {
    let cond = hasRole(req, "admin")
    if (cond) {
        res.send(JSON.stringify({ data: "hello admin !" }))
        return
    }
    res.sendFile('403.html', { root: './public' });
})

app.get('*', (req, res) => {
    res.sendFile('404.html', { root: './public' });
});

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

