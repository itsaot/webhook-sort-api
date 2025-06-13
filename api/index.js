const app = require('../index'); // This is your Express app
const serverless = require('serverless-http'); // Wrap Express for Vercel

module.exports = serverless(app);
