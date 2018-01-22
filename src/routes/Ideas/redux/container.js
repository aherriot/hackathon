import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import * as authActions from 'store/auth/actions'
import * as ideasActions from 'store/ideas/actions'
import Ideas from '../'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    ideas: state.data.ideas,
    ideasView: state.views.ideas
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...actions,
        ...authActions,
        ...ideasActions
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas)
