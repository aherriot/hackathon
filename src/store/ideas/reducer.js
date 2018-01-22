const actionHandlers = {
  'ideas/FETCH_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/FETCH_SUCCESS': (state, action) => {
    return {
      ...state,
      status: 'SUCCESS',
      fetchTime: Date.now(),
      data: action.payload.response,
      error: null
    }
  },
  'ideas/FETCH_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },
  'ideas/ADD_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/ADD_SUCCESS': (state, action) => {
    const newIdea = action.payload.response

    const joinedIdea = action.payload.response.members.length > 0
    let data
    if (joinedIdea) {
      data = state.data.map(idea => ({
        ...idea,
        members: idea.members.filter(
          member => member._id !== action.payload.userId
        )
      }))
      data.push(newIdea)
    } else {
      data = [...state.data, newIdea]
    }
    return {
      ...state,
      status: 'SUCCESS',
      data: data
    }
  },
  'ideas/ADD_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },
  'ideas/UPDATE_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/UPDATE_SUCCESS': (state, action) => {
    return {
      ...state
    }
  },
  'ideas/UPDATE_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },
  'ideas/DELETE_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/DELETE_SUCCESS': (state, action) => {
    return state
  },
  'ideas/DELETE_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },

  'ideas/JOIN_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/JOIN_SUCCESS': (state, action) => {
    const joinedIdea = action.payload.response
    return {
      ...state,
      data: state.data.map(
        idea =>
          idea._id === joinedIdea._id
            ? {
                ...idea,
                members: [
                  ...idea.members,
                  { _id: action.payload.userId, name: action.payload.name }
                ]
              }
            : {
                ...idea,
                members: idea.members.filter(
                  member => member._id !== action.payload.userId
                )
              }
      ),
      status: 'SUCCESS'
    }
  },
  'ideas/JOIN_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },

  'ideas/LEAVE_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'ideas/LEAVE_SUCCESS': (state, action) => {
    return {
      ...state,
      data: state.data.map(idea => ({
        ...idea,
        members: idea.members.filter(
          member => member._id !== action.payload.userId
        )
      })),
      status: 'SUCCESS'
    }
  },
  'ideas/LEAVE_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  }
}

const defaultState = {
  status: 'INIT',
  fetchTime: null,
  data: [],
  error: null
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
