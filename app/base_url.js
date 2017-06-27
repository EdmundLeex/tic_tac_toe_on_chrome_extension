let baseUrl;

if (process.env.NODE_ENV) {
  baseUrl = 'http://localhost:3000';
} else {
  baseUrl = 'http://www.supertictactoe.club'
}

module.exports = baseUrl;
