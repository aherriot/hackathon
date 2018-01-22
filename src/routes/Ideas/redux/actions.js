export function openIdeaModal() {
  return {
    type: 'ideasView/OPEN_MODAL'
  }
}

export function closeIdeaModal() {
  return { type: 'ideasView/CLOSE_MODAL' }
}
