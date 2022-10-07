var express = require('express');
var cors = require('cors');
var multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", multer().single('upfile'), (req, res) => {
  if (req.file !== undefined)
    res.json({
      name : req.file.originalname,
      type : req.file.mimetype,
      size : req.file.size
    })
  else 
    res.send("No file uploaded")
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
