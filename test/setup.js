// This loads configuration from test environment
require('custom-env').env('test');

console.log('DATABASE', process.env.DATABASE);
