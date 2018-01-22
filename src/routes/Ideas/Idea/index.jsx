import React from 'react'
import './Idea.css'

const Idea = ({ idea, actions, auth }) => {
  const memberNames = []
  let hasUserJoinedThisGroup = false

  let actionRow = []
  idea.members.forEach(member => {
    if (member._id === auth.id) {
      hasUserJoinedThisGroup = true
      actionRow.push(
        <button key="leave" onClick={() => actions.leaveIdea(idea)}>
          Leave Team
        </button>
      )
    }
    memberNames.push(member.name)
  })

  // if (idea.creator._id === auth.id) {
  //   actionRow.push(
  //     <button key="edit" onClick={() => {}}>
  //       Edit
  //     </button>
  //   )
  //   actionRow.push(
  //     <button key="delete" onClick={() => {}}>
  //       Delete
  //     </button>
  //   )
  // }

  if (auth.id && !hasUserJoinedThisGroup) {
    actionRow.push(
      <button key="join" onClick={() => actions.joinIdea(idea)}>
        Join Team
      </button>
    )
  }

  return (
    <div className="Idea">
      <div className="row">
        <div className="two columns">{idea.creator.name}</div>
        <div className="seven columns">
          <pre>{idea.description}</pre>
        </div>
        <div className="three columns">{memberNames.join(', ')}</div>
      </div>
      <div className="Idea__action_row">{actionRow}</div>
    </div>
  )
}

export default Idea
