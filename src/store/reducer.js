import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import ideasReducer from './ideas/reducer'

import ideasViewReducer from 'routes/Ideas/redux/reducer'

export default combineReducers({
  // general app state (like global error messages)
  // app: appReducer,
  // // data from APIs
  data: combineReducers({
    auth: authReducer,
    ideas: ideasReducer
  }),
  // view state for specific routes
  views: combineReducers({
    ideas: ideasViewReducer
  })
})
