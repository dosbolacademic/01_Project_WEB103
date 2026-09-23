const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const bosses = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bosses.json"), "utf-8")
);

// Front page: list of all bosses
app.get("/", (req, res) => {
  res.render("index", { bosses });
});

// Detail page for a single boss
app.get("/bosses/:slug", (req, res) => {
  const boss = bosses.find((b) => b.slug === req.params.slug);
  if (!boss) {
    return res.status(404).render("404");
  }
  res.render("boss", { boss });
});

// 404 for everything else
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Hollow Knight Bosses listicle running on port ${PORT}`);
});
