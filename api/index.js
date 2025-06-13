const app = require('../index');
module.exports = (req, res) => {
  console.log(`🔔 ${req.method} request to ${req.url}`);

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    console.log('Body received:', body);
    try {
      const data = JSON.parse(body);
      console.log('Parsed JSON:', data);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ received: data });
    } catch (error) {
      console.error('❗ Invalid JSON:', error);
      res.status(400).send('Bad Request: Invalid JSON');
    }
  });
};

module.exports = app;
