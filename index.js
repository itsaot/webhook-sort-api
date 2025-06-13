const express = require('express');
const app = express();
module.exports = (req, res) => {
  console.log('Received request:', req.method);

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    console.log('Raw body:', body);
    try {
      const data = JSON.parse(body);
      console.log('Parsed JSON:', data);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: data }));
    } catch (err) {
      console.error('JSON parse error:', err);
      res.statusCode = 400;
      res.end('Invalid JSON');
    }
  });
};

app.use(express.json());

app.post('/webhook', (req, res) => {
    const { data } = req.body;

    if (!data || typeof data !== 'string') {
        return res.status(400).json({ error: 'Invalid data field. Must be a string.' });
    }

    const sortedChars = data.split('').sort();
    res.status(200).json({ word: sortedChars });
});

module.exports = app;

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}
