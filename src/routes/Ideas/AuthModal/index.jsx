import React, { Component } from 'react'

import Modal from '../Modal'
import LoginForm from './LoginForm'

class AuthModal extends Component {
  render() {
    const { auth, actions } = this.props

    return (
      <Modal
        open={auth.open}
        onClose={actions.closeAuthModal}
        title={'Sign In'}>
        <LoginForm auth={auth} actions={actions} />
      </Modal>
    )
  }
}

export default AuthModal
