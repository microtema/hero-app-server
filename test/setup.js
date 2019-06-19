const path = require('path');
// This loads configuration from test environment
require('dotenv').config({path: path.resolve(process.cwd(), '.env')});

console.log('NODE_ENV', process.env.NODE_ENV, process.env.DATABASE);
