const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

//method-1setup views for handlebars
// app.set("views", path.join(__dirname, "../templates/views"));

//method 2
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "help",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});
//for query string for searching something specific
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide search term" });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/weathers", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address term" });
  }
  console.log(req.query);
  res.send({
    weather: req.query.address,
  });
});

//error handling page
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    name: "Andrew Mead",
  });
});
app.get("*", (req, res) => {
  res.render("404", { errorMessage: "Page not Found!!", title: "Andrew Mead" });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
