// A mapping of known error responses
const codes = {
  cslMissing: { status: 400, message: 'CSL field is missing' },
  cslLength: {
    status: 400,
    message: 'CSL must be between 3 and 10 characters'
  },
  cslInvalid: {
    status: 400,
    message:
      'CSL must only contain letters, numbers, underscores, hyphen, or periods'
  },
  nameMissing: { status: 400, message: 'Name field is missing' },
  nameLength: {
    status: 400,
    message: 'Name must be between 6 and 30 characters'
  },

  userWrong: {
    status: 401,
    message: 'Cannot perform operations on other users'
  },

  userNotFound: {
    status: 404,
    message: 'User not found'
  },

  // auth

  missingAuthToken: {
    status: 401,
    message: 'Authorization token is missing from the headers'
  },

  unauthorized: {
    status: 401,
    message: 'Not authorized to perform this action'
  },

  adminOnly: {
    status: 401,
    message: 'Not authorized to perform this action'
  },

  TokenExpiredError: {
    status: 401,
    message: 'JSON web token has is expired'
  },

  JsonWebTokenError: {
    status: 401,
    message: 'Invalid json web token'
  },

  // ideas
  ideaNotFound: {
    status: 404,
    message: 'Idea does not exist with this id'
  },
  descriptionMissing: {
    status: 400,
    message: 'Idea requires a description property'
  },
  ideaNotFound: {
    status: 404,
    message: 'Idea not found'
  },
  ideaIsFull: {
    status: 400,
    message: 'Idea is full'
  },

  //comments:
  textMissing: { status: 400, message: 'text field is missing' },
  textLength: {
    status: 400,
    message: 'text must be between 2 and 300 characters'
  }
}

module.exports = codes
