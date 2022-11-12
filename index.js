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
  let result = await db.createPerson(req.body.addNodeName, req.body.label);
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/addLink", async (req, res) => {
  let result = await db.createFriendship(
    req.body.addLinkName1,
    req.body.addLinkName2,
    req.body.addLinkName,
    req.body.addLinkTag1,
    req.body.addLinkTag2
  );
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/deleteNode", async (req, res) => {
  let result = await db.deleteNode(req.body.deleteName, req.body.label);
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/delProp", async (req, res) => {
  let result = await db.delProp(
    req.body.name,
    req.body.label,
    req.body.propName
  );
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/addProp", async (req, res) => {
  let result = await db.addProp(
    req.body.name,
    req.body.label,
    req.body.propName,
    req.body.propVal
  );
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/deleteFriendship", async (req, res) => {
  let result = await db.deleteFriendship(
    req.body.deleteName,
    req.body.deleteLink
  );
  res.json({
    message: result.message,
    status: result.status,
  });
});

app.post("/connectDB", async (req, res) => {
  let result = await db.connectDB(
    req.body.uri,
    req.body.name,
    req.body.password
  );
  res.json({
    message: result,
  });
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000/");
});
