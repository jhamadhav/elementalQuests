const express = require("express");
const app = express();
var cors = require("cors");

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// custom modules
const { checkAuth, hasRole } = require("./middleware/auth");

app.get("/", checkAuth, (request, response) => {
   response.sendFile(__dirname + "../public/index.html");
});

app.get("/dashboard", checkAuth, async (req, res) => {
   res.sendFile(`dashboard.html`, { root: "./public" });
});

// TODO: add check auth middleware
// checkAuth
app.get("/admin", checkAuth, async (req, res) => {
   let cond = hasRole(req, "admin");
   if (cond) {
      res.sendFile("admin.html", { root: "./public" });
      return;
   }

   res.sendFile("403.html", { root: "./public" });
});

app.get("*", (req, res) => {
   res.sendFile("404.html", { root: "./public" });
});

// listen for requests :)
app.listen(port, () =>
   console.log(`Example app listening at http://localhost:${port}`)
);
