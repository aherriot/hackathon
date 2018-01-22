module.exports = {
  // MongoDB connection strings
  CONNECTION_STRING: 'mongodb://localhost/hackathon',

  // What port should the webserver listen on
  PORT: 3001,

  // JSON web token secret key
  JWT_SECRET: 'hard-to-guess-secret-key',

  JWT_EXPIRY: 86400 * 100, // 100 days

  // bcrypt difficulty
  SALT_WORK_FACTOR: 10
}
