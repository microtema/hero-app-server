const path = require('path');
// This loads configuration from test environment
require('dotenv').config({path: path.resolve(process.cwd(), '.env.' + process.env.NODE_ENV)});

console.log('NODE_ENV', process.env.NODE_ENV, process.env.DATABASE);
