const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();

var log = function (entry) {
  fs.appendFileSync('/tmp/app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

app.use(express.static(process.env.REACT_PATH));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, process.env.REACT_PATH, 'index.html'));
});

app.post('/auth', function (req, res) {
  // console.log(req.body);
  if (req.body.password === 'help') {
    res.send({ success: true });
  } else {
    res.send({ success: false});
  }
});

console.log('express started at port: ' + port);
app.listen(port);

