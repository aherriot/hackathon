import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Header from './Header'
import Idea from './Idea'
import AuthModal from './AuthModal'
import IdeaModal from './IdeaModal'

import './Ideas.css'

class Ideas extends Component {
  componentDidMount() {
    this.props.actions.fetchIdeas()
  }

  render() {
    const { auth, ideas, ideasView, actions } = this.props
    return (
      <div className="Ideas__container container">
        <Header auth={auth} actions={actions} />
        <h1>Ideas</h1>
        <div className="Ideas__add-row">
          {auth.token ? (
            <button
              className="button button-primary"
              onClick={actions.openIdeaModal}>
              Suggest Idea
            </button>
          ) : (
            <div className="Ideas__warning">
              Sign in to suggest ideas or join a team.
            </div>
          )}
        </div>
        <p>
          View the <a href="/#faq">FAQ Section</a>.
        </p>

        <div className="row Ideas__table-header">
          <div className="two columns table-header">Suggested By</div>
          <div className="seven columns table-header">Description</div>
          <div className="three columns table-header">Team Members</div>
        </div>
        {ideas.data.map((idea, index) => (
          <Idea key={idea._id} idea={idea} auth={auth} actions={actions} />
        ))}

        {!auth.token && (
          <div className="Ideas__warning">
            Sign in to suggest ideas or join a team.
          </div>
        )}
        <AuthModal auth={auth} actions={actions} />
        <IdeaModal ideasView={ideasView} actions={actions} />
      </div>
    )
  }
}

export default Ideas
