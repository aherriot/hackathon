const actionHandlers = {
  'ideasView/OPEN_MODAL': (state, action) => {
    return {
      ...state,
      open: true
    }
  },
  'ideasView/CLOSE_MODAL': (state, action) => {
    return {
      ...state,
      open: false
    }
  }
}

const defaultState = {
  open: false
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
