import { authRequest } from 'utils/request'

export function fetchIdeas() {
  return authRequest('ideas/FETCH', '/api/ideas')
}

export function addIdea(idea) {
  return authRequest('ideas/ADD', `/api/ideas`, 'POST', idea)
}

export function updateIdea(idea) {
  return authRequest('ideas/UPDATE', `/api/ideas/${idea._id}`, 'PUT', idea)
}

export function deleteIdea(idea) {
  return authRequest('ideas/DELETE', `/api/ideas/${idea._id}`, 'DELETE')
}

export function joinIdea(idea) {
  return authRequest('ideas/JOIN', `/api/ideas/${idea._id}/join`, 'PATCH')
}

export function leaveIdea(idea) {
  return authRequest('ideas/LEAVE', `/api/ideas/${idea._id}/leave`, 'PATCH')
}
