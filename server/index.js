const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const readDataFromFile = () => {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
};

const writeDataToFile = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

app.get('/stablecoin', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

app.put('/stablecoin', (req, res) => {
  const newData = req.body;
  const data = readDataFromFile();
  data.push(newData);
  writeDataToFile(data);
  res.status(201).json(newData);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
