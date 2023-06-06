"use strict";

var _express = _interopRequireDefault(require("express"));

var _mysql = _interopRequireDefault(require("mysql"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var db = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "11111",
  database: "test"
});

app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  res.json("привет это сервер который ты создал");
}); //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '11111'

app.get("/books", function (req, res) {
  var q = "SELECT * FROM books";
  db.query(q, function (err, data) {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/books", function (req, res) {
  var q = "INSERT INTO books(`title`,`desk`,`cover`,`price`) VALUES (?)";
  var values = [req.body.title, req.body.desk, req.body.cover, req.body.price];
  db.query(q, [values], function (err, data) {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(8800, function () {
  console.log("Соединение с backend!");
});
//# sourceMappingURL=index.dev.js.map
