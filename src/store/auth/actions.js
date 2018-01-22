import { authRequest } from 'utils/request'

export function openAuthModal() {
  return {
    type: 'auth/OPEN_MODAL'
  }
}

export function closeAuthModal() {
  return { type: 'auth/CLOSE_MODAL' }
}

export function login(csl, name) {
  return authRequest('auth/LOGIN', '/api/users/login', 'POST', {
    csl,
    name
  })
}

export function logout() {
  return { type: 'auth/LOGOUT' }
}
