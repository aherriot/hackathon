function getHeaders() {
  const token = localStorage.getItem('token')

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (token) {
    return {
      ...headers,
      Authorization: 'Bearer ' + token
    }
  } else {
    return headers
  }
}

async function request(url, method = 'GET', data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    try {
      // parse the response
      const json = await response.json()

      if (response.ok) {
        return Promise.resolve(json)
      } else {
        return Promise.reject(json)
      }
    } catch (err) {
      // JSON parse error
      return Promise.reject(err)
    }
  } catch (err) {
    // fetch exception. Maybe network errors?
    return Promise.reject(err)
  }
}
export default request

const requestPending = (type, userId) => ({
  type: type + '_PENDING',
  payload: {
    userId: userId
  }
})

const requestSuccess = (type, response, userId, name) => ({
  type: type + '_SUCCESS',
  payload: {
    response,
    userId: userId,
    name: name
  }
})

const requestError = (type, error) => ({
  type: type + '_ERROR',
  error: error
})

export function authRequest(actionType, url, method = 'GET', data) {
  return (dispatch, getState) => {
    const { id, name } = getState().data.auth

    dispatch(requestPending(actionType, id))

    return request(url, method, data)
      .then(response => {
        dispatch(requestSuccess(actionType, response, id, name))
        return response
      })
      .catch(error => {
        if (
          [
            'TokenExpiredError',
            'JsonWebTokenError',
            'missingAuthToken'
          ].includes(error.code)
        ) {
          dispatch({ type: 'auth/AUTH_ERROR', error: error })
          return Promise.reject(error)
        } else {
          dispatch(requestError(actionType, error))
          return Promise.reject(error)
        }
      })
  }
}
