import React, { Component } from 'react'

import Modal from '../Modal'
import IdeaForm from './IdeaForm'

class AuthModal extends Component {
  render() {
    const { ideasView, actions } = this.props

    return (
      <Modal
        open={ideasView.open}
        onClose={actions.closeIdeaModal}
        title={'Suggest Idea'}>
        <IdeaForm actions={actions} />
      </Modal>
    )
  }
}

export default AuthModal
