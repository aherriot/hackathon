const codes = require('./codes')

module.exports = function respondWithError(resp, error) {
  if (typeof error === 'string') {
    const errorObj = codes[error]
    if (errorObj) {
      return resp
        .status(errorObj.status)
        .json({ code: error, message: errorObj.message })
    } else {
      console.error('ERROR: UnknownError', error)

      return resp
        .status(500)
        .json({ code: 'unknownError', message: 'Unknown error', error: error })
    }
  } else {
    const errorObj =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error

    console.error('ERROR: UnknownError', errorObj)

    return resp
      .status(500)
      .json({ code: 'unknownError', message: 'Unknown error', error: errorObj })
  }
}
