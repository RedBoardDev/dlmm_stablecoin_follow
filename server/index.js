const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 60839;

app.use(bodyParser.json());
app.use(cors());

const readDataFromFile = () => {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
};

const writeDataToFile = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Helper function to validate data
const validateData = (data) => {
  const requiredFields = ['date', 'raydium', 'meteora', 'orca'];
  const valid = requiredFields.every(field => data[field]);

  if (!valid) {
    throw new Error('Invalid data format');
  }

  const { date, raydium, meteora, orca } = data;

  const hasValidSubFields = (subField) =>
    ['liquidity', 'reward', 'apr'].every(field => field in subField);

  return hasValidSubFields(raydium) && hasValidSubFields(meteora) && hasValidSubFields(orca);
};

app.get('/stablecoin', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

app.put('/stablecoin', (req, res) => {
  const newData = req.body;

  try {
    if (!validateData(newData)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const data = readDataFromFile();

    // Check if data for the given date already exists
    const existingDataIndex = data.findIndex(entry => entry.date === newData.date);

    if (existingDataIndex > -1) {
      // Update existing data
      data[existingDataIndex] = newData;
    } else {
      // Add new data
      data.push(newData);
    }

    writeDataToFile(data);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
