const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 15510;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
const pathUpload = path.join(__dirname, "upload");
// setup multer for file upload
var storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// serving front end build files
app.use(express.static(__dirname + "/../build"));

// route for file upload
app.post("/api/uploadfile", upload.single("myFile"), (req, res, next) => {
  console.log(req.file.originalname + " file successfully uploaded !!");
  res.sendStatus(200);
});
//
// route for file upload
app.post("/api/checkFileExists", (req, res) => {
    console.log(req.body)
  if (fs.existsSync(path.join(pathUpload, req.body.file))) {
    return res.status(409).send({'message': `${req.body.file} đã tồn tại! Bạn có muốn ghi đè không?`});
  }
  res.sendStatus(200);
});
