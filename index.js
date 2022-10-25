const db = require("./db");
const express = require("express");
const handlebars = require("express-handlebars").engine;

const app = express();
// { defaultLayout: "main" }
app.engine("handlebars", handlebars({ defaultLayout: false }));
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/assets`));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { message: "mes" });
});

app.post("/addNode", async (req, res) => {
  let result = await db.createPerson(req.body.addNodeName);
  res.json({
    message: result,
  });
});

app.post("/addLink", async (req, res) => {
  let result = await db.createFriendship(
    req.body.addLinkName1,
    req.body.addLinkName2,
    req.body.addLinkName
  );
  res.json({
    message: result,
  });
});

app.post("/deleteNode", async (req, res) => {
  let result = await db.deleteNode(req.body.deleteName);
  res.json({
    message: result,
  });
});

app.post("/deleteFriendship", async (req, res) => {
  let result = await db.deleteFriendship(
    req.body.deleteName,
    req.body.deleteLink
  );
  res.json({
    message: result,
  });
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000/");
});
