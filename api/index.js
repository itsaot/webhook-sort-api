module.exports = (req, res) => {
  console.log(`🔔 ${req.method} request to ${req.url}`);

  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    console.log('Body received:', body);
    try {
      const data = JSON.parse(body);
      console.log('Parsed JSON:', data);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ received: data }));
    } catch (error) {
      console.error('❗ Invalid JSON:', error);
      res.statusCode = 400;
      res.end('Bad Request: Invalid JSON');
    }
  });
};
