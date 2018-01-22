import jwtDecode from 'jwt-decode'

const actionHandlers = {
  'auth/OPEN_MODAL': (state, action) => {
    return {
      ...state,
      open: true
    }
  },
  'auth/CLOSE_MODAL': (state, action) => {
    return { ...state, open: false }
  },
  'auth/LOGIN_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'auth/LOGIN_SUCCESS': (state, action) => {
    const decoded = jwtDecode(action.payload.response.token)
    localStorage.setItem('token', action.payload.response.token)
    return {
      ...state,
      status: 'SUCCESS',
      token: action.payload.response.token,
      id: decoded._id,
      csl: decoded.csl,
      name: decoded.name,
      role: decoded.role,
      expiresAt: decoded.exp,
      error: null
    }
  },
  'auth/LOGIN_ERROR': (state, action) => {
    return {
      ...state,
      status: 'ERROR'
    }
  },
  'auth/LOGOUT': (state, action) => {
    localStorage.removeItem('token')

    return {
      ...state,
      token: null,
      username: null,
      id: null,
      role: null,
      expiresAt: null
    }
  }
}

const token = localStorage.getItem('token')
let decoded

if (token) {
  decoded = jwtDecode(token)
}

const defaultState = {
  open: false,
  status: 'INIT',
  error: null,

  token: token,
  name: decoded ? decoded.name : null,
  csl: decoded ? decoded.csl : null,
  id: decoded ? decoded._id : null,
  role: decoded ? decoded.role : null,
  expiresAt: decoded ? decoded.exp : null
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
