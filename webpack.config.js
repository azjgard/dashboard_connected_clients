const path = require('path');

module.exports = {
  entry: {
   server: path.join(__dirname, '.js'),
   client: path.join(__dirname, '.js') 
  },
  output: path.join(__dirname, 'dist')
};