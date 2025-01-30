const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save questionnaire responses
app.post('/save-responses', (req, res) => {
  const responses = req.body;
  const filePath = path.join(__dirname, 'responses.json');

  // Write the data to a JSON file
  fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
    if (err) {
      console.error('Error saving responses:', err);
      res.status(500).json({ message: 'Error saving responses' });
    } else {
      res.status(200).json({ message: 'Responses saved successfully' });
    }
  });
});

app.get('/get-responses', (req, res) => {
  const filePath = path.join(__dirname, 'responses.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading responses file:', err);
      res.status(500).json({ message: 'Error reading responses' });
    } else {
      res.status(200).json(JSON.parse(data || '[]'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
